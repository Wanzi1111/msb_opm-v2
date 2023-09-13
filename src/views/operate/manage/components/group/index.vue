<template>
  <div>
    <h2>进行中</h2>
    <basics-table
      ref="group"
      :key="tableKey"
      :table="table"
      :loading="
        loadings._ass_assemble_wx_assemble_back_getAssembleActive
      "
      :list="listBegin"
      :columns="columns"
      :action-function="actionFunctionBegin"
    />
    <h2>已结束</h2>
    <basics-table
      ref="groupEnd"
      :key="tableKey"
      :table="table"
      :loading="
        loadings._ass_assemble_wx_assemble_back_getAssembleActive
      "
      :list="listEnd"
      :total="total"
      :list-query="listQuery"
      :get-list="listAof"
      :columns="columns"
      :action-function="actionFunctionEnd"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import columns, { actionStart, actionEnd } from './columns/list'

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'Group',
  props: {
    tableKey: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      table: { stripe: true },
      listBegin: [],
      listEnd: [],
      columns: columns({ kind: this.kind }),
      actionFunctionBegin: actionStart({ reset: this.reset, edit: this.edit, reuse: this.reuse }),
      actionFunctionEnd: actionEnd({ detail: this.detail, reuse: this.reuse }),
      kind: 'group', // watch,判断类型,
      total: 0,
      listQuery: { ...init_pagination }
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.listAof()
  },
  methods: {
    listAof() {
      [1, 2].forEach(e => {
        this.getList(e)
      })
    },
    // 获取 列表数据
    getList(type) {
      const { listQuery: { page, limit }} = this
      const pay = [null, 'listBegin', 'listEnd']
      // 获取 列表数据
      this.$api.getAssembleActive({ page: page - 1, pageSize: limit, type }).then(res => {
        if (res?.status === 0) {
          this[pay[type]] = res.data.list
          this.total = res.data.totalCount
        }
      })
    },
    // 新建配置
    create() {
      this.$router.push({ name: 'ManageCreate', query: { kind: this.kind }})
    },
    // 撤销
    reset(dat, row, index) {
      const { id } = row
      this.$api.setActiveDel({ id }).then((res) => {
        if (res.status === 0) {
          this.$message.success('撤销成功')
          this.listAof()
        }
      })
    },
    // 编辑
    edit(dat, row, index) {
      const { id, status } = row
      this.$router.push({ name: 'ManageCreate', query: { title: '修改配置', kind: this.kind, id, status, row: JSON.stringify(row) }})
    },
    // 复用
    reuse(dat, row, index) {
      const { id } = row
      const routeData = this.$router.resolve({
        path: '/activity-center/manage-create',
        query: { kind: this.kind, id, type: 'reuse', row: JSON.stringify(row) }
      })
      window.open(routeData.href, '_blank')
    },
    // 查看详情
    detail(dat, row, index) {
      const { id } = row
      this.$router.push({ name: 'ManageCreate', query: { title: '查看详情', kind: this.kind, id, row: JSON.stringify(row) }})
    },
    // 选项切换 本期支持周周有礼
    handelShb(val) {
      this.tableKey += 1
      this.kind = val
      this.columns = columns({ kind: this.kind })
    }
  }
}
</script>

<style>
</style>
