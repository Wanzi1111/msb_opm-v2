<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visiable"
      width="750px"
      @close="onDialogClose"
    >
      <basics-search
        ref="searchs"
        :loading="loadings._ums_meixiu_api_out_m_task_manage_getJobs"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />
      <basics-table
        :loading="loadings._ums_meixiu_api_out_m_task_manage_getJobs"
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
import { getJobs } from '@/api/intelligentMarketing'

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
    countryType: {
      type: Number,
      default: 0
    },
    supplierId: {
      type: Number,
      default: 1
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
    ...mapGetters(['loadings']),
    title() {
      return this.supplierId === 3 ? '94智能' : '一知平台'
    }
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
      const { listQuery: { page: pageNum, limit: pageSize }, searchQuery, countryType } = this
      getJobs({ jobId: this.supplierId, pageNum, pageSize, countryType, ...searchQuery })
        .then(({ payload }) => {
          if (this.supplierId === 3) {
            this.list = payload.map(v => {
              v.jobId = v.taskId
              v.jobName = v.taskName
              v.checked = v.jobId === this.checkedTaskId
              return v
            })
            this.total = payload.length
          } else {
            const { list, totalElements } = payload
            this.list = list.map(v => { v.checked = v.jobId === this.checkedTaskId; return v })
            this.total = totalElements
          }
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
