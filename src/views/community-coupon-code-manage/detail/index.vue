<template>
  <div>
    <div class="title-container">
      <basics-title
        title="券码详情"
        line
      />
    </div>

    <div v-loading="appLoading" class="app-container">

      <basics-search
        ref="searchs"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />
      <basics-table
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
      />
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import moment from 'moment'
import { cloneDeep } from 'lodash'
import { getCouponDetail } from '@/api/community-coupon-code-manage'
import searchs from './search'
import columns from './columns'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'CommunityCouponCodeManageDetail',
  data() {
    return {
      columns,
      searchs,
      total: 0,
      list: [],
      searchQuery: {},
      listQuery: { ...init_pagaination }
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    appLoading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_ofa_coupon_detail
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
      const { $route: { query: { id }}} = this
      getCouponDetail({ pageNum, pageSize, couponId: id, ...searchQuery })
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
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
