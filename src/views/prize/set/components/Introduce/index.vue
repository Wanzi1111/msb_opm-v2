<template>
  <basics-table
    ref="table"
    :table="table"
    :loading="loadings._ums_api_activity_prize_getCardConfig"
    :list="list"
    :get-list="getList"
    :columns="columns"
    :total="total"
    :list-query="listQuery"
    :action-function="actionFunction"
  />
</template>

<script>
import columns, { actions as act } from './columns'
import { mapGetters } from 'vuex'
import { getCardConfig } from '@/api/prize/set'

export default {
  name: 'Share',
  data() {
    return {
      columns: columns,
      table: { stripe: true },
      list: [], // [{ name: '111', cardType: 1, takeCount: 3, usedCount: 3 }],
      total: 0,
      query: {},
      listQuery: {
        page: 1,
        limit: 10
      },
      actionFunction: act({ handleDetail: this.handleDetail })
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      const { listQuery: { page, limit }} = this
      const params = {
        pageNo: page - 1,
        pageSize: limit
      }
      getCardConfig(params).then(res => {
        this.list = res.payload.content || []
        this.total = Number(res.payload.totalElements || 0)
      })
    },
    handleDetail(dat, row) {
      console.log('查看详情', row)
      this.$router.push({
        name: 'IntroduceDetail',
        query: {
          type: row.cardType === 1 ? 'card' : 'coupon', // card: 卡密 / coupon: 券码
          name: row.name,
          takeCount: row.takeCount,
          usedCount: row.usedCount
        }
      })
    }

  }
}
</script>
