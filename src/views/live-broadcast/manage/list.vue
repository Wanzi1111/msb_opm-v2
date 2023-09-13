<template>
  <div>
    <div class="title-container">
      <basics-title title="直播管理" line />
    </div>
    <div v-loading="loading" class="app-container">
      <el-tabs v-model="activeState" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in newStateList"
          :key="index"
          :label="item.label"
          :name="item.value"
        />
      </el-tabs>
      <basics-action :actions="act" />
      <basics-table
        ref="table"
        :attr="attr"
        :columns="columns"
        :list="list"
        :get-list="getList"
        :total="total"
        :list-query="listQuery"
        :action-function="actions"
        :row-key="getRowKey"
        @selection-change="handleSelectionChange"
      >
        <template slot="liveName" slot-scope="scope">
          <el-link type="primary" @click="authorSearch(scope.row)">{{
            scope.row.liveName
          }}</el-link>
        </template>
      </basics-table>
    </div>
  </div>
</template>

<script>
import {
  selectLive,
  upDownshelf,
  delLive,
  getRecommendLive,
  recommendLive
} from '@/api/live-broadcast/manage'
import searchs from './searchs/list'
import { default as act } from './actions/list'
import columns, { actions } from './columns/list'
import { mapGetters } from 'vuex'
import { BUSINESS_TYPE } from '@/utils/enum'

export default {
  name: 'Manage',
  data() {
    return {
      searchs: searchs,
      act: act({ create: this.create, put: this.put, off: this.off }),
      attr: { stripe: true },
      columns: columns,
      actions: actions({
        tableAction: this.tableAction
      }),
      total: 0,
      list: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      addState: false,
      examineState: false,
      actType: '',
      activeState: '101',
      statistic: [],
      newStateList: BUSINESS_TYPE,
      liveActivityId: '' // 已推荐的直播活动id
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    loading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_play_v1_live_recommendLive ||
      loadings._ums_meixiu_api_play_v1_live_selectLive ||
      loadings._ums_meixiu_api_play_v1_live_getRecommend
    }
  },
  async mounted() {
    await this.getRecommendLive()
    this.getList()
  },
  async activated() {
    await this.getRecommendLive()
    this.getList()
  },
  methods: {
    put() {
      this.$confirm(`是否执行批量上架操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upDown(0)
      })
    },
    off() {
      this.$confirm(`是否执行批量下架操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upDown(1)
      })
    },
    shelf(row) {
      const status = row.shelfStatus ? 0 : 1
      this.$confirm(`是否执行${!status ? '上' : '下'}架操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upDown(status, row.id)
      })
    },
    upDown(status, id) {
      const { statistic, activeState } = this
      const ids = statistic.map(item => {
        return item.id
      })
      if (ids.length < 1 && !id) return this.$message.error('您还没有选择')
      const idsStr = id || ids.join()
      const data = {
        businessId: activeState,
        id: idsStr,
        status
      }
      upDownshelf(data).then(res => {
        this.$message.success('操作成功！')
        this.getList()
      }).catch(() => {
        this.$message.error('操作失败！')
      })
    },
    create() {
      this.$router.push({ name: 'CreateLive', query: { type: 'add', businessId: this.activeState }})
    },
    handleSelectionChange(val) {
      this.statistic = [...val]
    },
    getRowKey(row) {
      return row.id
    },
    authorSearch(row) {
      this.$router.push({ name: 'CreateLive', query: { type: 'detail', id: row.id, businessId: this.activeState, liveActivityId: row.liveActivityId }})
    },
    async handleClick(tab, event) {
      this.activeState = tab.name
      const { listQuery } = this
      this.listQuery = {
        ...listQuery,
        page: 1
      }
      await this.getRecommendLive()
      this.getList()
    },
    // 获取推荐直播
    async getRecommendLive() {
      const { activeState } = this
      const data = await getRecommendLive({ businessId: activeState })
      this.liveActivityId = data?.payload?.liveActivityId || ''
    },
    getList() {
      const { listQuery } = this
      const data = {
        page: listQuery.page,
        pageSize: listQuery.limit,
        businessId: Number(this.activeState)
      }
      selectLive(data).then(res => {
        const data = res.payload || {}
        this.list = data.content.map(v => {
          v.isRecommeded = v.liveActivityId === this.liveActivityId
          return v
        }) || []
        this.total = Number(data.totalElements) || 0
      })
    },
    tableAction(action, row) {
      const query = { id: row.id, businessId: this.activeState, liveActivityId: row.liveActivityId }
      const { activeState: businessId, liveActivityId } = this
      switch (action) {
        case 'examine': // 编辑
          this.$router.push({ name: 'CreateLive', query: { ...query, type: 'edit' }})
          break
        case 'shelf': // 上架/下架
          this.shelf(row)
          break
        case 'statistics': // 数据统计
          this.$router.push({ name: 'StatisticsList', query })
          break
        case 'disuse': // 弃用
          this.disuse(row)
          break
        case 'recommed': { // 推荐
          if (liveActivityId) {
            this.$confirm(`已存在推荐直播活动ID：${liveActivityId}，确认将其取消推荐且推荐当前直播吗？`, '提示', { type: 'warning' })
              .then(() => {
                recommendLive({ businessId, activityId: liveActivityId, type: 1 })
                  .then(() => {
                    this.$message.success(`取消推荐直播ID：${liveActivityId}成功`)
                    recommendLive({ businessId, activityId: row.liveActivityId, type: 0 })
                      .then(() => {
                        this.$message.success(`推荐直播活动ID：${row.liveActivityId}成功`)
                        this.liveActivityId = row.liveActivityId
                        this.getList()
                      })
                  })
              })
          } else {
            this.$confirm(`确定推荐直播活动ID：${row.liveActivityId}吗？`, '提示', { type: 'warning' })
              .then(() => {
                recommendLive({ businessId, activityId: row.liveActivityId, type: 0 })
                  .then(() => {
                    this.$message.success(`推荐直播活动ID：${row.liveActivityId}成功`)
                  })
              })
          }
          break
        }
        case 'noRecommed': // 弃用
          this.$confirm(`确定取消推荐直播活动ID：${row.liveActivityId}吗？`, '提示', { type: 'warning' })
            .then(() => {
              recommendLive({ businessId, activityId: row.liveActivityId, type: 1 })
                .then(() => {
                  this.$message.success(`取消推荐直播活动ID：${row.liveActivityId}成功`)
                  this.liveActivityId = ''
                  this.getList()
                })
            })
          break
        default:
          break
      }
    },
    disuse(row) {
      const data = {
        liveActivityId: row.liveActivityId,
        del: 1
      }
      this.$confirm(`是否执行弃用操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delLive(data).then(() => {
          this.$message.success('操作成功')
        }).catch(() => {
          this.$message.error('操作失败')
        })
      })
    }
  }
}
</script>

