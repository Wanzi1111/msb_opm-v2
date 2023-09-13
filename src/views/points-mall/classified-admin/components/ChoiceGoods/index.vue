<template>
  <div>
    <basics-search :loading="loadings._ums_meixiu_api_im_g_v1_admin_category_getCategoryRelationPage" :searchs="searchs" @changeSearch="changeSearch" @submitSearch="submitSearch" />
    <basics-action :actions="act" />
    <basics-table
      ref="table"
      :attr="attr"
      :loading="loadings._ums_meixiu_api_im_g_v1_admin_category_getCategoryRelationPage"
      :columns="columns"
      :list="list"
      :get-list="getList"
      :total="total"
      :list-query="listQuery"
      :action-function="columnsAct"
      @selection-change="handleSelectionChange"
    >
      <template slot="imGoodsPaymentList" slot-scope="scope">
        <div v-if="scope.row.imGoodsPaymentList && scope.row.imGoodsPaymentList.length !== 0">
          <div v-for="(val,index) in scope.row.imGoodsPaymentList" :key="index">
            <div v-if="val.paymentType === 'CLASS' && val.exhibitionStatus === 'SHOW'">
              <el-tag type="success">{{ val.oneClassExchangePrice }}(1v1课时)</el-tag>
              <el-tag type="success">{{ val.smallClassExchangePrice }}(小班课课时)</el-tag>
            </div>
            <div v-if="val.paymentType === 'COINANDCASH' && val.exhibitionStatus === 'SHOW'">
              <el-tag type="success">{{ `${val.coinPrice || 0}金币 ￥${val.cashPrice || 0}` }}</el-tag>
            </div>
            <div v-if="val.paymentType === 'COIN' && val.exhibitionStatus === 'SHOW'">
              <el-tag type="success">{{ val.coinPrice || 0 }}金币</el-tag>
            </div>
            <div v-if="val.paymentType === 'CASH' && val.exhibitionStatus === 'SHOW'">
              <el-tag type="success">￥{{ val.cashPrice || 0 }}</el-tag>
            </div>
          </div>
        </div>
        <el-tag v-else type="success">0</el-tag>
      </template>
    </basics-table>
    <el-dialog
      :title="classTitle"
      :visible.sync="classVisible"
      :before-close="() => close()"
      append-to-body
    >
      <basics-form
        :key="classVisible"
        ref="classForm"
        :actions="formsAct"
        :loading="loadings._operation_web_version_client_putClientVersion"
        :forms="forms"
        @submitForm="submitForm"
      />
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryRelationPage, getCategorysMapBusiness, updateCategoryId, updateBatchCategoryId } from '@/api/points-mall/mall-admin'
import searchs from './searchs/list'
import { default as act } from './columns/action'
import columns, { actions as columnsAct } from './columns/list'
import forms, { actions as formsAct } from './form/index'
import { mapGetters } from 'vuex'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'

export default {
  name: 'ChoiceGoods',
  components: { BasicsSearch, BasicsTable },
  props: {
    categoryId: {
      default() {
        return '0'
      },
      type: String
    },
    businessType: {
      default() {
        return 'ONETOONE'
      },
      type: String
    }
  },
  data() {
    return {
      searchs: searchs,
      attr: { stripe: true },
      columnsAct: columnsAct({ editGoods: this.editGoods }),
      formsAct: formsAct({ close: this.close }),
      total: 0,
      loading: false,
      list: [],
      query: {},
      listQuery: {
        page: 1,
        limit: 10
      },
      act: act({ editMultipleGoods: this.editMultipleGoods, refreshGoods: this.refreshGoods }),
      forms,
      id: '',
      classVisible: false,
      classTitle: '编辑分类',
      columns,
      ids: ''
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    businessTypeList() {
      const list = this.$store.getters.mallConfig.businessType.map(e => {
        return {
          value: e.businessType,
          label: e.name
        }
      })
      return list
    }
  },
  watch: {
    type() {
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSelectionChange(val) {
      const idArr = val.map((res) => {
        return res.id
      })
      this.ids = idArr.join()
    },

    editGoods(row) {
      this.id = row.id
      this.ids = ''
      this.classVisible = true
      this.classTitle = '修改分类'
      this.getCategorysMapBusiness()
    },
    editMultipleGoods(row) {
      this.id = ''
      if (!this.ids) return this.$message.error('至少勾选一个商品')
      this.classVisible = true
      this.classTitle = '批量修改分类'
      this.getCategorysMapBusiness()
    },
    changeSearch(query) {
      this.query = query
    },
    submitSearch(val) {
      this.listQuery = {
        page: 1,
        limit: 10
      }
      this.query = val
      this.getList()
    },

    async getList() {
      const { categoryId } = this
      const { page, limit: pageSize } = this.listQuery
      const data = {
        categoryId,
        page,
        pageSize,
        ...this.query
      }
      getCategoryRelationPage(data).then(res => {
        const { content, totalElements } = res.payload
        this.list = content
        this.total = +totalElements
      })
    },

    getCategorysMapBusiness() {
      const { businessTypeList, businessType } = this
      getCategorysMapBusiness().then(res => {
        const businessList = res.payload
        this.$nextTick(() => {
          this.$refs.classForm.set({
            type: 'options',
            data: { targetCategoryId: businessList[businessType], businessType: businessTypeList }
          })
          this.$refs.classForm.set({
            type: 'defaultVal',
            data: { businessType }
          })
        })
      })
    },

    // 刷新列表
    refreshGoods() {
      this.getList()
    },

    submitForm(val) {
      const { targetCategoryId: [, tId] } = val
      if (this.ids) {
        updateBatchCategoryId({ categoryRelationIds: this.ids, targetCategoryId: tId }).then((res) => {
          this.$message.success('批量修改成功')
          setTimeout(() => {
            this.$message.success(res.payload)
          }, 800)
        })
      }
      if (this.id) {
        updateCategoryId({ categoryRelationId: this.id, targetCategoryId: tId }).then((res) => {
          this.$message.success('修改成功')
        })
      }
      this.classVisible = false
      this.getList()
    },

    close() {
      this.classVisible = false
    }
  }
}
</script>
