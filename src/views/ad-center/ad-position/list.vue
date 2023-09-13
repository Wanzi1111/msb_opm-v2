<template>
  <div class="app-container ad-position-new">
    <!-- <tab-client @handleTabClick="handleTabClick" /> -->
    <el-tabs v-model="currTab.businessType" @tab-click="handleTabClick">
      <el-tab-pane v-for="(item, index) in adConfig.businessType" :key="index" :label="item.label" :name="item.value" />
    </el-tabs>
    <basics-search
      ref="searchs"
      :searchs="searchs"
      :loading="loadings._ums_meixiu_api_a_ad_resource_listAdvertV2"
      @submitSearch="submitSearch"
    />
    <basics-action :actions="act" :radio="currTab.clientType">
      <template slot="radio">
        <el-radio-group v-model="currTab.clientType" @change="clientTypeChange">
          <el-radio-button v-for="radio in radioOptions" :key="radio" :label="radio">{{ radio }}</el-radio-button>
        </el-radio-group>
      </template>
    </basics-action>
    <basics-table
      ref="table"
      :table="table"
      :loading="loadings._ums_meixiu_api_a_ad_resource_listAdvertV2"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :action-function="actionFunction"
      :list-query="listQuery"
    >
      <template slot="setting" slot-scope="scope">
        <el-popover trigger="click" placement="bottom-start">
          <div slot="reference" class="slot-setting">
            <div class="el-icon-s-tools">设置</div>
          </div>
          <div
            :style="{marginBottom: '10px'}"
            @click="toAddAd('', 2, scope.row)"
          >编辑</div>
          <div @click="startUsing(scope.row, scope.$index)">
            {{ scope.row.enabled === 1 ? '启用' : '删除' }}
          </div>
        </el-popover>
      </template>
    </basics-table>
    <!--新增-->
    <el-dialog
      v-if="isShowAdDl"
      :title="addOrEdit === 1 ? '新建广告位' : '编辑广告位'"
      :visible.sync="isShowAdDl"
      width="600px"
      :before-close="closeAddAdDl"
    >
      <div class="ad-container">
        <basics-form
          :key="'ad-' + addOrEdit"
          ref="form"
          :loading="loadings._ums_meixiu_api_a_ad_resource_addAdvert"
          :forms="forms"
          :actions="formActions"
          @changeForm="changeForm"
          @submitForm="submitForm"
        />
        <!-- <el-button
          class="create-ad-type"
          icon="el-icon-plus"
          type="text"
          @click="createAdType"
        >新增广告类型</el-button> -->
      </div>
    </el-dialog>
    <!--新增广告类型 弹窗-->
    <el-dialog
      v-if="isShowAddType"
      title="新建广告类型"
      :visible.sync="isShowAddType"
      width="500px"
      :before-close="closeAdDl"
    >
      <div class="ad-container">
        <basics-form
          :key="isShowAddType"
          ref="adForm"
          :loading="loadings._ums_meixiu_api_a_ad_resource_addAdvertConfig"
          :forms="adType"
          :actions="adActions"
          @submitForm="submitAdForm"
        />
      </div>
    </el-dialog>
    <!-- 广告位排序 -->
    <el-dialog
      v-if="isShowSort"
      title="广告位置排序"
      :visible.sync="isShowSort"
      width="800px"
      :before-close="closeSortDl"
    >
      <div class="ad-sort">
        <div class="ad-sort-title">当前广告数量：{{ currSortNum }}</div>
        <div v-if="imageList.length===0" class="ad-sort-empty"><i class="el-icon-receiving" /> 暂无投放</div>
        <Vuedraggable
          v-model="imageList"
          class="wrapper"
          ghost-class="ghost"
        >
          <transition-group type="transition" :name="'sort-item'">
            <div v-for="item in imageList" :key="item.id" class="sort-item">
              <el-image
                class="sort-item-img"
                :src="item.resourceUrl"
                fit="contain"
                :preview-src-list="[item.resourceUrl]"
              />
              <div class="sort-item-title">{{ item.publishName }}</div>
            </div>
          </transition-group>
        </Vuedraggable>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeSortDl">取 消</el-button>
        <el-button type="primary" @click="submitSort">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 广告位预览图 -->
    <el-dialog
      v-if="isShowOverview"
      title="广告位预览图"
      :visible.sync="isShowOverview"
      width="500px"
      :before-close="closeOverviewDl"
    >
      <div class="ad-overview">
        <img :src="overviewUrl" alt="">
      </div>
    </el-dialog>
    <!-- 分类管理 -->
    <el-drawer
      v-if="isShowClassification"
      title="分类管理"
      placement="right"
      :visible.sync="isShowClassification"
      size="50%"
    >
      <Classification />
    </el-drawer>
  </div>
