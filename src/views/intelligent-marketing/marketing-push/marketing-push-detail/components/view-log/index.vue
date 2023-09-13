<template>
  <div>
    <basics-table
      :loading="loadings._ums_meixiu_api_sms_api_push_market_plan_log"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMarketingPlanLog } from '@/api/intelligentMarketing'
import columns from './columns'

export default {
  name: 'MarketingPushLog',
  components: {},
  data() {
    return {
      columns,
      list: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    getList() {
      const { id } = this.$route.query
      getMarketingPlanLog({ id })
        .then(({ payload }) => {
          this.list = payload
        })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
