<template>
  <div>
    <el-dialog
      title="选择课程"
      :visible.sync="visiable"
      width="700px"
      @close="onDialogClose"
    >
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
        :attr="{ 'max-height': '400px' }"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import searchs from './searchs'
import columns, { tableActions } from './columns'
// import { downloadBatchTransferTemplete } from '@/api/express/manage'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'DialogLesson',
  props: {
    handleDialogVis: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      visiable: true,
      columns,
      searchs,
      total: 0,
      list: [{ checked: false }, { checked: true }],
      searchQuery: {},
      listQuery: { ...init_pagaination },
      actionFunction: tableActions({ handleTableAction: this.handleTableAction })
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    console.log('【11】', 11)
  },
  methods: {
    onDialogClose(ifRefreshList) {
      this.$emit('handleDialogVis', '', '', ifRefreshList)
    },
    initGetList() {
      this.listQuery = { ...init_pagaination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      // const { searchQuery, listQuery } = this
    },
    submitSearch(value) {
      console.log('value', value)
      this.searchQuery = { ...value }
      this.initGetList()
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
