<template>
  <div id="classification">
    <!-- 操作 -->
    <el-row :gutter="12" style="margin-bottom: 20px;margin-top: 20px">
      <el-col :span="10" style="display: flex">
        <div class="label">业务线</div>
        <el-select v-model="query.businessType" placeholder="请选择" @change="getAdvertType">
          <el-option
            v-for="item in adConfig.businessType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="10" style="display: flex">
        <div class="label">客户端</div>
        <el-select v-model="query.clientType" placeholder="请选择" @change="getAdvertType">
          <el-option
            v-for="item in radioOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button
          :loading="loadings._ums_meixiu_api_a_ad_resource_listAdvertClassification"
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
      :loading="loadings._ums_meixiu_api_a_ad_resource_listAdvertClassification"
      :list="advertTypeList"
      :get-list="getAdvertType"
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
      <basics-form ref="createClassification" :loading="loadings._permissions_api_user_pwd_mod" :forms="forms" :actions="formActions" @submitForm="submitForm" @changeForm="changeClass" />
    </el-dialog>
  </div>
</template>
<script>
import {
  getAdvertType,
  addAdvertType,
  updateAdvertType
} from '@/api/ad-center/ad-position'
import { mapGetters } from 'vuex'
import BasicsTable from '@/components/BasicsTable'
import BasicsForm from '@/components/BasicsForm'
import columns from './columns'
import forms, { actions as formActions } from './forms'

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
        businessType: '',
        clientType: ''
      },
      advertTypeList: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      createClassificationId: null
    }
  },
  computed: {
    ...mapGetters(['loadings', 'adConfig']),
    // 根据业务线返回客户端
    radioOptions() {
      const arr = this.query.businessType ? this.adConfig.clientType[this.query.businessType].map(item => { return { label: item, value: item } }) : []
      return arr
    }
  },
  created() {
    this.getAdvertType()
  },
  methods: {
    changeClass(val, oldVal) {
      if (val.businessType !== oldVal.businessType) {
        const arr = val.businessType ? this.adConfig.clientType[val.businessType].map(item => { return { label: item, value: item } }) : []
        this.$refs.createClassification.set({
          type: 'options',
          data: { clientType: arr }
        })
      }
    },
    // 查询广告分类
    async getAdvertType() {
      // let data = !this.query.businessType && !this.query.clientType ? {} : {...this.query}
      const res = await getAdvertType({ ...this.query })
      // 复值广告分类列表
      this.advertTypeList = res.data
    },
    // 编辑分类
    editClassification(row) {
      this.isShowCreateClassification = true
      this.createClassificationId = row.id
      const that = this
      this.$nextTick(() => {
        that.$refs.createClassification.recoveryForm({ ...row, businessType: row.bussinessName })
      })
    },
    // 提交表单-新增/修改分类
    async submitForm(val) {
      try {
        if (this.createClassificationId) {
          await updateAdvertType({ ...val, id: this.createClassificationId })
        } else {
          await addAdvertType(val)
        }
        this.getAdvertType()
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