</template>
<script>

import {
  listAdvertNew,
  // listAdvertType,
  addAdvertNew,
  addAdvertTypeNew,
  openAndCloseAdvert,
  getPutsByPositionId,
  sortPut,
  getAdvertType,
  listAdvertSize
} from '@/api/ad-center/ad-position'
import Vuedraggable from 'vuedraggable'
import BasicsTable from '@/components/BasicsTable'
import BasicsAction from '@/components/BasicsAction'
import BasicsForm from '@/components/BasicsForm'
import BasicsSearch from '@/components/BasicsSearch'
// import TabClient from '@/components/TabClient'
import Classification from './component/classificationManage'
import columns, { actionsList } from './columns'
import { default as act } from './actions/list'
import forms, { actions as formActions } from './forms/add'
import searchs from './searchs/searchs'
import adType, { adActions } from './forms/ad-type'
import { mapGetters } from 'vuex'
const defaultListQuery = {
  page: 1,
  limit: 20
}

export default {
  name: 'AdPositionNew',
  components: { BasicsTable, BasicsAction, BasicsForm, BasicsSearch, Vuedraggable, Classification },
  data() {
    return {
      currTab: {
        businessType: '',
        clientType: ''
      },
      searchs: searchs, // 搜索配置项
      table: { stripe: true },
      columns: columns({ toOverview: this.toOverview, toSort: this.toSort }),
      isShowOverview: false, // 预览弹窗
      isShowSort: false, // 排序弹窗
      addOrEdit: 0, // 新增还是编辑 0 关闭 1 新增 2 编辑
      isShowAddType: false, // 新增广告位类型
      currAdId: 0, // 当前编辑id
      currSortNum: '', // 当前排序广告数量展示
      imageList: [], // 排序图片列表
      overviewUrl: '', // 预览图片url
      act: act({ toAddAd: this.toAddAd, classification: this.classification }),
      forms: forms,
      adType: adType,
      adTypeOptions: [],
      adActions: adActions({ quit: this.closeAdDl }),
      actionFunction: actionsList({
        tableAction: this.tableAction
      }),
      list: [],
      total: 0,
      query: {
        id: undefined,
        advertName: undefined,
        advertType: undefined,
        enabeld: 0
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogVisible: false,
      isShowClassification: false,
      advertTypeList: [], // 广告类型
      advertSizeList: [], // 列表筛选 广告尺寸(与新建广告位的不能共用)
      advertSizeListForm: [] // 新建广告位 广告尺寸(与新建广告位的不能共用)
    }
  },
  computed: {
    // 根据业务线返回客户端
    radioOptions() {
      const arr = this.adConfig.clientType[this.currTab.businessType]
      return arr
    },
    ...mapGetters(['loadings', 'adConfig', 'operatConfig']),
    isShowAdDl() {
      return this.addOrEdit !== 0
    },
    formActions() {
      if (this.addOrEdit === 1) {
        return formActions({ quit: this.closeAddAdDl })
      }
      return formActions({ quit: this.closeAddAdDl, label: '修改' })
    }
  },
  mounted() {
    // 初始化查询条件
    this.initData()
    // 获取广告分类
    this.getAdvertType()
  },
  methods: {
    // 表格操作
    tableAction(dat, row, index, type) {
      this.$nextTick(() => {
        if (type === 'edit') {
          this.toAddAd('', 2, row)
        } else if (type === 'able') {
          this.startUsing(row, index)
        }
      })
    },
    // 改变客户端
    clientTypeChange() {
      this.listQuery = { ...defaultListQuery }
      this.getList()
      // this.getAdType()
      this.getAdvertType()
      this.getAdvertSizeList()
    },
    // 打开分类管理
    classification() {
      this.isShowClassification = true
    },
    // 赋默认值
    initData() {
      const { clientType, businessType } = this.adConfig
      this.currTab.businessType = businessType[0].value
      this.currTab.clientType = clientType[this.currTab.businessType][0]
      this.getList()
      this.getAdvertSizeList()
    },
    // tab切换监听组件改变
    handleTabClick() {
      const { businessType } = this.currTab
      if (businessType === 'Artworld') {
        this.currTab.clientType = '用户端App'
      } else {
        this.currTab.clientType = '学生端App'
      }
      this.listQuery = {
        page: 1,
        limit: 20
      }
      this.getList()
      // this.getAdType()
      this.getAdvertType()
      this.getAdvertSizeList()
    },
    // 点击查询
    submitSearch(val) {
      const { advertSizeList } = this
      this.listQuery = {
        page: 1,
        limit: 20
      }
      if (val.newAdvertSize) {
        val.newAdvertSize = advertSizeList.filter(v => v.id === val.newAdvertSize)?.[0]?.newAdvertSize
      }
      this.query = { ...this.query, ...val }
      this.getList()
    },
    // 图片预览 - 打开
    toOverview(imgUrl) {
      this.overviewUrl = imgUrl
      this.isShowOverview = true
    },
    // 图片预览 - 关闭
    closeOverviewDl() {
      this.isShowOverview = false
      this.overviewUrl = ''
    },
    // 投放排序 - 打开
    toSort(row) {
      this.currSortNum = `${row.usedCount}`
      getPutsByPositionId({ advertId: row.id }).then(res => {
        if (res.status === 0) {
          this.imageList = res.data
          this.isShowSort = true
        }
      })
    },
    // 投放排序 - 关闭
    closeSortDl() {
      this.isShowSort = false
    },
    // 投放排序 - 提交
    submitSort() {
      if (!this.imageList.length > 0) {
        this.closeSortDl()
        return
      }
      const orderInfo = []
      this.imageList.forEach((item, index) => {
        orderInfo.push({ key: `${item.id}`, value: `${index + 1}` })
      })
      sortPut(orderInfo).then(res => {
        if (res.status === 0) {
          this.$message.success('广告顺序已更新')
          this.closeSortDl()
        }
      })
    },
    // 新增/修改广告位 - 打开
    toAddAd(e, _addOrEdit = 1, row) {
      const { advertSizeList } = this.operatConfig
      this.addOrEdit = _addOrEdit
      this.$nextTick(() => {
        this.$refs.form.set({
          type: 'options',
          data: {
            advertType: this.adTypeOptions,
            sizeId: advertSizeList
          }
        })
        if (row) {
          const { enabled, advertType, coverUrl, advertName, totalCount, bussinessName, clientType, classificationName, sizeId } = row
          this.currAdId = row.id
          const obj = {
            enabled: enabled === 0,
            name: advertName,
            sizeId: +sizeId,
            advertType,
            coverUrl,
            totalCount,
            bussinessName,
            clientType,
            classificationName
          }
          this.$refs.form.recoveryForm(obj)
        } else {
          this.currAdId = null
        }
      })
    },
    // 新增广告位 - 关闭
    closeAddAdDl() {
      this.addOrEdit = 0
    },
    // 获取广告位列表
    getList() {
      const { query, listQuery } = this
      const queryParams = { ...query }
      // 兼容后端传参格式需求
      Object.keys(queryParams).forEach(k => {
        if (queryParams[k] === '') {
          queryParams[k] = undefined
        }
      })
      listAdvertNew({
        bussinessName: this.currTab.businessType,
        clientType: this.currTab.clientType,
        ...queryParams,
        pageNum: listQuery.page,
        pageSize: listQuery.limit
      }).then(res => {
        const data = res.data || {}
        this.list = data.list || []
        this.total = ~~data.total || 0
      })
    },
    // 获取广告分类
    async getAdvertType() {
      const res = await getAdvertType({ ...this.currTab })
      // 复值广告分类列表
      this.advertTypeList = res.data
      this.$nextTick(() => {
        this.$refs.searchs.set({
          type: 'options',
          data: {
            advertType: this.advertTypeList.map(item => { return { label: item.classificationName, value: item.classificationName } })
          }
        })
      })
    },
    // 获取广告尺寸
    getAdvertSizeList() {
      listAdvertSize({ ...this.currTab }).then(res => {
        const advertSizeList = res.data.map(v => ({ ...v, label: `${v.advertSizeName}-${v.newAdvertSize}`, value: v.id }))
        this.advertSizeList = advertSizeList
        this.$nextTick(() => {
          this.$refs.searchs.set({
            type: 'options',
            data: {
              newAdvertSize: advertSizeList
            }
          })
        })
      })
    },
    // 禁用
    startUsing(row, index) {
      let txt = '请确认，是否启用广告位?'
      let message = '启用成功'
      if (!row.enabled) {
        txt = '请确认，是否删除广告位?'
        message = '删除成功'
      }
      this.$confirm(txt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        openAndCloseAdvert({
          advertId: row.id,
          status: ~~!row.enabled
        }).then(() => {
          this.list[index].enabled = ~~!this.list[index].enabled
          this.list = [...this.list]
          this.$message.success(message)
          // 获取列表
          this.getList()
        })
      })
    },
    async changeForm(val, oldVal) {
      const [{ bussinessName, clientType }, { bussinessName: oldBussinessName, clientType: oldClientType }] = [val, oldVal]
      if ((bussinessName !== oldBussinessName || clientType !== oldClientType) && bussinessName && clientType) {
        const payload = { businessType: bussinessName, clientType }
        Promise.all([getAdvertType(payload), listAdvertSize(payload)])
          .then(res => {
            const advertSizeListForm = res[1].data.map(v => ({ ...v, label: `${v.advertSizeName}-${v.newAdvertSize}`, value: v.id }))
            this.advertSizeListForm = advertSizeListForm
            this.$refs.form.set({
              type: 'options',
              data: {
                classificationName: res[0].data.map(item => { return { label: item.classificationName, value: item.classificationName } }),
                sizeId: advertSizeListForm
              }
            })
          })
      }
      if (val.bussinessName !== oldVal.bussinessName) {
        const arr = val.bussinessName ? this.adConfig.clientType[val.bussinessName].map(item => { return { label: item, value: item } }) : []
        this.$refs.form.set({
          type: 'options',
          data: { clientType: arr }
        })
      }
    },
    // 新增广告位 - 提交
    submitForm(val) {
      let data = {
        ...this.currTab,
        ...val,
        businessType: val.bussinessName
      }
      const { sizeId } = data
      const { advertSizeListForm } = this
      const adverSizeItem = advertSizeListForm.filter(v => v.id === sizeId)?.[0]
      if (adverSizeItem) {
        data = {
          ...data,
          advertSizeName: adverSizeItem.advertSizeName,
          newAdvertSize: adverSizeItem.newAdvertSize
        }
      }
      if (this.currAdId) {
        data.id = this.currAdId
      }
      data.enabled = '0'
      delete data.bussinessName
      addAdvertNew(data).then(res => {
        if (res.status === 0) {
          this.closeAddAdDl()
          this.$message.success('新增广告位成功')
          this.getList()
        } else {
          this.$message.error('新增广告位失败')
        }
      })
    },
    // 新增广告类型 - 开启
    createAdType() {
      this.isShowAddType = true
    },
    // 新增广告类型 - 关闭
    closeAdDl() {
      this.isShowAddType = false
    },
    // 新增广告类型 - 提交
    submitAdForm(val) {
      const data = {
        ...this.currTab,
        ...val
      }
      addAdvertTypeNew(data).then(res => {
        this.closeAdDl()
        this.$message.success('新增广告类型成功')
        // this.getAdType(true)
        this.getAdvertType()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ad-container {
  padding: 20px;
}
.ad-position-new {
  ::v-deep .search-item-label {
    width: 70px !important;
  }
  .slot-setting {
    cursor: pointer;
  }
  .ad-overview {
    text-align: center;
    img {
      width: 80%;
    }
  }
  .ad-sort {
    overflow: scroll;
    &-title {
      margin-bottom: 10px;
    }
    &-empty {
      text-align: center;
      i {
        font-size: 18px;
        vertical-align: middle;
      }
    }
    .wrapper span {
      display: flex;
      .sort-item {
        width: 120px;
        margin-right: 20px;
        cursor: pointer;
        &-img {
          width: 120px;
          height: 120px;
          background-color: #ccc;
          border-radius: 5px;
        }
        &-title {
          margin-top: 10px;
          color: #999;
          text-align: center;
        }
      }
    }
  }
  .sort-item-move {
    transition: transform 0.5s;
  }
  .ghost {
    opacity: 0.2;
    background: #c8ebfb;
  }

  .slot-item {
    ::v-deep .el-form-item__label {
      width: 86px;
      margin-right: 10px;
    }
    .line {
      font-size: 30px;
      text-align: center;
      height: 36px;
      line-height: 50px;
    }
  }
  ::v-deep .custom-input-num {
    width: 130px;
    min-width: 0px !important;
    ::v-deep .el-input {
      min-width: 0px !important;
    }
  }

  .create-ad-type {
    position: absolute;
    left: 430px;
    top: 192px;
  }
}
</style>
