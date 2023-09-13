<template>
  <div>
    <basics-search
      :loading="loadings._ums_meixiu_api_im_g_v1_admin_goods_getGoodsPage"
      :searchs="searchList"
      @changeSearch="changeSearch"
      @submitSearch="submitSearch"
    />
    <basics-table
      ref="table"
      :attr="attr"
      :loading="loadings._ums_meixiu_api_im_g_v1_admin_goods_getGoodsPage"
      :columns="columns"
      :list="list"
      :get-list="getList"
      :total="total"
      :list-query="listQuery"
      :action-function="actions"
    />
  </div>
</template>

<script>
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'
import searchList from './searchs/list'
import columns, { actions } from './columns/list'
import { mapGetters } from 'vuex'

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
    businessType: {
      default() {
        return 'BEAR'
      },
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchList,
      attr: { stripe: true },
      actions: actions({ choice: this.choice }),
      total: 0,
      list: [],
      filterArr: [],
      columns,
      query: {}
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    type() {
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    choice(row) {
      this.$emit('choice', row)
    },
    changeSearch(query) {
      this.query = query
    },
    submitSearch(val) {
      this.query = val
      this.getList()
    },
    getList() {
      const { listQuery, type, query } = this
      this.$api
        .getList({
          ...query,
          type,
          page: listQuery.page,
          pageSize: listQuery.limit,
          status: 'PUTAWAY',
          currencyType: 'GOLDCOIN',
          businessType: this.businessType
        })
        .then((res) => {
          if (res.code === 0) {
            const data = res.payload
            this.total = +data.totalElements
            this.list = data.content
          }
        })
    }
  }
}
</script>
