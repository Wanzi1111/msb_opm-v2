<template>
  <div>
    <!-- 搜索 -->
    <basics-search
      :loading="loadings._ums_meixiu_api_im_g_v1_coupon_query_coupon"
      :searchs="searchs"
      @submitSearch="submitSearch"
    />
    <basics-action title="卡卷库" line :actions="basicsActionConfig" />
    <!-- 表格数据 -->
    <basics-table
      :columns="columns"
      :loading="loadings._ums_meixiu_api_im_g_v1_coupon_query_coupon"
      :list="tableData"
      :action-function="actionFunction"
      :get-list="getUserInfo"
      :list-query="paginationQuery"
      :total="total"
      :attr="attr"
    />
    <addDialog :form-visible="dialogFormVisible" @closeDetail="closeDetail" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BasicsTable from '@/components/BasicsTable'
import BasicsSearch from '@/components/BasicsSearch'
import addDialog from './components/addDialog'
import { TableColumnsConfig, TableActionsConfigFn, SearchConfig, BasicsActionConfigFn } from './config'

const initPaninationQuery = { page: 1, limit: 10 }

export default {
  components: { BasicsTable, BasicsSearch, addDialog },
  data() {
    return {
      columns: TableColumnsConfig,
      searchs: SearchConfig,
      actionFunction: TableActionsConfigFn({
        viewDetail: this.showDetailDialog,
        deleteItem: this.showDeleteDialog
      }),
      basicsActionConfig: BasicsActionConfigFn({
        addGood: this.addCardDialog
      }),
      searchQuery: {},
      total: 0,
      paginationQuery: { ...initPaninationQuery }, // 分页查询query
      dialogFormVisible: false,
      tableData: [],
      delTit: '该卡券有部分已发放，无法删除',
      attr: {
        stripe: true
      }
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.$nextTick(() => {
      this.getUserInfo()
    })
  },
  methods: {
    getUserInfo() {
      const { page, limit: pageSize } = this.paginationQuery
      this.$api
        .queryCouponApi({ page, pageSize, ...this.searchQuery })
        .then(res => {
          const { code, payload, status } = res
          if (code !== 0) {
            this.$message.error(status)
            return
          }
          this.total = Number(payload.totalElements)
          this.tableData = payload.content
          console.log('res', res)
        })
    },
    // 搜索提交
    submitSearch(val) {
      this.searchQuery = { ...val }
      this.paginationQuery = { ...initPaninationQuery }
      this.getUserInfo()
    },
    showDetailDialog(dat, row) {
      // card-library/detailCard
      // query: { proType: 'add' }

      this.$router.push({
        path: 'card-library/detailCard',
        query: {
          id: row.id,
          couponName: row.couponName,
          startTime: row.startTime,
          endTime: row.endTime
        }
      })
    },
    // 点击新增卡卷
    addCardDialog() {
      this.dialogFormVisible = true
    },
    closeDetail() {
      this.getUserInfo()
      this.dialogFormVisible = false
    },
    // 删除
    showDeleteDialog(dat, row) {
      const { id, couponName } = row
      this.$confirm('选中的未发放的卡密将全部删除', '确定要删除这个卡券吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$api
            .delCouponApi({ id, couponName })
            .then(res => {
              this.getUserInfo()
            })
            .catch(e => {
              console.log('e', e.message)
              this.$confirm(e.message, '删除失败', {
                confirmButtonText: '知道了',
                showCancelButton: false
              }).then(() => {
                console.log('e---')
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
