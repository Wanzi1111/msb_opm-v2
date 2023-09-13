<template>
  <div>
    <!-- 筛选框 -->
    <basics-search
      ref="searchs"
      :searchs="searchs"
      :loading="loadings._k8s_api_recommend_api_v1_referral_queryList"
      @submitSearch="onSearchSubmit"
    />
    <!-- 二级tab -->
    <el-tabs v-model="query.status" class="pagination-container" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in screenshotApprovalStatistic"
        :key="index"
        :name="item.value"
      >
        <span slot="label">{{ item.label }}
          <!-- <span :style="{ color: item.type }">
            <el-badge
              :type="item.type"
              :value="item.videoCount"
              class="item"
            />
          </span> -->
        </span>
      </el-tab-pane>
    </el-tabs>
    <!-- 操作 -->
    <basics-action v-if="showAction" :actions="act" class="pagination-container" />
    <!-- 表格 -->
    <basics-table
      ref="table"
      :attr="attr"
      :loading="loadings._k8s_api_recommend_api_v1_referral_queryList"
      :columns="columns"
      :list="list"
      :get-list="pageGetList"
      :total="total"
      :list-query="listQuery"
      :action-function="actions"
      @selection-change="handleSelectionChange"
    />
    <div class="paginationStyle">
      <el-pagination
        background
        layout="prev, next"
        @prev-click="prevPage"
        @next-click="nextPage"
      />
      <el-link type="primary" :underline="false" @click="searchTotal">点击查询数量：<i class="el-icon--right" /> </el-link>
      <div class="totalStyle">
        {{ totalNum }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchsConfig from './searchs'
import ActConfig from './actions'
import ColumnsConfig, { tableAction } from './columns'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'
import BasicsAction from '@/components/BasicsAction'
import _ from 'lodash'
import {
  batchScreenshotApproval,
  getScreenshotApprovalList,
  getQuerySize
} from '@/api/operate/screenshot-approval'
import Cookies from 'js-cookie'

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'ScreenshotApproval',
  components: { BasicsSearch, BasicsTable, BasicsAction },
  props: {
    activityRewardType: {
      default: () => [],
      type: Array
    },
    activityType: {
      default: () => [],
      type: Array
    },
    turndownMsgType: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      showAction: true,
      attr: {},
      searchs: SearchsConfig,
      columns: ColumnsConfig,
      actions: tableAction({ handleTableAction: this.handleTableAction }),
      act: ActConfig({ success: this.success, reject: this.reject }),
      activeState: 0,
      total: 0,
      totalNum: 0,
      listQuery: { ...init_pagination },
      list: [],
      selectRow: [],
      // 查询条件
      query: {
        status: '1'
      },
      screenshotApprovalStatistic: [
        {
          label: '全部',
          type: 'info',
          value: '-1',
          videoCount: 0
        },
        {
          label: '审核成功',
          type: 'success',
          value: '2',
          videoCount: 0
        },
        {
          label: '审核驳回',
          type: 'warning',
          value: '3',
          videoCount: 0
        },
        {
          label: '审核异常',
          type: 'warning',
          value: '1',
          videoCount: 0
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['loadings', 'baseData']),
    // 列表请求和列表总数参数
    queryData() {
      const data = { ...JSON.parse(JSON.stringify(this.query)), ...this.listQuery }
      // 处理查询条件
      data.beginTime = data.task_time && data.task_time.length ? new Date(data.task_time[0]).getTime() / 1000 : ''
      data.endTime = data.task_time && data.task_time.length ? new Date(data.task_time[1]).getTime() / 1000 : ''
      data.beginTime = parseInt(data.beginTime)
      data.endTime = parseInt(data.endTime)
      data.pageSize = data.limit
      delete data.task_time
      delete data.limit
      data.status = data.status === '-1' ? null : parseInt(data.status)
      data.activityRewardType = data.activityRewardType ? data.activityRewardType : null
      data.activityRewardType = data.activityRewardType ? data.activityRewardType : null
      data.uid = data.uid ? parseInt(data.uid) : null
      data.turndownMsgType = data.turndownMsgType || data.turndownMsgType === 0 ? data.turndownMsgType : null
      // data.activityType = data.activityType ? data.activityType : null
      return data
    }
  },
  async mounted() {
    // 进入页面加载列表
    this.getList()
  },
  methods: {
    // 分页查询列表
    pageGetList() {
      this.getList()
    },
    // 获取列表
    async getList() {
      const res = await getScreenshotApprovalList(this.queryData)
      this.list = res.payload.results
      // this.total = res.payload.totalSize || 0
      // const { exection, fail, success, total } = res.payload.countsMap
      // this.screenshotApprovalStatistic[0].videoCount = total
      // this.screenshotApprovalStatistic[1].videoCount = success
      // this.screenshotApprovalStatistic[2].videoCount = this.query.status === '3' ? res.payload.totalSize : fail
      // this.screenshotApprovalStatistic[3].videoCount = exection
    },
    // 查询
    onSearchSubmit(val) {
      this.query = { ...val, status: this.query.status, ...this.listQuery }
      this.getList()
    },
    // 批量审核通过
    success() {
      // 判断有没有选择数据
      if (!this.selectRow.length) {
        this.$message.warning('请先选择数据！')
        return
      }
      // 二次确认
      this.$confirm('请确认，是否审核通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 参数
        const data = {
          ids: this.selectRow.map(item => item.screenshotId).toString(),
          type: 'SUCCESS_CHECK',
          cid: Cookies.get('userId')
        }
        // 通过/驳回
        await batchScreenshotApproval(data)
        this.getList()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    // 批量审核驳回
    reject() {
      // 判断有没有选择数据
      if (!this.selectRow.length) {
        this.$message.warning('请先选择数据！')
        return
      }
      // 二次确认
      this.$confirm('请确认，是否审核驳回?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 参数
        const data = {
          ids: this.selectRow.map(item => item.screenshotId).toString(),
          type: 'FAIL_CHECK',
          cid: Cookies.get('userId')
        }
        // 通过/驳回
        await batchScreenshotApproval(data)
        this.getList()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    // 行内通过/驳回
    handleTableAction(type, row) {
      switch (type) {
        case 'adopt': {
          this.$confirm('确定审核通过吗？', '审核', { type: 'warning' }).then(async () => {
            // 参数
            const data = {
              ids: row.screenshotId,
              type: 'SUCCESS_CHECK',
              cid: Cookies.get('userId')
            }
            // 通过/驳回
            await batchScreenshotApproval(data)
            this.getList()
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
          break
        }
        case 'reject': {
          this.$confirm('确定审核驳回吗？', '审核', { type: 'warning' }).then(async () => {
            // 参数
            const data = {
              ids: row.screenshotId,
              type: 'FAIL_CHECK',
              cid: Cookies.get('userId')
            }
            // 通过/驳回
            await batchScreenshotApproval(data)
            this.getList()
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
          break
        }
      }
    },
    // 负值选择的数组
    handleSelectionChange(row) {
      this.selectRow = row
    },
    // 活动状态切换
    handleClick() {
      this.showAction = false
      this.listQuery.page = 1
      if (this.query.status === 3 || this.query.status === 1) {
        this.act = ActConfig({ success: this.success })
      }
      if (this.query.status === 2) {
        this.act = ActConfig({})
      }
      if (this.query.status === -1) {
        this.act = ActConfig({ success: this.success, reject: this.reject })
      }
      this.$nextTick(() => {
        this.showAction = true
        this.totalNum = 0
      })
      this.pageGetList()
    },
    // 点击上一页
    prevPage: _.debounce(function() {
      if (this.listQuery.page !== 1) {
        this.listQuery.page -= 1
        this.pageGetList()
      }
    }, 500),
    // 点击下一页
    nextPage: _.debounce(function() {
      if (this.list.length >= 20) {
        this.listQuery.page += 1
        this.pageGetList()
      } else {
        this.$message({
          message: '暂无信息',
          type: 'error'
        })
      }
    }, 500),
    // 点击查询总数量
    async searchTotal() {
      const res = await getQuerySize(this.queryData)
      const { code, payload } = res
      if (code === 0) {
        this.totalNum = payload
      } else {
        this.$message({
          message: '查询失败',
          type: 'error'
        })
        this.totalNum = 0
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.paginationStyle{
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
.totalStyle{
  display: flex;
  align-items: center;
  padding: 0px 15px;
  background-color: #f4f4f5;
  color: #606266;
  border-radius: 2px;
}
</style>
