<template>
  <div class="app-container">
    <!-- 筛选框 -->
    <basics-search
      ref="searchs"
      :searchs="searchs"
      :loading="loadings._ai_api_api_b_v1_backend_userflow_sharereward_pageList"
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
          <span :style="{ color: item.type }">
            <el-badge
              :type="item.type"
              :value="item.videoCount"
              class="item"
            />
          </span>
        </span>
      </el-tab-pane>
    </el-tabs>
    <!-- 操作 -->
    <basics-action v-if="showAction" :actions="act" class="pagination-container" />
    <!-- 表格 -->
    <basics-table
      ref="table"
      :attr="attr"
      :loading="loadings._ai_api_api_b_v1_backend_userflow_sharereward_pageList"
      :columns="columns"
      :list="list"
      :get-list="pageGetList"
      :total="total"
      :list-query="listQuery"
      :action-function="actions"
      @selection-change="handleSelectionChange"
    />
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
import {
  // 小熊美术
  // artsGetScreenshotApprovalStatistics,
  artsGetScreenshotApprovalList,
  artsScreenshotApproval,
  artsBatchScreenshotApproval
} from '@/api/operate/screenshot-approval'
import { getToken } from '@/utils/auth'
import moment from 'moment'

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
      showAction: false,
      attr: {},
      searchs: SearchsConfig,
      columns: ColumnsConfig,
      actions: tableAction({ handleTableAction: this.handleTableAction }),
      act: ActConfig({ success: this.success, reject: this.reject }),
      activeState: 0,
      total: 0,
      listQuery: { ...init_pagination },
      list: [],
      selectRow: [],
      // 查询条件
      query: {
        status: '-1'
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
          value: 'COMPLETED',
          videoCount: 0
        },
        {
          label: '审核驳回',
          type: 'warning',
          value: 'DECLINE',
          videoCount: 0
        },
        {
          label: '审核异常',
          type: 'warning',
          value: 'AIAUDITFAIL',
          videoCount: 0
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['loadings', 'baseData'])
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
      const data = { ...JSON.parse(JSON.stringify(this.query)), ...this.listQuery }
      // 处理查询条件
      data.sctime = data.task_time && data.task_time.length ? new Date(data.task_time[0]).getTime() : moment().startOf('month').valueOf()
      data.ectime = data.task_time && data.task_time.length ? new Date(data.task_time[1]).getTime() : moment().endOf('month').valueOf()
      data.pageSize = data.limit
      data.pageNum = data.page
      delete data.page
      delete data.task_time
      delete data.limit
      data.status = data.status === '-1' ? null : data.status
      data.activityRewardType = data.activityRewardType ? data.activityRewardType : null
      data.activityRewardType = data.activityRewardType ? data.activityRewardType : null
      data.uid = data.uid ? parseInt(data.uid) : null
      data.turndownMsgType = data.turndownMsgType ? data.turndownMsgType : null
      data.activityType = data.activityType ? data.activityType : null
      console.log(data, '查询条件')
      const res = await artsGetScreenshotApprovalList(data)
      // 统计的数量
      // const statistics = await artsGetScreenshotApprovalStatistics(data)
      // const { exception, reject, complete, all } = statistics.payload
      // this.screenshotApprovalStatistic[0].videoCount = all
      // this.screenshotApprovalStatistic[1].videoCount = complete
      // this.screenshotApprovalStatistic[2].videoCount = reject
      // this.screenshotApprovalStatistic[3].videoCount = exception
      this.list = res.payload.content
      this.total = parseInt(res.payload.totalElements) || 0
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
          id: this.selectRow.map(item => item.id).toString(),
          isAgree: true,
          remark: '恭喜您上传的朋友圈截图已通过审核，任务所得小熊币已到账~ 去小熊币商城兑换喜欢的商品吧！',
          approvalName: getToken('cname')
        }
        // 通过/驳回
        await artsBatchScreenshotApproval(data)
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
          id: this.selectRow.map(item => item.id).toString(),
          isAgree: false,
          remark: '您提交的朋友圈截图未通过审核T-T，点击重新上传',
          approvalName: getToken('cname')
        }
        // 通过/驳回
        await artsBatchScreenshotApproval(data)
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
              id: row.id,
              isAgree: true,
              remark: '恭喜您上传的朋友圈截图已通过审核，任务所得小熊币已到账~ 去小熊币商城兑换喜欢的商品吧！',
              approvalName: getToken('cname')
            }
            // 通过/驳回
            await artsScreenshotApproval(data)
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
              id: row.id,
              isAgree: false,
              remark: '您提交的朋友圈截图未通过审核T-T，点击重新上传',
              approvalName: getToken('cname')
            }
            // 通过/驳回
            await artsScreenshotApproval(data)
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
      if (this.query.status === 'DECLINE' || this.query.status === 'AIAUDITFAIL') {
        this.act = ActConfig({ success: this.success })
      }
      if (this.query.status === 'COMPLETED') {
        this.act = ActConfig({})
      }
      if (this.query.status === -1) {
        this.act = ActConfig({ success: this.success, reject: this.reject })
      }
      this.$nextTick(() => {
        this.showAction = true
      })
      this.getList()
    }
  }
}

</script>
