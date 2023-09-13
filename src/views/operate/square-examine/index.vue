<template>
  <div>
    <div class="title-container">
      <basics-title title="广场作品审核" line />
    </div>
    <div v-loading="tableLoading" class="app-container">
      <el-tabs v-model="type" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in workFromTypeList"
          :key="index"
          :name="item.value+''"
          :label="item.label"
        />
      </el-tabs>
      <basics-search
        ref="searchs"
        :key="type"
        :searchs="searchs"
        @changeSearch="changeSearch"
        @submitSearch="submitSearch"
      >
        <template slot="termContId" slot-scope="scope">
          <el-input v-model="scope.form.termContId" placeholder="请输入">
            <el-select slot="prepend" v-model="query.termContType" style="width: 90px">
              <el-option value="1" label="作者ID" />
              <el-option value="2" label="作品ID" />
            </el-select>
          </el-input>
        </template>
      </basics-search>
      <!-- <el-tabs v-if="type==='1'" v-model="findType" class="pagination-container" @tab-click="handleTabClick">
        <el-tab-pane
          v-for="(item, index) in statistic"
          :key="index"
          :name="item.value+''"
          :label="item.label"
        />
      </el-tabs> -->
      <basics-table
        ref="table"
        :key="tableKey"
        :attr="attr"
        :columns="columns"
        :list="list"
        :get-list="getList"
        :total="total"
        :list-query="listQuery"
        :action-function="actions"
      >
        <template slot="worksType" slot-scope="scope">
          <span v-if="scope.row.worksType === '0' ">儿创</span>
          <span v-if="scope.row.worksType === '1' ">卡漫</span>
          <span v-if="scope.row.worksType === '2' ">彩铅</span>
          <span v-if="scope.row.worksType === '3' ">国画</span>
          <span v-if="scope.row.worksType === '4' ">色彩</span>
          <span v-if="scope.row.worksType === '5' ">造型</span>
          <span v-if="scope.row.worksType === '6' ">其它</span>
        </template>
        <template slot="authorId" slot-scope="scope">
          <div v-if="type === '2'">
            <el-link :type="scope.row.works_from_type===2?'success':'primary'" @click="authorSearch(scope.row.userNum, 'termContId')">uid:{{ scope.row.userNum }}</el-link>
            <el-link v-if="scope.row.userName" disabled>昵称:{{ scope.row.userName }}</el-link>
          </div>
          <div v-else>
            <el-link :type="scope.row.works_from_type===2?'success':'primary'" @click="authorSearch(scope.row.studentId, 'uid')">uid:{{ scope.row.studentId }}</el-link>
            <el-link v-if="scope.row.studentName" disabled>昵称:{{ scope.row.studentName }}</el-link>
          </div>
        </template>
      </basics-table>
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
  </div>
</template>

<script>

import {
  WorkDispaly,
  WorkRecommend,
  WorkRoomShow,
  getOperationCenterWorkList,
  squareWorksList,
  updateBearWorks
} from '@/api/operate/square-examine'
import Examine from './components/Examine'
import searchs, { search1 } from './searchs/list'
import columns, { actions, list, action1 } from './columns/list'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import moment from 'moment'

const { square_examine_type_enum } = window.baseData
// 业务线tab数组，暂时只有这个页面用
const workFromTypeList = [
  { label: '1v1美术', value: 1 },
  { label: '小熊艺术', value: 2 }
]

