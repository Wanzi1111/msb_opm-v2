<template>
  <div>
    <el-dialog
      title="选择商品"
      :visible.sync="visiable"
      width="900px"
      :modal="false"
      @close="onDialogClose"
    >
      <div v-loading="loading">
        <basics-search :searchs="searchs" @submitSearch="submitSearch" />
        <basics-table
          ref="table"
          :columns="columns"
          :list="list"
          :get-list="getList"
          :total="total"
          :list-query="listQuery"
          :action-function="tableActions"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryAllProductsFore } from '@/api/points-mall/mall-admin'
import { goodscouponApi } from '@/api/points-mall-api/mall'
import { mapGetters } from 'vuex'
import columns, { tableActions } from './columns'
import searchs from './searchs'

const init_pagination = { page: 1, limit: 10 }

export default {
  name: 'DialogChooseGoods',
  props: {
    handleDialogVis: {
      type: Function,
      default: () => {}
    },
    dialogData: {
      type: Object,
      default: () => ({ type: 'INKIND', line: ['1'] })
    }
  },
  data() {
    return {
      visiable: true,
      searchs,
      searchsValue: {},
      columns,
      tableActions: tableActions({ handleTableActions: this.handleTableActions, goodsEpcs: this.dialogData.goodsEpcs }),
      listQuery: { ...init_pagination },
      list: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    loading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_im_g_v1_admin_coupon_getGoodsCouponInfoDetailPage ||
        loadings._ums_meixiu_api_im_g_v1_goodscoupon_query_epc ||
        loadings._logistics_api_queryAllProductsFore
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    submitSearch(values) {
      this.searchsValue = values
      this.initGetList()
    },
    initGetList() {
      this.listQuery = { ...init_pagination }
      this.getList()
    },
    getList() {
      const { searchsValue, listQuery: { page, limit }, dialogData: { type }} = this
      const payload = { ...searchsValue, page, pageSize: limit, type }
      let getListFn = goodscouponApi
      // 实物
      if (type === 'INKIND') {
        getListFn = queryAllProductsFore
        payload.productChildType = ['0906']
        payload.productName = payload.goodsName || ''
        delete payload.goodsName
        delete payload.type
      }

      getListFn(payload)
        .then(res => {
          // 统一字段
          if (type === 'INKIND') { // 实物
            res.data.rows.forEach(v => {
              v.price = v.stdPrice
              v.img = v.imageIconOssUrl
              v.surplus = v.orderStockNum
              v.goodsEpc = v.productCode
              v.goodsName = v.productName
            })
            this.list = res.data.rows
            this.total = res.data.records
          } else {
            res.payload.content.forEach(v => {
              v.goodsEpc = v.epc
            })
            this.list = res.payload.content
            this.total = +res.payload.totalElements
          }
        })
    },
    onDialogClose(ifRefreshList) {
      this.$emit('handleDialogVis', '', '', ifRefreshList)
    },
    handleTableActions(_, row) {
      this.$emit('handleDialogVis', '', { ...row })
    }
  }
}
</script>
