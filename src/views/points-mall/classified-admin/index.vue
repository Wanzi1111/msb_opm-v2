<template>
  <div>
    <div class="title-container">
      <basics-title title="分类管理" line />
    </div>
    <div class="app-container">
      <el-tabs v-model="activeState">
        <el-tab-pane v-for="(item, index) in newStateList" :key="index" :label="item.name" />
      </el-tabs>
      <basics-action :actions="act" />
      <basics-table
        ref="table"
        :attr="attr"
        :table="table"
        :loading="loadings['_ums_meixiu_api_im_g_v1_admin_category_getCategorysMapBusiness']"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :list-query="listQuery"
        :action-function="actionFunction"
      />
      <el-dialog
        :title="classTitle"
        :visible.sync="dialogVisible"
        width="480px"
      >
        <basics-form :key="dialogVisible" ref="classified" :actions="formActions" :loading="loadings._operation_web_version_client_putClientVersion" :forms="forms" @submitForm="submitForm" />
      </el-dialog>
      <el-dialog
        title="商品排序"
        :visible.sync="sortVisible"
        width="80%"
      >
        <basics-table
          ref="sortTable"
          :table="sortTable"
          :loading="loadings['_ums_meixiu_api_im_g_v1_admin_goods_getGoodsPageOfCategory']"
          :list="sortList"
          :get-list="getSortList"
          :columns="sortColumns"
          :total="total"
          :list-query="listQuery"
          :action-function="sortActions"
        >
          <template slot="goodslotname" slot-scope="scope">
            <div style="display:flex;">
              <div>
                {{ scope.row.type === 'CARD_CODE'?'[虚拟]': scope.row.type === 'CLASS'?'[课时]':'[实物]' }}
                {{ scope.row.epcReferName }}
                <div v-show="scope.row.goodsCouponStatus==='UNABLE'" style="color:red;">已停用</div>
              </div>
            </div>
          </template>
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
      </el-dialog>
      <el-dialog
        title="选择商品"
        :visible.sync="goodsVisible"
        width="80%"
        :before-close="() => closeDl()"
      >
        <choice-goods v-if="goodsVisible" ref="choice" :business-type="businessType" :category-id="categoryId" @closeDl="closeDl" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import columns, { actions } from './columns/list'
import sortColumns, { actions as sortActions } from './columns/sortList'
import { default as act } from './actions/list'
import { getCategorysMapBusiness, categoryEdit, delCategory, updateSortOfMove, categorySort } from '@/api/points-mall/mall-admin'
import forms, { actions as formAct } from './forms/create'
import ChoiceGoods from './components/ChoiceGoods/index'

export default {
  name: 'ClassifiedAdmin',
  components: { ChoiceGoods },
  data() {
    return {
      attr: {
        treeProps: {
          children: 'childs'
        }
      },
      activeState: '0',
      table: { stripe: true },
      sortTable: { stripe: true },
      dialogVisible: false,
      sortVisible: false,
      list: [],
      listData: [],
      forms: forms,
      total: 0,
      id: null,
      categoryId: '',
      pid: '',
      formActions: formAct({ close: this.close }),
      act: act({ newClassified: this.newClassified }),
      columns: columns(),
      sortColumns: null,
      actionFunction: actions({ deleteGood: this.deleteGood, editClassified: this.editClassified, dragup: this.dragup, dragdown: this.dragdown, sortClassified: this.sortClassified, add: this.addClassified, goods: this.openDl }),
      sortActions: sortActions(),
      listQuery: {
        page: 1,
        limit: 10
      },
      sortList: [],
      classTitle: '新增分类',
      goodsVisible: false,
      form: {},
      businessType: ''
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    newStateList() {
      return this.$store.getters.mallConfig.businessType
    }
  },
  watch: {
    activeState(val) {
      this.list = this.listData[this.newStateList[val].businessType]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    sortClassified(dat, row) {
      this.sortVisible = true
      this.categoryId = row.id
      this.pid = +row.parentId
      this.listQuery = {
        page: 1,
        limit: 10
      }
      this.getSortList()
      this.$nextTick(() => {
        this.sortColumns = sortColumns({ getSortList: this.getSortList, parentId: row.parentId })
      })
    },
    cancelRequest() {
      if (typeof window.source === 'function') {
        window.source('请求取消')
      }
    },
    getSortList() {
      categorySort({
        page: this.listQuery.page,
        pageSize: this.listQuery.limit,
        ...this.query,
        businessType: this.newStateList[this.activeState].businessType,
        // 判断当前是否为1级分类ID 是则使用 categoryPid参数去传 否则使用 categoryId
        [!this.pid ? 'categoryPid' : 'categoryId']: this.categoryId
      }).then(res => {
        if (res.code === 0) {
          const data = res.payload
          this.total = +data.totalElements
          this.sortList = data.content
        }
      })
    },
    getList() {
      this.cancelRequest()
      const businessType = this.newStateList[this.activeState].businessType
      getCategorysMapBusiness().then((res) => {
        const { code, payload } = res
        this.listData = !code ? payload : []
        this.list = payload[businessType]
      })
    },
    dragdown(hat, row) {
      const { businessType, id } = row
      this.updateSortOfMove({ categoryId: id, businessType, method: 'DOWN' })
    },
    dragup(hat, row) {
      const { businessType, id } = row
      this.updateSortOfMove({ categoryId: id, businessType, method: 'UP' })
    },
    updateSortOfMove(data) {
      updateSortOfMove({ ...data }).then(() => {
        this.getList()
      })
    },
    submitForm(query) {
      const { activeState, id, parentId } = this
      const businessType = this.newStateList[activeState].businessType
      let obj = {}
      obj = { id: id, categoryName: query.categoryName, businessType, parentId }
      categoryEdit(obj).then(res => {
        this.getList()
      })
      this.close()
    },
    newClassified() {
      this.classTitle = '新增一级分类'
      this.dialogVisible = true
    },
    addClassified(dat, row) {
      this.dialogVisible = true
      this.parentId = row.id
      this.classTitle = '新增二级分类'
    },
    editClassified(dat, row) {
      this.dialogVisible = true
      this.id = row.id
      this.parentId = row.parentId
      this.classTitle = !+row.parentId ? '编辑一级分类' : '编辑二级分类'
      this.$nextTick(() => {
        this.$refs.classified.form.categoryName = row.categoryName
      })
    },
    close() {
      this.dialogVisible = false
      this.id = null
      this.parentId = null
    },
    openDl(_, row) {
      this.categoryId = row.id
      this.businessType = row.businessType
      this.goodsVisible = true
    },
    closeDl() {
      this.goodsVisible = false
      this.listQuery = {
        page: 1,
        limit: 10
      }
    },
    deleteGood(dat, row) {
      const txt = '分类删除后，不可恢复'
      const tip = '确定要删除这个分类吗？'
      this.$confirm(txt, tip, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCategory({ id: row.id }).then(res => {
          this.$message.success('商品删除成功')
          this.getList()
        })
      })
    }
  }
}
</script>

<style></style>
