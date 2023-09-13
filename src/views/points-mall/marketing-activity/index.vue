<template>
  <div>
    <div class="title-container">
      <basics-title title="营销活动" :actions="actions" line />
    </div>

    <div
      v-loading="loadings._ums_meixiu_api_im_g_v2_marketingactivity_getActivityList
        || loadings._ums_meixiu_api_im_g_v2_marketingactivity_updateStatusById
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
import { getMarketingActivityList, updateMarketingActivityStatusById } from '@/api/points-mall/marketing-activity'
import searchs from './search'
import columns, { tableActions } from './columns'
import { tabList, actions } from './config'
import DialogMessageDetail from './components/dialogMessageDetail'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'MarketingActivity',
  components: { DialogMessageDetail },
  data() {
    return {
      columns,
      searchs,
      tabList,
      total: 0,
      list: [],
      activeTab: '1',
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
      const { searchQuery, listQuery: { page: pageNo, limit: pageSize }} = this
      getMarketingActivityList({ pageNo, pageSize, ...searchQuery })
        .then(({ payload: { list, totalCount }}) => {
          this.list = list
          this.total = totalCount
        })
    },
    submitSearch(value) {
      const newValue = cloneDeep(value)
      if (newValue.time?.length) {
        newValue.start = moment(newValue.time[0]).valueOf()
        newValue.end = moment(newValue.time[1]).valueOf()
      }
      delete newValue.time

      this.searchQuery = { ...newValue, status: value.status || 'DEFAULT' }
      this.initGetList()
    },
    handleTabClick(val) {
      this.activeTab = val
      this.getList()
    },
    handleTableAction(type, row) {
      const { id } = row
      switch (type) {
        case 'up': {
          this.$confirm('确定上架该活动吗？', '提示', { type: 'warning' })
            .then(() => {
              updateMarketingActivityStatusById({ id, status: 'ENABLED' })
                .then(() => {
                  this.$message.success('操作成功~')
                  this.initGetList()
                })
            })
          break
        }
        case 'down': {
          this.$confirm('确定下架该活动吗？', '提示', { type: 'warning' })
            .then(() => {
              updateMarketingActivityStatusById({ id, status: 'DISABLED' })
                .then(() => {
                  this.$message.success('操作成功~')
                  this.initGetList()
                })
            })
          break
        }
        case 'edit': {
          this.$router.push({ name: 'CreateMarketingActivity', query: { type: 'edit', id }})
          break
        }
        case 'copy': {
          this.$router.push({ name: 'CreateMarketingActivity', query: { type: 'copy', id }})
          break
        }
      }
    },
    handleActions() {
      this.$router.push({ name: 'CreateMarketingActivity', query: { type: 'create' }})
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
