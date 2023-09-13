<template>
  <div>
    <div v-loading="loadings._ums_meixiu_api_im_g_v2_overseas_getCouponOverseas">
      <el-tabs v-model="activeName" style="padding: 0 10px">
        <el-tab-pane v-for="tab in tabList" :key="tab.name" :label="tab.label" :name="tab.name" />
      </el-tabs>
      <!-- 搜索 -->
      <basics-search ref="searchs" :searchs="searchs" @submitSearch="submitSearch" />
      <!-- 操作 -->
      <basics-action :actions="actions" />
      <!-- 表格 -->
      <basics-table
        ref="table"
        :loading="gLoadings._ums_meixiu_api_im_g_v1_admin_query_order"
        :get-list="getList"
        v-bind="tableConfig"
        @selection-change="handleSelectionChange"
      />
    </div>
    <!--充值-->
    <el-dialog
      title="充值"
      :visible.sync="visible"
      width="500px"
    >
      <div>
        <basics-form
          :loading="gLoadings._ums_meixiu_api_im_g_v2_overseas_couponOne"
          :forms="forms"
          :actions="formActions"
          @submitForm="submitForm"
        />
      </div>
    </el-dialog>
    <!-- 导入 -->
    <imports v-if="importVisible" :visible="importVisible" :close="closeImports" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { queryOverseasOrder, exportOverseasOrder, recharge, cancelOverseasOrder } from '@/api/points-mall-api/mall'
import { createBlob } from '@/utils'
import actions from './actions'
import columns, { actions as tableActions } from './columns'
import searchs from './searchs'
import forms, { actions as formActions } from './forms'
import Imports from './components/Imports'
import { BusinessTypeList } from './schema'

export default {
  name: 'OverseasGoods',
  components: { Imports },
  data() {
    return {
      importVisible: false,
      visible: false,
      tabList: BusinessTypeList,
      activeName: '1',
      actions: actions({ exports: this.exportOverseasOrder, imports: this.importOverseasOrder }),
      searchs: searchs,
      tableConfig: {
        list: [],
        total: 0,
        columns: columns,
        listQuery: {
          page: 1,
          limit: 10
        },
        actionFunction: tableActions({ recharge: this.recharge, cancel: this.cancel })
      },
      forms: forms,
      formActions: formActions({ closeDl: () => { this.visible = false } }),
      rechargeId: '',
      idList: []
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    activeName(val = '1', oldVal) {
      if (val && val !== oldVal) {
        this.tableConfig.listQuery = {
          page: 1,
          limit: 10
        }
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSelectionChange(val) {
      this.idList = val.map(item => { return Number(item.orderId) })
    },
    // 充值
    recharge(id) {
      this.rechargeId = id
      this.visible = true
    },
    // 取消
    cancel(orderId) {
      this.$confirm('确认取消充值，取消之后不可恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await cancelOverseasOrder({ orderId })
        this.getList()
        this.$message({
          type: 'success',
          message: '取消充值成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 充值
    async submitForm(val) {
      const res = await recharge({ ...val, id: this.rechargeId })
      this.visible = false
      if (res.code === 0) {
        this.$message.success('充值成功')
        this.getList()
      }
    },
    // 获取列表
    getList() {
      const { query, listQuery } = this.tableConfig
      const data = {
        ...query,
        businessType: this.activeName,
        pageNo: listQuery.page,
        pageSize: listQuery.limit
      }
      if (query && query.time && query.time.length) {
        data.start = query.time[0] ? moment(query.time[0]).valueOf() : ''
        data.end = query.time[1] ? moment(query.time[1]).valueOf() : ''
        delete data.time
      }
      queryOverseasOrder(data).then(res => {
        this.tableConfig.list = res.payload.list
        this.tableConfig.total = parseInt(res.payload.count || 0)
      })
    },
    // 搜索
    submitSearch(val) {
      this.tableConfig.listQuery = {
        page: 1,
        limit: 10
      }
      this.tableConfig.query = val
      this.getList()
    },
    // 批量导出
    exportOverseasOrder() {
      const data = {}
      const { time } = this.$refs.searchs.form
      if (this.idList.length) {
        data.idList = this.idList
      } else {
        if (!time || !time.length) {
          this.$message({
            message: '请先选择日期！',
            type: 'warning'
          })
          return
        }
        data.start = time[0] ? moment(time[0]).valueOf() : ''
        data.end = time[1] ? moment(time[1]).valueOf() : ''
      }
      exportOverseasOrder(data).then(res => {
        const title = time && time.length ? `${moment(time[0]).format('YYYY-MM-DD')}-${moment(time[1]).format('YYYY-MM-DD')}-未充值状态账号充值.xls` : '未充值状态账号充值.xls'
        createBlob(title, res)
        this.$message.success('导出成功')
      })
    },
    // 打开导入弹窗
    importOverseasOrder() {
      this.importVisible = true
    },
    // 关闭导入弹窗
    closeImports(val) {
      this.importVisible = false
      if (val === 1) {
        this.getList()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .search-item-label {
  width: 100px !important;
}
</style>

