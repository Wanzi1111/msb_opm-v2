<template>
  <div>
    <div class="title-container">
      <basics-title
        title="用户运营流程文件"
        :actions="actions"
        line
      />
    </div>

    <div v-loading="appLoading" class="app-container">

      <!-- <basics-search
        ref="searchs"
        :searchs="searchs"
        @submitSearch="submitSearch"
      /> -->

      <basics-table
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      >
        <template slot="imageList" slot-scope="scope">
          <el-image style="width: 80px; height: 80px" :src="scope.row.imageUrlList[0]" :preview-src-list="scope.row.imageUrlList" />
        </template>
      </basics-table>
      <template v-if="dialogType">
        <dialog-add-process v-if="['addProcess', 'editProcess'].includes(dialogType)" :dialog-data="dialogData" @handleDialogVis="handleDialogVis" />
      </template>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import moment from 'moment'
// import searchs from './search'
import columns, { tableActions } from './columns'
import { actions } from './config'
import DialogAddProcess from './components/dialogAddProcess'
import { getProcessList, delProcess } from '@/api/intelligentMarketing/operation-process'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'OperationProcess',
  components: { DialogAddProcess },
  data() {
    return {
      columns,
      // searchs,
      total: 0,
      list: [],
      // searchQuery: {},
      dialogType: '',
      dialogData: {},
      listQuery: { ...init_pagaination },
      actions: actions({ handleActions: this.handleActions }),
      actionFunction: tableActions({ handleTableAction: this.handleTableAction })
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    appLoading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_sms_api_web_process_list ||
      loadings._ums_meixiu_api_sms_api_web_process_delete
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    initGetList() {
      this.listQuery = { ...init_pagaination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { searchQuery, listQuery: { page: pageNum, limit: pageSize }} = this
      getProcessList({ pageNum, pageSize, ...searchQuery })
        .then(({ payload: { list, totalSize }}) => {
          this.list = list.map(v => {
            if (v.imageList.length) {
              v.imageUrlList = v.imageList.map(val => val.imageUrl)
            }
            return v
          })
          this.total = totalSize
        })
    },
    submitSearch(value) {
      const query = cloneDeep(value)
      if (query.time) {
        query.startDate = moment(query.time[0]).format('YYYY-MM-DD')
        query.endDate = moment(query.time[1]).format('YYYY-MM-DD')
      }
      delete query.time
      this.searchQuery = { ...query }
      this.initGetList()
    },
    handleTabClick(val) {
      this.activeTab = val
      this.getList()
    },
    handleTableAction(type, row) {
      const { id } = row
      switch (type) {
        case 'del': {
          this.$confirm('确定删除吗？', '提示', { type: 'warning' })
            .then(() => {
              delProcess({ id })
                .then(() => {
                  this.$message.success('删除成功~')
                  this.getList()
                })
            })
          break
        }
        case 'edit': {
          this.handleDialogVis('editProcess', row)
          break
        }
      }
    },
    handleActions() {
      this.handleDialogVis('addProcess')
    },
    handleDialogVis(type, data, refresh) {
      this.dialogType = type || ''
      this.dialogData = data || {}
      refresh && this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
