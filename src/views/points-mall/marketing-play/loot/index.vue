<template>
  <div>
    <basics-search
      ref="searchs"
      :loading="loadings._ums_meixiu_api_im_g_v2_collectactivity_activityList "
      :searchs="searchs"
      @submitSearch="submitSearch"
    />
    <basics-table
      ref="table"
      :table="table"
      :loading="loadings._ums_meixiu_api_im_g_v2_collectactivity_activityList || loadings._ums_meixiu_api_im_g_v2_collectactivity_update_imActivity_status "
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :action-function="actionFunction"
      :list-query="listQuery"
    />
    <template v-if="dialogType">
      <dialog-view-award-users v-if="dialogType === 'viewAwardUser'" :dialog-data="dialogData" @handleDialogVis="handleDialogVis" />
    </template>
  </div>
</template>

<script>
import BasicsSearch from '@/components/BasicsSearch'
import searchs from './searchs/searchs'
import { mapGetters } from 'vuex'
import columns, { actions } from './columns'
import { getMarketingList, updateMarketingStatus } from '@/api/points-mall/marketing-play'
import DialogViewAwardUsers from '../component/DialogViewAwardUsers'

export default {
  name: 'Loot',
  components: { BasicsSearch, DialogViewAwardUsers },
  props: {
    activeId: {
      default: () => {
        return '1'
      },
      type: String
    }
  },
  data() {
    return {
      table: { stripe: true },
      columns: columns(),
      actionFunction: actions({ copy: this.copy, invalid: this.invalid, deleteMarking: this.deleteMarking, edit: this.edit }),
      listQuery: {
        page: 1,
        limit: 20
      },
      searchs: searchs,
      list: [],
      total: 0,
      query: {},
      dialogType: '',
      dialogData: null
    }
  },

  computed: {
    ...mapGetters(['loadings'])
  },

  watch: {
  },

  mounted() {
    // 获取列表
    this.getList()
  },

  methods: {
    // 复制
    copy(dat, row) {
      this.$router.push({ path: '/points-mall/create-marketing', query: { type: '复制', id: row.id }})
    },
    // 失效活动
    async invalid(dat, row) {
      this.$confirm('未有用户成团前可失效活动，活动失效后不会进行抽奖', '确认失效活动？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const data = {
          status: 'INVALID',
          del: 0,
          id: row.id
        }
        await updateMarketingStatus(data)
        // 重新获取列表
        this.getList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除活动
    async deleteMarking(dat, row) {
      this.$confirm('删除后不可恢复', '确认删除活动？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const val = {
          status: row.status,
          del: 1,
          id: row.id
        }
        await updateMarketingStatus(val)
        // 重新获取列表
        this.getList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑
    edit(dat, row) {
      this.$router.push({ path: '/points-mall/create-marketing', query: { type: '编辑', id: row.id }})
    },
    viewAwardUser(userList) {
      if (!userList?.length) return
      this.handleDialogVis('viewAwardUser', userList)
    },
    handleDialogVis(type, data, refresh) {
      this.dialogType = type || ''
      this.dialogData = data || ''
      refresh && this.getList()
    },
    // 获取列表数据
    async getList() {
      const val = {
        page: this.listQuery.page,
        size: this.listQuery.limit,
        ...this.query
      }
      const res = await getMarketingList(val)
      const { list, total } = res.payload
      this.list = list
      this.total = parseInt(total)
    },
    // 搜索
    submitSearch(val) {
      this.query = { ...val }
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
