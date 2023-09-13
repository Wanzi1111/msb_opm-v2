<template>
  <div>
    <div class="title-container">
      <basics-title title="消息管理" :actions="actions" line />
    </div>

    <div
      v-loading="loadings._ums_meixiu_api_mc_manage_list
        || loadings._ums_meixiu_api_mc_manage_status_switch
        || loadings._ums_meixiu_api_mc_manage_delGroup"
      class="app-container"
    >
      <basics-tabs
        :tab-list="tabList"
        :active-tab="activeTab"
        @handleTabClick="handleTabClick"
      />

      <basics-search
        ref="searchs"
        :loading="loadings._ums_api_uc_api_platform_user_list"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />
      <basics-table
        :loading="loadings._ums_api_uc_api_platform_user_list"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      />
      <template v-if="dialogType">
        <dialog-message-detail v-if="['messageDetail'].includes(dialogType)" :dialog-data="dialogData" @handleDialogVis="handleDialogVis" />
      </template>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { getMessageList, switchMessageStatus, delMessageGroup } from '@/api/system-message'
import searchs from './search'
import columns, { tableActions } from './columns'
import { tabList, actions } from './config'
import DialogMessageDetail from './components/dialogMessageDetail'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'MessageManage',
  components: { DialogMessageDetail },
  data() {
    return {
      columns,
      searchs,
      tabList,
      total: 0,
      list: [],
      activeTab: '0',
      searchQuery: {},
      dialogType: '',
      dialogData: '',
      listQuery: { ...init_pagaination },
      actions: actions({ handleActions: this.handleActions }),
      actionFunction: tableActions({ handleTableAction: this.handleTableAction })
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  // 缓存 刷新列表
  activated() {
    this.getList()
  },
  methods: {
    initGetList() {
      this.listQuery = { ...init_pagaination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { searchQuery, listQuery: { page: pageNum, limit: pageSize }, activeTab } = this
      getMessageList({ app: activeTab, pageNum, pageSize, ...searchQuery })
        .then(({ payload: { list, totalElements }}) => {
          this.list = list
          this.total = totalElements
        })
    },
    submitSearch(value) {
      const newValue = cloneDeep(value)
      if (newValue.time?.length) {
        newValue.startTime = moment(newValue.time[0]).valueOf()
        newValue.endTime = moment(newValue.time[1]).valueOf()
      }
      delete newValue.time

      this.searchQuery = { ...newValue }
      this.initGetList()
    },
    handleTabClick(val) {
      this.activeTab = val
      this.getList()
    },
    handleTableAction(type, row) {
      const { id, status } = row
      switch (type) {
        case 'detail': {
          this.handleDialogVis('messageDetail', row)
          break
        }
        case 'edit': {
          this.$router.push({ name: 'CreateMessage', query: { type: 'edit', data: JSON.stringify({ ...row, app: this.activeTab }) }})
          break
        }
        case 'status': {
          const msg = row.status ? '关闭后，APP消息通知设置页面将不再展示该消息组。' : '开启后，APP消息通知设置页面会立即展示该消息配置。'
          this.$confirm(msg, '提示', { type: 'warning' })
            .then(() => {
              switchMessageStatus({ id, status: +status === 1 ? 0 : 1 })
                .then(() => {
                  this.$message.success('操作成功~')
                  this.getList()
                })
            })
          break
        }
        case 'del': {
          this.$confirm('确定删除该消息组么？', '提示', { type: 'warning' })
            .then(() => {
              delMessageGroup({ id, del: 1 })
                .then(() => {
                  this.$message.success('删除成功~')
                  this.getList()
                })
            })
          break
        }
      }
    },
    handleActions() {
      this.$router.push({ name: 'CreateMessage', query: { type: 'create', data: JSON.stringify({ app: this.activeTab }) }})
    },
    handleDialogVis(type, data, refresh) {
      this.dialogType = type || ''
      this.dialogData = data || ''
      refresh && this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
