<template>
  <div>
    <div class="title-container">
      <basics-title
        title="券码列表"
        :actions="actions"
        line
      />
    </div>

    <div v-loading="appLoading" class="app-container">

      <basics-search
        ref="searchs"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />
      <basics-action :actions="act" />
      <basics-table
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
        @selection-change="handleSelectionChange"
      />
      <template v-if="dialogType">
        <dialog-bind-coupon v-if="['bindCode'].includes(dialogType)" :dialog-data="dialogData" @handleDialogVis="handleDialogVis" />
        <dialog-lose-efficacy v-if="['loseEfficacy'].includes(dialogType)" :dialog-data="dialogData" @handleDialogVis="handleDialogVis" />
      </template>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import searchs from './search'
import columns, { tableActions } from './columns'
import { actions } from './config'
import DialogBindCoupon from './components/dialogBindCoupon'
import DialogLoseEfficacy from './components/loseEfficacy'
import { getCouponList, enabledCoupon, disabledCoupon } from '@/api/community-coupon-code-manage'
import { default as act } from './actions'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'CommunityCouponCodeManageList',
  components: { DialogBindCoupon, DialogLoseEfficacy },
  data() {
    return {
      columns,
      searchs,
      total: 0,
      list: [],
      searchQuery: {},
      dialogType: '',
      dialogData: {},
      listQuery: { ...init_pagaination },
      actions: actions({ handleActions: this.handleActions, loseEfficacy: this.loseEfficacy }),
      actionFunction: tableActions({ handleTableAction: this.handleTableAction }),
      act: act({ batchControl: this.batchControl }),
      ids: [] // 列表多选id集合
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    appLoading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_ofa_coupon_list ||
      loadings._ums_meixiu_api_ofa_coupon_enabled ||
      loadings._ums_meixiu_api_ofa_coupon_disabled
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
      getCouponList({ pageNum, pageSize, ...searchQuery })
        .then(({ payload: { list, totalSize }}) => {
          this.list = list
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
    handleTableAction(type, { id }) {
      switch (type) {
        case 'detail': {
          this.$router.push({ path: '/community-coupon-code-manage/detail', query: { id }})
          break
        }
        case 'open': {
          this.$confirm('确定启用吗？', '提示', { type: 'warning' })
            .then(() => {
              enabledCoupon({ id, status: 1 })
                .then(() => {
                  this.$message.success('启用成功~')
                  this.getList()
                })
            })
          break
        }
        case 'off': {
          this.$confirm('确定停用吗？', '提示', { type: 'warning' })
            .then(() => {
              disabledCoupon({ id, status: 0 })
                .then(() => {
                  this.$message.success('停用成功~')
                  this.getList()
                })
            })
          break
        }
        case 'edit': {
          this.handleDialogVis('bindCode', { id })
          break
        }
      }
    },
    handleActions() {
      this.handleDialogVis('bindCode')
    },
    handleDialogVis(type, data, refresh) {
      this.dialogType = type || ''
      this.dialogData = data || {}
      refresh && this.getList()
    },
    // 表格选中行
    handleSelectionChange(val) {
      this.ids = []
      val.forEach(e => {
        this.ids.push(e.id)
      })
    },
    // 批量操作
    batchControl(status) {
      const { ids } = this
      this.$confirm(`点击确认后券码将${status ? '开始' : '停止'}发放，是否确认提交？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!ids.length) return this.$message.warning('请先至少选择一条')
        this.$api.batchUpdateStatus({ ids, status }).then((res) => {
          this.$notify({
            title: '成功',
            message: res.payload.join('；'),
            type: 'success'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 补发失效
    loseEfficacy() {
      this.handleDialogVis('loseEfficacy')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
