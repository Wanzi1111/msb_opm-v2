<template>
  <div>
    <basics-search v-if="type !== 'INKIND'" ref="searchs" :loading="loading" :searchs="searchs" @changeSearch="changeSearch" @submitSearch="submitSearch" />
    <basics-search v-else :loading="loading" :searchs="searchsCard" @changeSearch="changeSearch" @submitSearch="submitSearch" />
    <basics-table
      ref="table"
      :attr="attr"
      :loading="loading"
      :columns="columns"
      :list="list"
      :get-list="getList"
      :total="total"
      :list-query="listQuery"
      :action-function="actions"
    >
      <template slot="id" slot-scope="scope">
        {{ type !== 'INKIND' ? scope.row.epc : scope.row.productCode }}
      </template>
      <template slot="total" slot-scope="scope">
        {{ type === 'INKIND' ? (scope.row.goodsSupplier!=='THIRD_HONGYUNA' ? scope.row.orderStockNum || '-' : scope.row.stockNum || '-') : scope.row.total }}
      </template>
    </basics-table>
  </div>
</template>

<script>
import { coupon, selectCoupon, queryAllProductsFore, goodscouponEpc } from '@/api/points-mall/mall-admin'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'
import searchs from './searchs/list'
import { realGoods, goods } from './searchs/listcard'
import columns, { actions } from './columns/list'
import { mapGetters } from 'vuex'
import { string } from 'clipboard'

export default {
  name: 'ChoiceGoods',
  components: { BasicsSearch, BasicsTable },
  props: {
    countryType: {
      default() {
        return 'DOMESTIC'
      },
      type: String
    },
    type: {
      default() {
        return 'INKIND'
      },
      type: String,
      required: true
    },
    businessType: {
      default() {
        return 'ONETOONE'
      },
      type: String
    },
    listQuery: {
      type: Object,
      default() {
        return {
          page: 1,
          limit: 10
        }
      },
      required: true
    },
    // 所属平台
    goodsSupplier: {
      type: string,
      default() {
        return '0'
      }
    }
  },
  data() {
    return {
      searchs: searchs,
      searchsCard: goods,
      attr: { stripe: true },
      actions: actions({ choice: this.choice }),
      total: 0,
      list: [],
      filterArr: [],
      query: {}
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    loading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_im_g_v1_goodscoupon_query_coupons_version1 ||
        loadings._ums_meixiu_api_im_g_v1_goodscoupon_query_epc ||
        loadings._logistics_api_queryAllProductsFore
    },
    columns() {
      if (this.type === 'CARD_CODE' && this.countryType !== 'DOMESTIC') {
        const newColumns = JSON.parse(JSON.stringify(columns))
        newColumns.splice(2, 1)
        newColumns[1].prop = 'goodsName'
        return newColumns
      } else {
        return columns
      }
    }
  },
  watch: {
    type() {
      this.getList()
      this.goodscouponEpc()
    },
    businessType() {
      this.getList()
      this.goodscouponEpc()
    }
  },
  created() {
    this.goodscouponEpc()
    if (this.goodsSupplier === '0') this.searchsCard = goods
    else this.searchsCard = realGoods
  },
  methods: {
    goodscouponEpc() {
      goodscouponEpc({ businessType: this.businessType, currencyType: 'GOLDCOIN', type: this.type }).then((res) => {
        this.filterArr = res.payload
        this.getList()
      })
    },
    changeSearch(query) {
      this.query = query
    },
    submitSearch(val) {
      this.listQuery = {
        page: 1,
        limit: 10
      }
      this.query = val
      this.getList()
    },

    async getList() {
      if (this.goodsSupplier === 'THIRD_HONGYUNA') return this.getRealList()
      const { listQuery } = this
      const searchData = {
        page: listQuery.page,
        pageSize: listQuery.limit,
        ...this.query
      }
      if (this.type === 'CARD_CODE') {
        searchData.countryType = this.countryType
      }
      if (this.type !== 'INKIND') {
        searchData.businessType = this.businessType
        searchData.type = this.type
        let data = {}
        if (this.type === 'CARD_CODE' && this.countryType !== 'DOMESTIC') {
          const res = await selectCoupon(searchData)
          data = res.payload || {}
        } else {
          const res = await coupon(searchData)
          data = res.payload || {}
        }
        this.list = data.content.map(ma => {
          if (this.filterArr.some(so => ma.epc === so)) {
            ma = { ...ma, stStatus: true }
          }
          return ma
        })
        this.list.forEach(item => {
          // item.productName = item.
          item.totalStockNum = item.surplus
        })
        this.total = Number(data.totalElements) || 0
      } else {
        // data.productType = '0906'
        const arr = []
        // data.productChildType = Array.isArray(data.productChildType) ? data.productChildType.flat() : ''
        searchData.productChildType = ['0906']
        Array.isArray(searchData.productChildType) && searchData.productChildType.forEach(item => {
          if (item.length === 4) {
            arr.push(item)
          }
        })
        searchData.productChildType = arr
        queryAllProductsFore(searchData).then(res => {
          const data = res.data || {}
          this.list = data.rows.map(ma => {
            if (this.filterArr.some(so => ma.productCode === so)) {
              ma = { ...ma, stStatus: true }
            }
            return ma
          })
          this.total = data.records || 0
        })
      }
    },
    choice(row) {
      goodscouponEpc({ businessType: this.businessType, currencyType: 'GOLDCOIN', type: this.type }).then((res) => {
        if (this.type === 'INKIND') {
          if (res.payload.indexOf(row.productCode) < 0) {
            this.$emit('choice', row)
          } else {
            this.$message.error('该商品已经添加过')
          }
        } else {
          if (res.payload.indexOf(row.epc) < 0) {
            this.$emit('choice', row)
          } else {
            this.$message.error('该商品已经添加过')
          }
        }
      })
    },
    getRealList() {
      const { page, limit: pageSize } = this.listQuery
      this.$api
        .queryThirdGoods({ page, pageSize, ...this.query, goodsCouponStatus: 'ENABLE' })
        .then(res => {
          const { code, status, payload } = res
          if (code !== 0) {
            this.$message.error(status)
            return
          }
          this.list = payload.content.map(ma => {
            if (this.filterArr.some(so => ma.productCode === so)) {
              ma = { ...ma, stStatus: true }
            }
            return ma
          })
          this.total = Number(payload.totalElements)
        })
    }
  }
}
</script>
