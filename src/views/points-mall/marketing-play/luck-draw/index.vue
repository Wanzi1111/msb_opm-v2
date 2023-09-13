<template>
  <div>
    <basics-search
      ref="searchs"
      :key="activeId"
      :loading="loadings._ums_meixiu_api_im_g_v1_admin_rvactivity_activityList"
      :searchs="searchs"
      @submitSearch="submitSearch"
    />
    <basics-table
      ref="table"
      :table="table"
      :loading="loadings._ums_meixiu_api_im_g_v1_admin_rvactivity_activityList"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :action-function="actionFunction"
      :list-query="listQuery"
    />
  </div>
</template>

<script>
import BasicsSearch from '@/components/BasicsSearch'
import searchs from './searchs/searchs'
import { mapGetters } from 'vuex'
import columns, { actions } from './columns'
import { omit } from 'lodash'

export default {
  name: 'LuckDraw',
  components: { BasicsSearch },
  props: {
    activeId: {
      default: () => {
        return '2'
      },
      type: String
    }
  },
  data() {
    return {
      table: { stripe: true },
      columns: columns(),
      actionFunction: actions(this.tableAction),
      listQuery: {
        page: 1,
        limit: 20
      },
      searchs: searchs,
      list: [],
      total: 0,
      query: {}
    }
  },

  computed: {
    ...mapGetters(['loadings'])
  },

  watch: {},

  mounted() {
    // 获取列表
    this.getList()
  },

  methods: {
    tableAction(dat, row, index, e) {
      switch (e) {
        case 'edit':
          this.edit(row)
          break
        case 'prizeSetting':
          this.prizeSetting(row)
          break
        default:
          break
      }
    },
    // 设置奖品
    prizeSetting(row) {
      this.$router.push({
        path: '/points-mall/prize-setting',
        query: { activityId: row.id, authRange: row.authRange }
      })
    },
    // 编辑
    edit(row) {
      this.$router.push({
        path: '/points-mall/luck-draw',
        query: { type: '编辑', row: JSON.stringify(row) }
      })
    },
    // 获取列表数据
    async getList() {
      let val = {
        page: this.listQuery.page - 1,
        size: this.listQuery.limit,
        ...this.query
      }
      val = omit(val, ['time'])
      Object.keys(val).forEach((e) => {
        if (val[e] === '' || val[e] === null || val[e] === undefined) { delete val[e] }
      })
      const res = await this.$api.rvactivityList(val)
      const { list, total } = res.payload
      this.list = list
      this.total = parseInt(total)
    },
    // 搜索
    submitSearch(val) {
      const [startTimeInfo, endTimeInfo] = val.time || []
      this.query = { ...val, startTimeInfo, endTimeInfo }
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped></style>
