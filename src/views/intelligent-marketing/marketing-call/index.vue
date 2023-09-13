<template>
  <div>
    <div class="title-container">
      <basics-title
        title="任务管理"
        line
        :actions="actions"
      />
    </div>

    <div class="app-container">
      <basics-tabs
        :tab-list="intelligentMarketing.callDinc.businessLineList"
        :active-tab="activeTab"
        @handleTabClick="handleTabClick"
      />

      <basics-search
        ref="searchs"
        :loading="loadings._ums_meixiu_api_out_m_task_manage_list"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />

      <basics-table
        :loading="loadings._ums_meixiu_api_out_m_task_manage_list"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      />
    </div>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import searchs from './search'
import columns, { tableActions } from './columns'
import { tabList, actions } from './config'
import { getMarketingCallList, stopMarketingCall, startMarketingCall, refreshMarketingCall } from '@/api/intelligentMarketing'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'MarketingCall',
  data() {
    return {
      columns,
      searchs,
      tabList,
      total: 0,
      list: [],
      activeTab: '1',
      searchQuery: {},
      listQuery: { ...init_pagaination },
      actions: actions({ handleActions: this.handleActions }),
      actionFunction: tableActions({ handleTableAction: this.handleTableAction })
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    ...mapState(['intelligentMarketing'])
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
      this.handleInitSearchOptions()
    })
  },
  activated() {
    this.getList()
  },
  methods: {
    handleInitSearchOptions() {
      this.$refs.searchs.set({
        type: 'options',
        data: { taskStatus: this.intelligentMarketing.callDinc.taskStatusList }
      })
    },
    initParamsAndGetList() {
      this.listQuery = { ...init_pagaination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { activeTab: businessLine, searchQuery, listQuery: { page, limit }} = this
      getMarketingCallList({ pageNum: page, pageSize: limit, businessLine, ...searchQuery })
        .then(({ payload: { totalElements, list }}) => {
          this.list = list
          this.total = totalElements
        })
        .catch(() => {
          this.list = []
          this.total = 0
        })
    },
    submitSearch(value) {
      this.searchQuery = { ...value }
      this.initParamsAndGetList()
    },
    handleTabClick(val) {
      this.activeTab = val
      this.getList()
    },
    handleTableAction(type, row) {
      switch (type) {
        case 'detail': {
          const { id, taskName, taskStatus, allImportQuantity, allCallQuantity } = row
          const { businessLineList_map, taskStatusList_map } = this.intelligentMarketing.callDincMap
          const businessLine = businessLineList_map[this.activeTab]
          const status = taskStatusList_map[taskStatus]
          this.$router.push({ path: '/intelligent-marketing/marketing-call-task-detail', query: { id, allImportQuantity, allCallQuantity, taskName, businessLine, status }})
          break
        }
        case 'edit': {
          this.$router.push({ path: '/intelligent-marketing/create-marketing-call-plan', query: { id: row.id }})
          break
        }
        case 'enable': {
          this.$confirm('启用后数据将开始更新', '启用', { type: 'warning' })
            .then(() => {
              startMarketingCall({ id: row.id })
                .then(() => {
                  this.$message.success('启用成功～')
                  this.getList()
                })
            })
          break
        }
        case 'stop': {
          this.$confirm('停用后数据将暂停更新', '停用', { type: 'warning' })
            .then(() => {
              stopMarketingCall({ id: row.id })
                .then(() => {
                  this.$message.success('停用成功～')
                  this.getList()
                })
            })
          break
        }
        case 'refresh': {
          this.$confirm('刷新后分群数据将重新获取', '刷新', { type: 'warning' })
            .then(() => {
              refreshMarketingCall({ id: row.id })
                .then(() => {
                  this.$message.success('刷新成功～')
                  this.getList()
                })
            })
          break
        }
      }
    },
    handleActions() {
      this.$router.push({ name: 'CreateMarketingCallPlan' })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
