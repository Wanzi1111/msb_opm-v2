
<template>
  <div>
    <div class="title-container">
      <basics-title title="活动审核管理" line />
    </div>
    <div class="app-container">

      <el-tabs v-model="activeBusinessTabValue" :before-leave="handleBusinessTabClick">
        <el-tab-pane v-for="v in businessTabList" :key="v.value" :label="v.label" />
      </el-tabs>

      <basics-search :loading="loadings._operation_resource_listResource" :searchs="searchs" @submitSearch="submitSearch" />

      <!-- <basics-action :actions="act" /> -->

      <el-tabs v-model="activeTabValue">
        <el-tab-pane v-for="v in tabList" :key="v.value">
          <template slot="label">
            <el-badge :value="statisticsData[v.key] || 0" class="custom-el-badge" :type="v.type">
              <span>{{ v.label }}</span>
            </el-badge>
          </template>
        </el-tab-pane>
      </el-tabs>

      <basics-table
        :columns="columns"
        :list="list"
        :get-list="getList"
        :total="total"
        :loading="loadings._k8s_api_recommend_api_activity_getActivityList"
        :list-query="listQuery"
        :action-function="actions"
      >
        <template slot="name" slot-scope="scope">
          <div>uid: {{ scope.row.uid }}</div>
          <div>昵称: {{ scope.row.name }}</div>
        </template>
      </basics-table>
    </div>
    <div v-if="modalVis">
      <ModalRejectRemarks :data="modalData" :vis="modalVis" @handleModalVis="handleModalVis" />
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import moment from 'moment'
import act from './actions/index'
import { getActivityList, checkAudit, getStatistics } from '@/api/operate/review-activities'
import ModalRejectRemarks from './components/modal-reject-remarks'
import columns, { tableAction } from './columns'
import searchs from './searchs'

const init_pagination = {
  page: 1,
  limit: 20
}

const businessTabList = [
  {
    label: '1v1美术',
    value: '0'
  },
  {
    label: '小熊美术',
    value: '1'
  }
]

const tabList = [
  {
    label: '全部',
    value: '0',
    key: 'total',
    type: 'primary'
  },
  {
    label: '待审核',
    value: '1',
    key: 'untreated',
    type: 'info'
  },
  {
    label: '审核通过',
    value: '2',
    key: 'pass',
    type: 'success'
  },
  {
    label: '审核驳回',
    value: '3',
    key: 'noPass',
    type: 'danger'
  }
]

export default {
  name: 'ReviewActivities',
  components: { ModalRejectRemarks },
  data() {
    return {
      activeTabValue: '0',
      activeBusinessTabValue: '0',
      columns,
      searchs,
      businessTabList,
      list: [],
      tabList,
      total: 0,
      listQuery: { ...init_pagination },
      actions: tableAction({ handleTableAction: this.handleTableAction }),
      modalVis: false,
      modalData: {},
      statisticsData: {},
      act: act({ download: this.download }),
      searchQuery: { type: '5' }
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    activeTabValue() {
      this.initPaginationAndGetList()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    // 导出
    download() {
      // todo
    },
    submitSearch(values) {
      const { type, uid, uploadTime, auditTime, name } = values
      const payload = { type, uid, name }
      if (values.uploadTime) {
        payload.uploadStartTime = moment(uploadTime[0]).valueOf()
        payload.uploadEndTime = moment(uploadTime[1]).valueOf()
      }
      if (values.auditTime) {
        payload.auditStartTime = moment(auditTime[0]).valueOf()
        payload.auditEndTime = moment(auditTime[1]).valueOf()
      }
      this.searchQuery = payload
      this.initPaginationAndGetList()
    },
    initPaginationAndGetList() {
      this.listQuery = { ...init_pagination }
      this.getList()
    },
    // 获取 列表数据
    getList() {
      const { listQuery: { page, limit }, activeTabValue, searchQuery } = this
      const status = activeTabValue === '0' ? '-1' : ~~activeTabValue - 1
      const payload = {
        status, ...searchQuery
      }
      // 获取 列表数据
      getActivityList({ page: page - 1, size: limit, ...payload }).then(res => {
        if (res?.code === 0) {
          const { content, totalElements } = res.payload
          this.list = content
          this.total = Number(totalElements)
        }
      })
      // 获取 统计数据
      getStatistics(payload).then(res => {
        if (res?.code === 0) {
          this.statisticsData = { ...res.payload }
        }
      })
    },
    // 处理对话框
    handleModalVis(vis, refresh) {
      this.modalVis = !!vis
      if (!vis) {
        this.modalData = {}
      }
      if (refresh) {
        this.initPaginationAndGetList()
      }
    },
    // 处理表格事件
    handleTableAction(type, row) {
      const { id, audit_status } = row
      switch (type) {
        case 'adopt': {
          this.$confirm('确定审核通过吗？', '审核', { type: 'warning' }).then(() => {
            checkAudit({ id, status: 1 }).then(res => {
              if (res?.code === 0) {
                this.$message.success('审核通过成功～')
                this.initPaginationAndGetList()
              }
            }
            )
          })
          break
        }
        case 'reject': {
          this.modalData = { id, audit_status }
          this.modalVis = true
          break
        }
      }
    },
    handleBusinessTabClick() {
      this.$message.warning('暂未开放，敬请期待～')
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-el-badge {
  ::v-deep .el-badge__content.is-fixed {
    top: 12px;
    right: 2px;
  }
}
</style>
