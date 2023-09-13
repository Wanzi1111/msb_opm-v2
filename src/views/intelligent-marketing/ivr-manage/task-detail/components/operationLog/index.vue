<template>
  <div>
    <div class="app-container ">
      <basics-table
        :loading="loadings._ums_meixiu_api_out_m_task_manage_log"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ivrLog } from '@/api/intelligentMarketing'
import columns from './columns'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'MarketingPushLog',
  components: {},
  data() {
    return {
      listQuery: { ...init_pagaination },
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
      const { listQuery: { page, limit }} = this
      const { id } = this.$route.query
      ivrLog({ pageNum: page, pageSize: limit, id })
        .then(({ payload }) => {
          this.list = payload.list
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.statics-bar {
  .title {
    font-size: 16px;
    color: #272729;
    margin-bottom: 10px;
  }
  span {
    font-size: 14px;
    color: #909399;
    margin-right: 20px
  }
}
</style>
