<template>
  <div>
    <div>
      <basics-search
        ref="searchs"
        :loading="loadings._ums_meixiu_api_works_su_v1_content_check_list"
        :searchs="searchs"
        @changeSearch="changeSearch"
        @submitSearch="submitSearch"
      />
      <el-tabs v-model="activeState" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in statistic"
          :key="index"
          :name="item.value"
        >
          <span slot="label">{{ item.label
          }}<span :style="{ color: item.type }"><el-badge
            :type="item.type"
            :value="item.videoCount"
            class="item"
          /></span>
          </span>
        </el-tab-pane>
      </el-tabs>
      <basics-action :actions="act" />
      <basics-table
        ref="table"
        :attr="attr"
        :loading="loadings._ums_meixiu_api_works_su_v1_content_check_list"
        :columns="columns"
        :list="list"
        :get-list="getList"
        :total="total"
        :list-query="listQuery"
        :action-function="actions"
        @sort-change="sort"
        @selection-change="handleSelectionChange"
      >
        <template slot="authorId" slot-scope="scope">
          <el-link type="primary" icon="el-icon-search" @click="authorSearch(scope.row.originUserId)">{{ scope.row.originUserId }}</el-link>
          <!-- <el-link v-if="scope.row.username" disabled>{{ scope.row.username }}</el-link> -->
        </template>
        <template slot="pv" slot-scope="scope">
          <el-tag type="primary">{{ scope.row.pv }}</el-tag>
        </template>
        <template slot="praiseNum" slot-scope="scope">
          <el-tag type="success">{{ scope.row.praiseNum }}</el-tag>
        </template>
      </basics-table>
      <!-- <create :state="addState" @closeDl="closeDl" /> -->
      <examine
        v-if="examineState"
        :row="row"
        :status-cause="statusCause"
        :state="examineState"
        :type="actType"
        @closeDl="closeExDl"
        @getList="getList"
      />
    </div>
    <!-- 弹出视频播放框 -->
    <el-dialog
      v-if="dialogVisible"
      width="600px"
      title="视频预览"
      :visible.sync="dialogVisible"
    >
      <Video-player
        ref="videoPlayer"
        class="custom-video"
        :options="playerOptions"
        @ready="ready"
      />
    </el-dialog>

    <!-- 弹出快速审核视频弹窗 -->
    <!-- <Quick-audit v-if="quickState" :row="quickRow" :state="quickState" type="quick" @closeDl="closeQuickAtuidt" @getList="getList" /> -->
    <el-dialog
      v-if="quickState"
      :visible.sync="quickState"
      title="审核视频"
      width="800px"
      class="quickDialog"
      :before-close="() => closeQuickAtuidt()"
    >
      <!-- <div v-for="item in 4" :key="item">
        <Quick-audit :row="quickRow" :state="quickState" type="quick" @closeDl="closeQuickAtuidt" @getList="getList" />
      </div> -->
      <el-carousel
        ref="carousel"
        :loop="false"
        trigger="click"
        arrow="always"
        :autoplay="true"
        indicator-position="none"
        @change="changeCarouse"
      >
        <!-- <el-carousel-item v-for="(item, key) in quickList" :key="key">
          <Quick-audit
            ref="quickForm"
            :row="item"
            :state="quickState"
            :status-cause="statusCause"
            :type="quickName"
            @closeDl="closeQuickAtuidt"
            @getList="getList"
            @changeFormRize="changeFormRize"
            @refesh="refesh"
          />
        </el-carousel-item> -->
        <Quick-audit
          ref="quickForm"
          :row="itemData"
          :state="quickState"
          :status-cause="statusCause"
          :type="quickName"
          @closeDl="closeQuickAtuidt"
          @getList="getList"
          @refesh="refesh"
        />
      </el-carousel>
      <!-- <div style="text-align: center; margin-top: 10px">
        第{{ quickNum }}页 第{{ quickCurrent }}条 每页20条 总数{{ quickTotal }}
      </div>
      <div style="text-align: center; margin-top: 10px">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="sizeNum"
          :page-sizes="[20, 30, 50, 100]"
          layout="prev, pager, next, jumper"
          :total="quickTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  showList,
  showRecommend,
  showExamine,
  worksShowStatusCause,
  getSelectOptions,
  getPandaList,
  deleteActicle
} from '@/api/operate/draw-show'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsAction from '@/components/BasicsAction'
import BasicsTable from '@/components/BasicsTable'
// import Create from './components/Create'
import Examine from './components/Examine'
import QuickAudit from './components/QuickAudit'
import searchs from './searchs/list'
import { default as act } from './actions/list'
import columns, { actions, setActions } from './columns/list'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import VideoPlayer from '@/components/BasicsForm/components/Video/VideoPlayer'
import { Message } from 'element-ui'

