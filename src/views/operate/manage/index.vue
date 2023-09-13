<template>
  <div>
    <div class="title-container">
      <basics-title title="转介绍活动管理" line />
    </div>
    <div class="app-container">

      <el-tabs v-model="line">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.value"
        />
      </el-tabs>
      <el-radio-group v-model="kind" @change="handelShb">
        <el-radio-button
          v-for="(value, key, index) in types"
          :key="index"
          :label="key"
          border
          :disabled="key === 'listen'"
        >{{ value }}</el-radio-button>
      </el-radio-group>

      <basics-action :actions="act" />

      <group v-if="kind === 'group'" :table-key="tableKey" />
      <zero-team v-else-if="kind === 'team'" :line="line" />
      <template v-else>
        <h3>进行中</h3>
        <basics-table
          ref="tableBegin"
          :key="tableKey"
          :table="table"
          :loading="loadings._k8s_api_recommend_api_v1_admin_getConfigTaskList"
          :list="listBegin"
          :columns="columns"
          :action-function="actionFunctionBegin"
        >
          <template slot="status" slot-scope="{ row }">
            <el-tag v-if="row.status === 0" type="primary">未开始</el-tag>
            <el-tag v-else-if="row.status === 1" type="success">生效中</el-tag>
            <el-tag v-else-if="row.status === 2" type="info">已结束</el-tag>
            <el-tag v-else-if="row.status === 3" type="warning">已撤销</el-tag>
          </template>
        </basics-table>
        <h3>已结束</h3>
        <basics-table
          ref="tableEnd"
          :key="tableKey"
          :table="table"
          :loading="loadings._k8s_api_recommend_api_v1_admin_getConfigTaskList"
          :list="listEnd"
          :total="total"
          :list-query="listQuery"
          :get-list="getList"
          :columns="columns"
          :action-function="actionFunctionEnd"
        >
          <template slot="status" slot-scope="{ row }">
            <el-tag v-if="row.status === 0" type="primary">未开始</el-tag>
            <el-tag v-else-if="row.status === 1" type="success">进行中</el-tag>
            <el-tag v-else-if="row.status === 2" type="info">已结束</el-tag>
            <el-tag v-else-if="row.status === 3" type="warning">已撤销</el-tag>
          </template>
        </basics-table>
      </template>
    </div>
  </div>
</template>

<script>
import { getConfigTaskList } from '@/api/operate/manage'
import { mapGetters } from 'vuex'
import { default as act } from './actions/list'
import columns, { actionStart, actionEnd } from './columns/list'
import { deleteWeeklyCoinConfig } from '@/api/operate/manage'
import Group from './components/group/index.vue'

const init_pagination = {
  page: 1,
  limit: 20
}
const kindType = {
  week: 'AWARD_COIN', // 周周有礼的type
  course: 'RECOMMEND' // 赠课活动
}

export const lineList = [{ value: '1', label: '美术宝1对1' }, { value: '2', label: '小熊艺术' }]

import ZeroTeam from './components/zeroTeam'

export default {
  name: 'ActivityManage',
  components: { Group, ZeroTeam },
  data() {
    return {
      line: '1',
      tabList: lineList,
      types: { 'week': '周周有礼', 'group': '拼团活动', 'listen': '试听活动', 'course': '赠课活动', 'team': '0元组队' },
      kind: 'week',
      table: { stripe: true },
      act: act({ create: this.create, type: 'week' }),
      listBegin: [],
      listEnd: [],
      columns: columns({ kind: 'week' }),
      actionFunctionBegin: actionStart({ reset: this.reset, edit: this.edit, reuse: this.reuse }),
      actionFunctionEnd: actionEnd({ detail: this.detail, reuse: this.reuse }),
      total: 0,
      listQuery: { ...init_pagination },
      tableKey: 0
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    kind(newVal) {
      if (this.line === '1') {
        if (!['group', 'team'].includes(newVal)) this.getList()
      }
    },
    line(newVal) {
      if (newVal === '1') {
        this.kind = 'week'
        this.types = { 'week': '周周有礼', 'group': '拼团活动', 'listen': '试听活动', 'course': '赠课活动', 'team': '0元组队' }
      } else {
        this.kind = 'team'
        this.types = { 'team': '0元组队' }
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取 列表数据
    getList() {
      const { listQuery: { page, limit }} = this
      const payload = { // 需根据tab 页来选择，本期暂支持周周有礼
        type: kindType[this.kind]
      }
      // 获取 列表数据
      getConfigTaskList({ page: page - 1, size: limit, ...payload })
        .then(res => {
          this.listBegin = res.payload.being
          this.listEnd = res.payload.ending
          this.total = res.payload.count
        })
        .catch(() => {
          this.listBegin = []
          this.listEnd = []
          this.total = 0
        })
    },
    // 新建配置
    create(type) {
      if (this.kind === 'team') {
        this.$router.push({ name: 'ManageCreateZeroTeam', query: { line: this.line }})
      } else {
        this.$router.push({ name: 'ManageCreate', query: { kind: this.kind }})
      }
    },
    // 撤销
    reset(dat, row, index) {
      const { id } = row
      deleteWeeklyCoinConfig({ taskListId: Number(id), del: 1 }).then((res) => {
        if (res.code === 0) {
          this.$message.success('撤销成功')
          this.getList()
        }
      })
    },
    // 编辑
    edit(dat, row, index) {
      const { id, status } = row
      this.$router.push({ path: '/activity-center/manage-create', query: { title: '修改配置', kind: this.kind, id, status }})
    },
    // 复用
    reuse(dat, row, index) {
      const { id } = row
      const routeData = this.$router.resolve({
        path: '/activity-center/manage-create',
        query: { kind: this.kind, id, type: 'reuse' }
      })
      window.open(routeData.href, '_blank')
    },
    // 查看详情
    detail(dat, row, index) {
      const { id } = row
      this.$router.push({ path: '/activity-center/manage-create', query: { title: '查看详情', kind: this.kind, id }})
    },
    // 选项切换 本期支持周周有礼
    handelShb() {
      this.tableKey += 1
      this.columns = columns({ kind: this.kind })
    }
  }
}
</script>

<style></style>