export default {
  name: 'OperateDrawShow',
  components: {
    Examine
  },
  data() {
    return {
      workFromTypeList: workFromTypeList,
      searchs: [],
      attr: { stripe: true },
      columns: this.computerColumns(list),
      tableKey: 1,
      actions: null,
      total: 0,
      list: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      query: {
        termContType: '1'
      },
      row: {},
      examineState: false,
      actType: '',
      type: '1',
      findType: 0,
      statistic: square_examine_type_enum,
      videoUrl: null,
      autoPoster: true,
      playerOptions: {
        language: 'zh-CN',
        autoplay: true,
        loop: true,
        controls: true
      },
      player: '',
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
      itemData: {},
      business: '1'
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    tableLoading () {
      const { loadings } = this
      return loadings._msb_api_roomShow_getOperationCenterWorkList ||
        loadings._ums_meixiu_api_works_s_v1_works_bear_squareWorksList
    }
  },
  watch: {
    type: {
      handler(val) { // 1v1
        if (val === '1') {
          this.columns = this.computerColumns(list)
          this.searchs = search1
          this.actions = action1({ tableAction: this.tableAction1 })
        } else {
          this.columns = columns
          this.searchs = searchs
          this.actions = actions({ tableAction: this.tableAction })
        }
        this.list = []
        this.tableKey += 1
      },
      immediate: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    computerColumns(columns) { // 只用馆藏tab时显示这一栏
      const column = {
        prop: 'roomShow',
        label: '馆藏作品',
        align: 'center',
        slot: 'statArticle',
        render: (h, dat, row) => {
          let tag = '是'
          let type = 'success'
          if (dat === 0) {
            tag = '否'
            type = 'danger'
          }
          return h('el-tag', { props: { type }}, tag)
          // return <el-tag type={type}>{ tag }</el-tag>
        }
      }
      const newColumns = [...columns]
      this.findType === '0' ? newColumns.push(column) : newColumns
      this.tableKey += 1
      return newColumns
    },
    // piviot 用于判断在哪处点击的馆藏和前30
    whichFuncSendRequset(row, type, status, piviot) {
      const index = this.list.findIndex(one => one.worksId === row.worksId)
      const { worksId } = row
      const params = {
        workId: String(worksId),
        status: String(status)
      }
      const hashMap = {
        1: WorkRecommend,
        2: WorkRoomShow,
        6: WorkDispaly
      }
      hashMap[type](params).then(res => {
        if (res.status === 0) Message.success('操作成功')
        if (res.status === 0 && index !== -1) {
          switch (type) {
            case 1:
              this.$set(this.list[index], 'recommend', row.recommend === 1 ? 0 : 1)
              break
            case 2:
              this.$set(this.list[index], 'roomShow', row.roomShow === 1 ? 0 : 1)
              break
          }
        }
      })
    },
    // 推荐+优秀作品
    tableAction(row, type, typeContent) {
      const { worksId } = row
      updateBearWorks({ worksId, type, typeContent: typeContent ? 1 : 0 }).then((result) => {
        if (result.code === 0) Message.success('操作成功')
        setTimeout(() => {
          this.getList()
        }, 500)
      }).catch(err => {
        console.log(err)
      })
    },
    // 1v1
    tableAction1(row, type, typeContent, piviot = false) {
      this.whichFuncSendRequset(row, type, typeContent, piviot)
    },
    // 点击回显并查询，区分1v1美术和小熊艺术
    authorSearch(termContId, name) {
      const { query } = this
      this.query = Object.assign({}, { ...query, termContType: '1' }, { [name]: termContId })
      this.$refs.searchs.recoveryForm({
        [name]: termContId
      })
      this.submitSearch(this.query)
    },
    changeSearch(query) {
      Object.assign(this.query, query)
    },
    submitSearch(vall, reset) {
      const { query } = this
      const val = { ...vall }
      this.listQuery = {
        page: 1,
        limit: 10
      }
      this.query = { ...query, ...val }
      this.getList()
    },
    handleTabClick(tab, event) {
      this.findType = tab.name
      const { listQuery } = this
      this.listQuery = {
        ...listQuery,
        page: 1
      }
      this.getList()
    },
    handleClick(tab, event) {
      this.type = tab.name
      const { listQuery } = this
      this.listQuery = {
        ...listQuery,
        page: 1
      }
      this.getList()
    },
    get1v1List() {
      const { query, listQuery } = this
      // 两个表格使用的query参数不同，防止冲突，重新起了一个副本
      const realQuery = { ...query }
      this.actions = action1({ tableAction: this.tableAction1 })
      const whichTab = {}
      if (query.workType === '1') {
        whichTab.recommend = 1
      } else if (query.workType === '2') {
        whichTab.roomShow = 1
      }
      // 删除不必要的参数
      delete realQuery.termContType
      const data = {
        ...realQuery,
        pageNum: listQuery.page,
        pageSize: listQuery.limit,
        startTime: Date.parse(query.startTime) / 1000,
        endTime: Date.parse(query.endTime) / 1000,
        ...whichTab
      }
      delete data.workType
      // 去掉未使用的参数
      for (const name in data) {
        !data[name] && data[name] !== 0 && delete data[name]
      }
      getOperationCenterWorkList(data).then(res => {
        if (res.status === 0) {
          this.list = res.data.data || []
          this.total = Number(res.data.total) || 0
          if (res.data.data.length < 1) {
            Message.warning('没有数据了')
          }
        }
      })
    },
    // 美术
    getArtList() {
      const { query, listQuery } = this
      const data = {
        ...query,
        pageNumber: listQuery.page,
        pageSize: listQuery.limit,
        startTime: query.time && moment(query.time[0]).valueOf() || '',
        endTime: query.time && moment(query.time[1]).valueOf() || '',
        worksId: query.termContType === '2' ? query.termContId : undefined, // 作品id
        worksUserId: query.termContType === '1' ? query.termContId : undefined // 作者id
      }
      delete data.termContType
      delete data.time
      delete data.termContId
      for (const name in data) {
        !data[name] && data[name] !== 0 && delete data[name]
      }
      squareWorksList(data).then(res => {
        const { content, totalElements } = res.payload
        this.list = content
        this.total = Number(totalElements) || 0
        if (content.length < 1) {
          Message.warning('没有数据了')
        }
      })
    },
    getList() {
      if (this.type === '1') {
        this.get1v1List()
      } else {
        this.getArtList()
      }
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
      height: 480px !important;
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