export default {
  name: 'OperateDrawShow',
  components: {
    BasicsSearch,
    BasicsAction,
    BasicsTable,
    // Create,
    Examine,
    VideoPlayer,
    QuickAudit
  },
  data() {
    return {
      searchs: searchs,
      act: act({ openDl: this.openDl, quickAtudit: this.quickAtudit }),
      attr: { stripe: true },
      columns: columns,
      actions: actions({
        tableAction: this.tableAction
      }),
      setActions: setActions({ videoView: this.videoView }),
      total: 0,
      list: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      query: {},
      row: {},
      addState: false,
      examineState: false,
      actType: '',
      activeState: '0',
      newStateList: [
        { label: '全部', value: '-1', type: 'warning' },
        { label: '待审核', value: '1', type: 'primary' },
        { label: '审核通过', value: '2', type: 'info' },
        { label: '自动审核通过', value: '4', type: 'success' },
        { label: '已下线', value: '3', type: 'primary' },
        { label: '审核驳回', value: '0', type: 'info' }
      ],
      statistic: [],
      dialogVisible: false,
      videoUrl: null,
      autoPoster: true,
      playerOptions: {
        language: 'zh-CN',
        autoplay: true,
        loop: true,
        controls: true
      },
      player: '',
      quickState: false,
      quickFormHight: 0,
      quickList: [],
      quickTotal: 0,
      quickCurrent: 1,
      quickNum: 1,
      statusCause: {},
      current: 0,
      preCurrent: 0,
      quickName: 'quick',
      currentPage: 1,
      sizeNum: 20,
      itemData: {}
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  created() {
    sessionStorage.setItem('videoPlay', '1')
    // 获取字典表
    this.getOptions()
    // this.getWorkShowStatistic()
    // this.getCouse()
    this.getList()
    // this.getQuickList(this.quickNum)
    setActions({ videoView: this.videoView })
    var _this = this
    document.onkeydown = function(e) {
      const key = window.event.keyCode
      if (key === 37) {
        _this.switch('left')
      }
      if (key === 39) {
        _this.switch('right')
      }
    }
  },
  destroyed() {
    sessionStorage.setItem('videoPlay', '0')
  },
  mounted() {
    // this.heightLoad()
    // window.addEventListener('resize', () => {
    //   this.quickFormHight = (this.$refs['quickForm'][0].$el.offsetHeight) * 1 + 100
    //   this.heightLoad()
    // })
  },
  methods: {
    // 获取字典表
    getOptions() {
      const arrType = [
        'warning',
        'primary',
        'info',
        'success',
        'primary',
        'info'
      ]
      getSelectOptions().then(res => {
        if (res.code === 0) {
          const { vipSubjectList, statusList, rejectedReasonList } = res.payload
          const arr = []
          const subOptions = []
          vipSubjectList.map((item) => {
            var obj = {
              label: item.value,
              value: item.code + ''
            }
            subOptions.push(obj)
          })
          statusList.map((item, index) => {
            var obj = {
              label: item.value,
              value: item.code + '',
              type: arrType[index]
            }
            arr.push(obj)
          })
          this.statistic = arr
          this.statusCause = { rejectedReasonList: rejectedReasonList.map((item) => Object.assign({}, { reasonId: item.code, reason: item.value })) }
          this.$refs.searchs?.set({
            type: 'options',
            data: {
              subject: subOptions
            }
          })
        }
      })
    },
    sort(obj) {
      let orderKey = ''
      let orderType = ''
      if (obj.prop === 'pv') orderKey = 'pvCount'
      if (obj.prop === 'praiseNum') orderKey = 'praiseCount'
      switch (obj.order) {
        case 'ascending':
          orderType = '1'
          break
        case 'descending':
          orderType = '0'
          break
        default:
          break
      }
      this.query = {
        ...this.query,
        orderKey,
        orderType
      }
      this.getList()
    },
    handleSelectionChange(val) {
      let ids = val.map(mapI => { return mapI.id })
      const idLength = val.length
      ids = ids.toString()
      this.itemData = { ids, idLength }
    },
    switch(value) {
      const { quickState } = this
      if (quickState) {
        if (value === 'left') {
          this.$refs.carousel.prev()
        } else if (value === 'right') {
          this.$refs.carousel.next()
        }
      }
    },
    async getCouse() {
      const res = await worksShowStatusCause()
      this.statusCause = res.data || {}
    },
    ready() {
      this.player = this.$refs.videoPlayer.player
      this.init()
    },
    init() {
      const { videoUrl: url } = this
      let type = 'application/x-mpegurl' // 'application/x-mpegurl'/'video/mp4'
      if (url.includes('.mp4')) {
        type = 'video/mp4'
      }
      const video = {
        // withCredentials: false,
        type: type,
        src: url
      }
      this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.player.src(video)
      this.player.ready(() => {
        // if (this.autoPoster && !this.poster) {
        //   this.$confirm('是否生成视频封面？', '', {
        //     confirmButtonText: '生成'
        //   }).then(() => {
        //     this.$nextTick(() => {
        //       this.getBaseUrl()
        //     })
        //   }).catch()
        // }
      })
    },
    authorSearch(val) {
      this.query = { ...this.query, uid: val }
      this.$refs.searchs.recoveryForm({
        uid: val
      })
      this.submitSearch()
    },
    changeSearch(query) {
      this.query = query
    },
    submitSearch(vall, state = false) {
      const val = { ...vall }
      if (state) {
        this.activeState = '0'
        this.$refs.searchs.set({
          type: 'defaultVal',
          data: {
            videoLength: [0, 125]
          }
        })
      }
      // else {
      //   if (val.videoLength) {
      //     videoDurationMin = val.videoLength[0]
      //     videoDurationMax = val.videoLength[1]
      //     delete val.videoLength
      //   } else {
      //     videoDurationMin = 0
      //     videoDurationMax = 120
      //   }
      // }
      this.listQuery = {
        page: 1,
        limit: 10
      }
      this.query = {
        ...this.query,
        ...val
        // videoDurationMin,
        // videoDurationMax
      }
      this.getList()
    },
    handleClick(tab, event) {
      this.activeState = tab.name
      const { listQuery } = this
      this.listQuery = {
        ...listQuery,
        page: 1
      }
      this.getList()
    },
    getList() {
      const { query, listQuery, activeState } = this
      const queryCopy = { ...query }
      let startTime, endTime
      if (queryCopy.videoTime) {
        startTime = new Date(queryCopy.videoTime[0]).getTime()
        endTime = new Date(queryCopy.videoTime[1]).getTime()
        delete queryCopy.videoTime
      } else {
        startTime = undefined
        endTime = undefined
      }
      const data = {
        pageNumber: listQuery.page,
        pageSize: listQuery.limit,
        ...queryCopy,
        startTime,
        endTime,
        reviewStatus: activeState
      }
      for (const name in data) {
        !data[name] && data[name] !== 0 && delete data[name]
      }
      getPandaList({ ...data, businessType: 1 }).then(res => {
        const data = res.payload || {}
        this.list = data.content || []
        this.total = Number(data.totalElements) || 0
        if (data.content.length < 1) {
          Message.warning('没有数据了')
          this.quickState = false
        }
      })
    },
    handleSizeChange(val) {
      const { quickNum } = this
      // 每页val条
      this.sizeNum = val
      this.getQuickList(quickNum)
    },
    handleCurrentChange(val) {
      this.quickNum = val
      this.getQuickList(val)
    },
    changeCarouse(val, oldVal) {
      this.current = val
      this.preCurrent = oldVal
      this.quickCurrent = val + 1
      // const { quickTotal, quickCurrent, quickNum, current, preCurrent } = this
      // const length = this.quickList.length
      // if (length < 20) {
      //   if (quickCurrent === length) {
      //     // 提示
      //     Message.warning('没有数据了！')
      //   }
      // } else {
      //   if (val === 0 && oldVal === 19) {
      //     console.log('前进')
      //     this.quickList = []
      //     this.quickNum = quickNum + 1
      //     this.getQuickList(quickNum + 1)
      //   }
      // if (val === 19 && oldVal === 0) {
      //   console.log('后退')

      //   this.quickList = []
      //   this.quickNum = quickNum - 1
      //   console.log(quickNum - 1, 'quickNum - 1')
      //   if (this.quickNum <= 0) {
      //     this.quickNum = 1
      //   }
      //   this.getQuickList(quickNum - 1)
      // }
      // }
      // console.log(val, 'val', oldVal)
    },
    refesh() {
      const { quickNum } = this
      this.getQuickList(quickNum)
    },
    getQuickList(quickNum) {
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const { sizeNum } = this
      this.quickList = []
      const params = {
        pageNum: quickNum,
        pageSize: sizeNum,
        videoTag: 1
      }
      showList(params)
        .then(res => {
          loading.close()
          if (res.status === 0) {
            const data = res.data || {}
            this.quickList = data.list || []
            this.quickTotal = data.total || 0
            this.quickCurrent = 1
          }
        })
        .catch(err => {
          console.log(err, 'err')
          loading.close()
        })
    },
    viewVideo(dat, row, index) {
      // this.tableAction(dat, row, index, 'examine')
      this.videoUrl = dat
      this.dialogVisible = true
    },
    videoView(row) {
      const { status } = row
      var type = ''
      switch (status) {
        case 1:
          type = 'examine'
          break
        default:
          type = 'view'
          break
      }
      this.tableAction(1, row, 1, type)
      // return
      // this.videoUrl = row.videoUrl
      // this.dialogVisible = true
    },
    tableAction(dat, row, index, action) {
      this.row = row
      switch (action) {
        case 'delete':
          this.delete(row)
          break
        default:
          // examine / view / edit
          this.actType = action
          this.openExDl()
          break
      }
    },
    delete (row) {
      const { id } = row
      deleteActicle({ id: Number(id), opUserId: getToken('userId') }).then((res) => {
        if (res.code === 0) {
          Message.success('删除成功')
          this.getList()
        }
      })
    },
    // 推荐、不推荐
    recommend(row) {
      // isRecommend 0:未推荐、1:推荐首页
      const sta = row.isRecommend
      this.$confirm(
        sta ? '取消推荐该视频后将不会在首页显示' : '推荐该视频后将会在首页显示',
        sta ? '你确定要取消推荐该视频吗？' : '你确定要推荐该视频吗？',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = sta ? '取消中...' : '推荐中...'
              showRecommend({
                id: row.id,
                isRecommend: sta ? 0 : 1,
                mid: getToken('userId'),
                opUserId: getToken('userId'),
                opUserName: getToken('cname')
              })
                .then(() => {
                  this.$message.success(sta ? '取消成功' : '推荐成功')
                  this.getList()
                  done()
                })
                .finally(() => {
                  instance.confirmButtonLoading = false
                  instance.confirmButtonText = '确定'
                })
            } else {
              done()
            }
          }
        }
      )
    },
    // 上、下线
    onLine(row) {
      // status 0:已驳回、1:待审核、2:已上线、3:已下线 4:自动审核
      const sta = row.status === 2 || row.status === 4
      this.$confirm(
        sta
          ? '下线后同学们将看不到此视频，确定下线吗？'
          : '上线后同学们将看到此视频，确定上线吗？',
        sta ? '你确定要下线该视频吗？' : '你确定要上线该视频吗？',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = sta ? '下线中...' : '上线中...'
              showExamine({
                id: row.id,
                status: sta ? 3 : 2,
                mid: getToken('userId'),
                opUserId: getToken('userId'),
                opUserName: getToken('cname')
              })
                .then(() => {
                  this.$message.success(sta ? '下线成功' : '上线成功')
                  this.getList()
                  done()
                })
                .finally(() => {
                  instance.confirmButtonLoading = false
                  instance.confirmButtonText = '确定'
                })
            } else {
              done()
            }
          }
        }
      )
    },
    // openDl() {
    //   this.addState = true
    // },
    // 快速审核视频弹窗
    quickAtudit() {
      if (!this.itemData.idLength || this.itemData.idLength === 0) {
        Message.warning('您还没有选择审核视频呦～')
        return
      }
      this.quickRow = this.quickRowClose
      this.quickState = true
      // this.$nextTick(() => {
      //   this.heightLoad()
      // })
    },
    closeQuickAtuidt() {
      this.quickState = false
      this.quickRow = {}
      this.getList()
    },
    closeDl(sta = 0) {
      this.addState = false
      if (sta) {
        this.getList()
      }
    },
    openExDl() {
      this.examineState = true
    },
    closeExDl(sta) {
      this.examineState = false
      this.row = {}
      if (sta) {
        this.getList()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-slider__stop {
  background: #dfe4ed;
}
.custom-video {
  ::v-deep .video-js {
    width: 560px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;

    .vjs-big-play-button {
      position: relative;
      border-radius: 100%;
      height: 50px;
      width: 50px;
      top: auto;
      left: auto;
    }
  }
}
::v-deep .el-dialog__header {
  padding: 10px 30px !important;
}
::v-deep .el-dialog__body {
  z-index: 2002;
  padding-top: 10px !important;
  padding-bottom: 14px !important;
  .el-carousel {
    .el-carousel__container{
      // height: 480px !important;
    }
  }
}
::v-deep .el-row {
  .video-style{
    position: absolute;
    left: 420px;
    bottom: 22px;
  }
}
::v-deep .el-form-item {
  .el-form-item__content{
    .el-radio-group{
      label{
        width: 260px;
      }
    }
  }
}
</style>
