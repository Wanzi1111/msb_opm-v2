<template>
  <div>
    <div class="title-container">
      <basics-title title="物流单管理" line />
    </div>
    <div v-loading="loadings._ums_meixiu_api_im_g_v2_order_expressList" class="app-container">
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
        @changeSearch="changeSearch"
      />

      <basics-tabs
        :tab-list="cTabList"
        :active-tab="activeCTab"
        @handleTabClick="handleCTabClick"
      />

      <!-- <basics-action :actions="actions" /> -->

      <basics-table
        :loading="loadings._ums_api_uc_api_platform_user_list"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
        @selection-change="handleSelectionChange"
      />

      <template v-if="dialogType">
        <dialog-confirm-logis v-if="['pass', 'rePush'].includes(dialogType)" :dialog-data="dialogData" @handleDialogVis="handleDialogVis" />
        <dialog-logis-process v-else-if="['logisProcess'].includes(dialogType)" :dialog-data="dialogData" @handleDialogVis="handleDialogVis" />
        <dialog-modify-logis v-else-if="['modifyLogis'].includes(dialogType)" :dialog-data="dialogData" @handleDialogVis="handleDialogVis" />
      </template>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import moment from 'moment'
import { getExpressList, immediatelyPush } from '@/api/points-mall/logis-manage'
import { cloneDeep } from 'lodash'
import searchs from './search'
import columns, { tableActions } from './columns'
import { tabList, cTabList, actions } from './config'
import DialogConfirmLogis from './components/dialogConfirmLogis'
import DialogLogisProcess from './components/dialogLogisProcess'
import DialogModifyLogis from './components/dialogModifyLogis'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'LogisManage',
  components: { DialogConfirmLogis, DialogLogisProcess, DialogModifyLogis },
  data() {
    return {
      columns,
      searchs,
      tabList,
      cTabList,
      total: 0,
      list: [],
      activeTab: 'ONETOONE',
      activeCTab: '0',
      dialogType: '',
      dialogData: '',
      searchQuery: {},
      listQuery: { ...init_pagaination },
      actions: actions({ handleActions: this.handleActions }),
      actionFunction: tableActions({ handleTableAction: this.handleTableAction }),
      multipleSelection: [],
      sign: true
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
  },
  methods: {
    initGetList() {
      this.listQuery = { ...init_pagaination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { activeTab, activeCTab, searchQuery, listQuery: { page: pageNo, limit: pageSize }} = this
      const payload = {
        pageNo, pageSize, businessType: activeTab,
        status: activeCTab === 'system' || activeCTab === 'artificial' ? '4' : activeCTab !== '0' ? activeCTab : '',
        pushErrorType: activeCTab === 'system' ? '1,2' : activeCTab === 'artificial' ? '3' : '', ...searchQuery
      }
      getExpressList(payload)
        .then(({ payload: { list, count }}) => {
          this.list = list
          this.total = count
        })
    },
    changeSearch(value) {
      if (this.sign) {
        const newValue = cloneDeep(value)
        if (newValue.time?.length) {
          newValue.start = moment(newValue.time[0]).valueOf()
          newValue.end = moment(newValue.time[1]).valueOf()
        }
        delete newValue.time
        this.searchQuery = { ...newValue }
        this.sign = false
        this.initGetList()
      }
    },
    submitSearch(value) {
      const newValue = cloneDeep(value)
      if (newValue.time?.length) {
        newValue.start = moment(newValue.time[0]).valueOf()
        newValue.end = moment(newValue.time[1]).valueOf()
      }
      delete newValue.time
      this.searchQuery = { ...newValue }
      this.initGetList()
    },
    handleTabClick(val) {
      this.activeTab = val
      this.initGetList()
    },
    handleCTabClick(val) {
      this.activeCTab = val
      this.initGetList()
    },
    handleTableAction(type, row) {
      switch (type) {
        case 'pass':
        case 'logisProcess':
        case 'modifyLogis':
        case 'rePush': {
          this.handleDialogVis(type, row)
          break
        }
      }
    },
    handleActions() {
      const { multipleSelection } = this
      if (!multipleSelection?.length) {
        this.$message.error('请先选择物流单！')
        return
      }
      const ids = multipleSelection.map(v => v.express_center_id)
      immediatelyPush({ id: ids.toString() })
        .then(() => {
          this.$message.success('批量推单成功~')
          this.getList()
        })
    },
    handleDialogVis(type, data, refresh) {
      this.dialogType = type || ''
      this.dialogData = data || ''
      refresh && this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
