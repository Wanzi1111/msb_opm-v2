<template>
  <div>
    <div class="title-container">
      <basics-title
        title="IVR管理"
        line
        :actions="actions"
      />
    </div>

    <div class="app-container">
      <basics-tabs
        :tab-list="intelligentMarketing.ivrDinc.businessLineList"
        :active-tab="activeTab"
        @handleTabClick="handleTabClick"
      />

      <basics-search
        ref="searchs"
        :loading="loadings._ums_meixiu_api_out_m_ivr_list"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />

      <basics-table
        :loading="loadings._ums_meixiu_api_out_m_ivr_list"
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
import { ivrList, ivrStop, ivrStart, ivrRefresh } from '@/api/intelligentMarketing'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'IvrManage',
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
      const { searchQuery, activeTab } = JSON.parse(localStorage.getItem('routerValue')) || {}
      this.searchQuery = searchQuery || this.searchQuery
      this.activeTab = activeTab || this.activeTab
      this.handleInitSearchOptions()
      this.getList()
    })
  },
  activated() {
    this.getList()
  },
  methods: {
    handleInitSearchOptions() {
      const { intelligentMarketing: { ivrDinc: { taskStatusList }}, searchQuery } = this
      const { taskStatus, taskName, taskId } = searchQuery || {}
      this.$refs.searchs.set({
        type: 'options',
        data: { taskStatus: taskStatusList }
      })
      this.$refs.searchs.recoveryForm({
        userSearch: taskName || taskId,
        taskStatus
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
      ivrList({ pageNum: page, pageSize: limit, businessLine, ...searchQuery })
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
      localStorage.setItem('routerValue', JSON.stringify({ searchQuery: value, activeTab: this.activeTab }))
      this.initParamsAndGetList()
    },
    handleTabClick(val) {
      this.activeTab = val
      localStorage.setItem('routerValue', JSON.stringify({ searchQuery: this.searchQuery, activeTab: val }))
      this.getList()
    },
    handleTableAction(type, row) {
      const { id, taskName, taskStatus, allImportQuantity, allCallQuantity } = row
      const { businessLineList_map, taskStatusList_map } = this.intelligentMarketing.ivrDincMap
      const businessLine = businessLineList_map[this.activeTab]
      const status = taskStatusList_map[taskStatus]
      switch (type) {
        case 'detail': {
          this.$router.push({ path: '/intelligent-marketing/ivr-manage-detail', query: { id, allImportQuantity, allCallQuantity, taskName, businessLine, status }})
          break
        }
        case 'edit': {
          this.$router.push({ path: '/intelligent-marketing/create-ivr-manage', query: { id: row.id, businessLine }})
          break
        }
        case 'enable': {
          this.$confirm('启用后数据将开始更新', '启用', { type: 'warning' })
            .then(() => {
              ivrStart({ id: row.id })
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
              ivrStop({ id: row.id })
                .then(() => {
                  this.$message.success('停用成功～')
                  this.getList()
                })
            })
          break
        }
        case 'refresh': {
          this.$confirm('刷新后数据将重新获取', '刷新', { type: 'warning' })
            .then(() => {
              ivrRefresh({ id: row.id })
                .then(() => {
                  this.$message.success('刷新成功～')
                  this.getList()
                })
            })
          break
        }
        case 'copy': {
          this.$router.push({ path: '/intelligent-marketing/create-ivr-manage', query: { id: row.id, businessLine, copy: 1 }})
          break
        }
      }
    },
    handleActions() {
      this.$router.push({ name: 'CreateIvrManagePlan', query: { businessLine: this.activeTab }})
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
