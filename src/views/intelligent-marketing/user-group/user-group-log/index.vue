<!--
 * @Author: ZhangYeLei
 * @Date: 2022-04-18 14:35:35
 * @LastEditTime: 2022-04-28 14:21:19
 * @LastEditors: ZhangYeLei
-->
<template>
  <div class="app-container">
    <basics-title
      title="日志"
    />

    <basics-table
      :loading="loadings._big_data_client_profile_group_log_page"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
    />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import BasicsTable from '@/components/BasicsTable'
import { getGroupLogList } from '@/api/intelligentMarketing'
import columns from './columns'

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'UserGroupLog',
  components: { BasicsTable },
  data() {
    return {
      columns,
      total: 0,
      list: [],
      listQuery: { ...init_pagination }
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
    getList() {
      const { listQuery: { page: pageNo, limit: pageSize }, $route: { query: { id: groupId }}} = this
      getGroupLogList({ groupId, pageNo, pageSize })
        .then(res => {
          const { result: { list, total }} = res
          this.list = list
          this.total = total
        }).catch(() => {
          this.list = []
          this.total = 0
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
