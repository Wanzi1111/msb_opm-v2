<template>
  <div>
    <div class="title-container">
      <basics-title title="订单管理" line />
    </div>
    <div v-loading="loadings._ums_meixiu_api_im_g_v2_order_backendOrderList || loadings._ums_meixiu_api_im_g_v2_order_exportOrder" class="app-container">
      <el-tabs v-model="businessType" @tab-click="handleTabClick">
        <el-tab-pane v-for="(item, index) in businessTypeList" :key="index" :label="item.label" :name="item.name" />
      </el-tabs>
      <div v-if="searchs" style="margin-top: 15px;">
        <basics-search
          ref="searchs"
          :searchs="searchs"
          :is-download="true"
          @download="handleExport"
          @submitSearch="submitSearch"
        />
      </div>

      <!-- <basics-action :actions="actions" /> -->

      <basics-table
        ref="table"
        :table="table"
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
import moment from 'moment'
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'
import { createBlob } from '@/utils'
import BasicsTable from '@/components/BasicsTable'
import { getOrderList, exportOrder } from '@/api/point-order/point-order'
import searchs, { defaultValObj } from './searchs/searchs'
import columns, { tableActions } from './columns'
import { BusinessTypeList } from './schema'
import actions from './actions'

export default {
  name: 'PointOrder',
  components: { BasicsTable },
  data() {
    return {
      actions: actions({ handleExport: this.handleExport }),
      businessType: 'ONETOONE',
      businessTypeList: BusinessTypeList,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      query: {
        time: defaultValObj.time
      },
      table: { stripe: true },
      searchs: searchs,
      list: [],
      columns: columns(),
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
    // 切换
    handleTabClick() {
      this.listQuery = {
        page: 1,
        limit: 20
      }
      this.getList()
    },
    // 点击搜索
    submitSearch(val) {
      const vals = cloneDeep(val)
      this.listQuery = { page: 1, limit: 20 }
      this.query = vals
      this.getList()
    },
    // 获取订单列表
    getList() {
      const { listQuery } = this
      const time = this.query.time || []
      const data = {
        pageNo: listQuery.page,
        pageSize: listQuery.limit,
        isBear: this.businessType === 'ONETOONE' ? 0 : 1,
        ...this.query
      }
      // data = omitBy(data, (v) => !!v)
      console.log('data', data)
      if (time && time.length) {
        data.start = moment(time[0]).valueOf()
        data.end = moment(time[1]).valueOf()
      }
      delete data.time
      for (const label in data) {
        if (!data[label]) {
          delete data[label]
        }
      }
      getOrderList(data).then((res) => {
        const { list, count } = res.payload
        this.list = list
        this.total = count || 0
      })
    },
    // 导出
    handleExport() {
      if (!this.query.time?.length) {
        this.$message.error('请先选择时间范围～')
        return
      }
      const queryData = {
        isBear: this.businessType === 'ONETOONE' ? 0 : 1,
        start: moment(this.query.time[0]).valueOf(),
        end: moment(this.query.time[1]).valueOf(),
        ...this.query
      }
      delete queryData.time
      exportOrder(queryData).then(res => {
        createBlob(`订单记录${moment(this.query.time[0]).format('YYYY.MM.DD')}-${moment(this.query.time[1]).format('YYYY.MM.DD')}.xls`, res)
      })
    },
    handleTableAction(type, rowData) {
      const { orderId, goodsType } = rowData
      this.$router.push({ name: 'OrderDetail', query: { id: orderId, type: goodsType }})
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .search-item-label {
  width: 100px !important;
}
</style>
