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
        @selection-change="handleSelectionChange"
      />
      <examine
        v-if="examineState"
        :row="row"
        :status-cause="statusCause"
        :state="examineState"
        :type="actType"
        @closeDl="closeExDl"
        @getList="getList"
      />
      <el-dialog
        v-if="quickState"
        :visible.sync="quickState"
        title="审核视频"
        width="800px"
        class="quickDialog"
        :before-close="() => closeQuickAtuidt()"
      >
        <el-carousel
          ref="carousel"
          :loop="false"
          trigger="click"
          arrow="always"
          :autoplay="true"
          indicator-position="none"
        >
          <Quick-audit
            ref="quickForm"
            :row="itemData"
            :state="quickState"
            :status-cause="statusCause"
            :type="quickName"
            :sumbit-fn="batchExaminePanda"
            @closeDl="closeQuickAtuidt"
            @getList="getList"
          />
        </el-carousel>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchs from './searchs/list'
import { default as act } from './actions/list'
import columns, { actions, setActions } from './columns/list'
import { mapGetters } from 'vuex'
import Examine from './components/Examine'
import {
  getPandaList,
  getSelectOptions,
  deleteActicle,
  batchExaminePanda
} from '@/api/operate/draw-show'
import { Message } from 'element-ui'
import QuickAudit from '../1v1/components/QuickAudit'
import { getToken } from '@/utils/auth'

export default {
  components: {
    Examine,
    QuickAudit
  },
  data () {
    return {
      searchs,
      activeState: '0',
      statistic: [],
      act: act({ quickAtudit: this.quickAtudit }),
      attr: { stripe: true },
      columns: columns,
      actions: actions({
        tableAction: this.tableAction
      }),
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      query: {},
      examineState: false,
      row: {},
      itemData: {},
      quickState: false,
      statusCause: {},
      quickName: 'quick',
      batchExaminePanda: batchExaminePanda
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  created() {
    setActions({ videoView: this.videoView })
    this.getList()
    this.getOptions()
  },
  methods: {
    getList() {
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const { query, listQuery, activeState } = this
      const queryCopy = { ...query }
      let startTime, endTime
      if (queryCopy.videoTime) {
        startTime = new Date(queryCopy.videoTime[0]).getTime()
        endTime = new Date(queryCopy.videoTime[1]).getTime()
      } else {
        startTime = undefined
        endTime = undefined
      }
      delete queryCopy.videoTime
      const data = {
        pageNumber: listQuery.page,
        pageSize: listQuery.limit,
        ...queryCopy,
        startTime,
        endTime,
        reviewStatus: activeState
      }
      getPandaList({ ...data, businessType: 2 }).then(res => {
        if (res.code === 0) {
          loading.close()
          this.list = res.payload.content || []
          this.total = Number(res.payload.totalElements) || 0
          if (res.payload.content.length < 1) {
            Message.warning('没有数据了')
            this.quickState = false
          }
        }
      })
    },
    changeSearch(query) {
      this.query = query
    },
    submitSearch(val) {
      console.log(val)
      this.listQuery = {
        page: 1,
        limit: 10
      }
      this.query = {
        ...this.query,
        ...val
      }
      this.getList()
    },
    handleClick(tsb, event) {
      this.activeState = tsb.name
      const { listQuery } = this
      this.listQuery = {
        ...listQuery,
        page: 1
      }
      this.getList()
    },
    quickAtudit() {
      if (!this.itemData.idLength || this.itemData.idLength === 0) {
        Message.warning('您还没有选择审核视频呦～')
        return
      }
      this.quickState = true
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
    },
    closeQuickAtuidt() {
      this.quickState = false
      this.getList()
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
    // 预览视频
    videoView(row) {
      const { status } = row
      console.log('status', status)
      this.tableAction(1, row, 1, 'view')
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
    handleSelectionChange(val) {
      let ids = val.map(mapI => { return mapI.id })
      const idLength = val.length
      ids = ids.toString()
      this.itemData = { ids, idLength }
    },
    // 下拉
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
          const { subjectList, statusList, rejectedReasonList } = res.payload
          const arr = []
          const subOptions = []
          subjectList.map((item) => {
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
          arr.pop() // 去掉推荐，小熊美术没有推荐
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
