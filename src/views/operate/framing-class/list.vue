<template>
  <div>
    <div class="title-container">
      <basics-title
        title="框表分类管理"
        line
      />
    </div>
    <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="getList({}, true)">
        <el-tab-pane v-for="i in tabConfig" :key="i.key" :label="i.label" :name="i.key" :disabled="i.disabled" />
      </el-tabs>
      <div style="marginBottom: 10px; textAlign: right">
        <el-button type="primary" plain icon="el-icon-plus" @click="addClassBut">添加分类</el-button>
      </div>
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._operation_frame_listFrameType"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      />
    </div>
    <el-dialog
      :title="addORdify ? '添加' : '修改' + '分类' "
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <basics-form key="0" ref="forms" :loading="loadings._operation_resource_publish" :forms="forms" :actions="actions" @changeForm="changeForm" @submitForm="submitForm" />
    </el-dialog>
  </div>

</template>

<script>
import {
  addFrameType,
  updateFrameType,
  openFrameType,
  forbiddenFrameType,
  listFrameType,
  frameTab
} from '@/api/operate/framing-class'
import columns, { actions } from './columns/list'
import searchs from './searchs/list'
import createForm, { actions as createAct } from './forms/create'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  name: 'Article',
  data() {
    return {
      table: { stripe: true },
      columns: columns(),
      actionFunction: actions({ updateNotice: this.updateNotice, changeNotice: this.changeNotice }),
      searchs: searchs,
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      sequence: {},
      dialogVisible: false,
      forms: createForm,
      actions: createAct({ back: this.back }),
      addORdify: true,
      listRow: {},
      activeName: '101',
      tabConfig: []
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  created() {
    this.getList()
    frameTab().then(res => {
      if (res?.code === 0) {
        this.tabConfig = res?.payload?.businessDto.map(v => {
          if (v.name === '美术宝1V1') this.activeName = String(v.code)
          return {
            label: v.name,
            key: String(v.code)
          }
        })
      }
    })
  },
  methods: {
    changeForm(val, oldVal) {
      // console.log(val, oldVal, 'val========')
    },
    submitForm(val) {
      const { listRow, addORdify } = this
      const data = {
        ...val,
        uid: getToken('userId'),
        id: listRow.id,
        status: this.activeName === '101' ? (addORdify ? 0 : 1) : listRow.status,
        activeName: this.activeName
      }
      if (addORdify) {
        data.id = null
        addFrameType(data).then(res => {
          this.$message.success(res.data || '添加裱框分类成功')
        })
      } else {
        updateFrameType(data).then(res => {
          this.$message.success(res.data || '修改裱框分类成功')
        })
      }
      this.dialogVisible = false
      setTimeout(() => {
        this.$refs.forms.resetFields()
        this.getList()
      }, 200)
    },
    // 添加分类
    addClassBut(val) {
      this.addORdify = true
      this.dialogVisible = true
    },
    // 修改
    updateNotice(dat, row) {
      this.listRow = { ...row }
      this.addORdify = false
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.forms.recoveryForm({
          ...row
        })
      })
    },
    // 启用/禁用切换
    changeNotice(dat, row, index) {
      const data = {
        id: row.id,
        uid: Number(getToken('userId')),
        activeName: this.activeName
      }
      this.$confirm(`请确认，是否${!row.status ? '启用' : '禁用'}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!row.status) {
          openFrameType(data).then(res => {
            this.$message.success(res.data || '启用成功')
          })
        } else {
          forbiddenFrameType(data).then(res => {
            this.$message.success(res.data || '禁用成功')
          })
        }
        setTimeout(() => {
          this.getList()
        }, 200)
      })
    },
    // 获取列表
    getList(_, isChange) {
      const listQuery = isChange ? {
        page: 1,
        limit: 10
      } : this.listQuery
      if (isChange) {
        this.listQuery = listQuery
      }
      const data = {
        uid: Number(getToken('userId')),
        pageNum: listQuery.page,
        pageSize: listQuery.limit,
        activeName: this.activeName
      }
      listFrameType(data).then(res => {
        this.list = this.activeName === '101' ? [...res.data.list] : [...res.payload.data]
        this.total = this.activeName === '101' ? res.data.total : ~~res.payload.total || 0
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.$refs.forms.resetFields()
        })
        .catch(_ => {})
    },
    // 关闭弹窗
    back() {
      this.dialogVisible = false
      this.$refs.forms.resetFields()
    }
  }
}
</script>
