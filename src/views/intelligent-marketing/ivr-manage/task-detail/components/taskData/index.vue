<template>
  <div>
    <div class="app-container">
      <basics-search
        ref="searchs"
        :loading="loadings._ums_meixiu_api_out_m_task_manage_stats"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />
      <basics-table
        :loading="loadings._ums_meixiu_api_out_m_task_manage_stats"
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

import { mapGetters } from 'vuex'
import moment from 'moment'
import { ivrStats } from '@/api/intelligentMarketing'
import searchs from './search'
import columns, { tableActions } from './columns'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'MarketingCallTaskData',
  data() {
    return {
      columns,
      searchs,
      total: 0,
      list: [],
      searchQuery: {},
      listQuery: { ...init_pagaination },
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
  methods: {
    initParamsAndGetList() {
      this.listQuery = { ...init_pagaination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { searchQuery: { time }, listQuery: { page, limit }, $route: { query: { id }}} = this
      const payload = { pageNum: page, pageSize: limit, taskId: id }
      if (time?.length) {
        payload.startDate = moment(time[0]).format('YYYY-MM-DD')
        payload.endDate = moment(time[1]).format('YYYY-MM-DD')
      }
      ivrStats(payload)
        .then(({ payload: { list, totalElements }}) => {
          this.list = list
          this.total = totalElements
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
        case '': {
          break
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.statics-bar {
  .title {
    font-size: 16px;
    color: #272729;
    margin-bottom: 10px;
  }
  span {
    font-size: 14px;
    color: #909399;
    margin-right: 20px
  }
}
</style>
