<template>
  <div>
    <el-dialog
      title="天润平台"
      :visible.sync="visiable"
      width="750px"
      @close="onDialogClose"
    >
      <basics-search
        ref="searchs"
        :loading="loadings._ums_meixiu_api_out_m_ivr_getJobs"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />
      <basics-table
        :loading="loadings._ums_meixiu_api_out_m_ivr_getJobs"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
        :attr="{ 'max-height': '400px' }"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import searchs from './searchs'
import columns, { tableActions } from './columns'
import { ivrGetJobs } from '@/api/intelligentMarketing'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'DialogThirdPartyTaskPlatform',
  props: {
    handleDialogVis: {
      type: Function,
      default: () => {}
    },
    jobId: {
      type: String,
      default: ''
    },
    businessLine: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      visiable: true,
      columns,
      searchs,
      total: 0,
      list: [],
      searchQuery: {},
      listQuery: { ...init_pagaination },
      actionFunction: tableActions({ handleTableAction: this.handleTableAction }),
      checkedTaskId: this.jobId || ''
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.getList()
  },
  methods: {
    onDialogClose() {
      this.$emit('handleDialogVis', '', '', 'task', this.checkedTaskId)
    },
    initGetList() {
      this.listQuery = { ...init_pagaination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { listQuery: { page: pageNum, limit: pageSize }, searchQuery, businessLine } = this
      ivrGetJobs({ pageNum, pageSize, businessLine, ...searchQuery })
        .then(({ payload: { list, totalElements }}) => {
          this.list = list.map(v => { v.checked = v.jobId === this.checkedTaskId; return v })
          this.total = totalElements
        })
    },
    submitSearch(value) {
      this.searchQuery = { ...value }
      this.initGetList()
    },
    handleTableAction(row) {
      this.list.forEach(v => {
        v.checked = v.jobId === row.jobId
      })
      this.checkedTaskId = row.jobId
    }
  }
}
</script>
