<template>
  <div id="classification">
    <!-- 操作 -->
    <el-row :gutter="12" style="margin-bottom: 20px">
      <el-col :span="10" style="display: flex">
        <div class="label">业务线</div>
        <el-select v-model="query.activityBusinessId" placeholder="请选择" @change="getTypeList">
          <el-option
            v-for="item in activityConfig.businessType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button
          :loading="loadings._operation_resource_listAdvertClassification"
          type="primary"
          icon="el-icon-plus"
          @click="createClassification"
        >新增</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <basics-table
      ref="table"
      :table="table"
      :loading="loadings._operation_resource_listAdvertClassification"
      :list="advertTypeList"
      :get-list="getTypeList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
    >
      <template slot="setting" slot-scope="scope">
        <el-button type="text" @click="editClassification(scope.row)">编辑</el-button>
      </template>
    </basics-table>
    <!-- 新增/修改分类管理 -->
    <el-dialog
      v-if="isShowCreateClassification"
      append-to-body
      title="提示"
      :visible.sync="isShowCreateClassification"
      width="500px"
    >
      <basics-form ref="createClassification" :loading="loadings._permissions_api_user_pwd_mod" :forms="forms" :actions="formActions" @submitForm="submitForm" />
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BasicsTable from '@/components/BasicsTable'
import BasicsForm from '@/components/BasicsForm'
import columns from './columns'
import forms, { actions as formActions } from './forms'
import { rActivityList, saveRActivityBusiness, updateRActivityBusiness } from '@/api/operate/activity-api.js'

export default {
  components: { BasicsTable, BasicsForm },
  props: {
    row: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {
      table: { stripe: true },
      isShowCreateClassification: false,
      columns: columns,
      forms: forms,
      formActions: formActions({ close: this.close }),
      options: [],
      query: {
        activityBusinessId: ''
      },
      advertTypeList: [],
      total: 0,
      listQuery: {
        page: 1,
        size: 20
      },
      createClassificationId: null
    }
  },
  computed: {
    ...mapGetters(['loadings', 'activityConfig'])
  },
  methods: {
    // 查询广告分类
    async getTypeList() {
      if (this.query.activityBusinessId) {
        const res = await rActivityList({ ...this.listQuery, activityBusinessId: parseInt(this.query.activityBusinessId) })
        // 复值广告分类列表
        this.advertTypeList = res.payload.content
      }
    },
    // 编辑分类
    editClassification(row) {
      this.isShowCreateClassification = true
      this.createClassificationId = row.id
      const that = this
      this.$nextTick(() => {
        that.$refs.createClassification.recoveryForm({ ...row })
      })
    },
    // 提交表单-新增/修改分类
    async submitForm(val) {
      try {
        if (this.createClassificationId) {
          await updateRActivityBusiness({ typeName: val.typeName, id: this.createClassificationId })
        } else {
          await saveRActivityBusiness(val)
        }
        this.getTypeList()
        this.$message({
          message: this.createClassificationId ? '修改分类成功。' : '新增分类成功。',
          type: 'success'
        })
        this.createClassificationId = null
      } catch (error) {
        this.$message.error('修改分类失败。')
      }
      this.isShowCreateClassification = false
    },
    close() {
      this.createClassificationId = null
      this.isShowCreateClassification = false
    },
    // 创建分类成功
    createClassification() {
      this.isShowCreateClassification = true
    }
  }
}
</script>

<style lang="scss" scoped>
#classification {
  .label {
    line-height: 36px;
    margin-right: 20px;
    margin-left: 20px;
  }
}
</style>
