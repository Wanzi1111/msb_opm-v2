<template>
  <div>
    <div class="title-container">
      <basics-title title="推荐管理" line />
    </div>
    <div class="app-container">
      <head-tabs @getList="getList" />
      <basics-action :actions="act" />
      <basics-table
        ref="table"
        :key="tableKey"
        :table="table"
        :loading="loadings._ums_meixiu_api_im_g_v1_recommend_query_recommendGoodsList"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
        @sort-change="sort"
        @selection-change="handleSelectionChange"
      >
        <template slot="goodslotname" slot-scope="scope">
          <div style="display:flex;">
            <div>
              [{{ goodslotName( scope.row.type ) }}]
              {{ scope.row.type === 'CARD_CODE' ? scope.row.epcReferName : scope.row.type === 'INKIND' ? scope.row.title : scope.row.epcReferName }}
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
      <el-popconfirm :title="`确定删除这${lengths}条数据？`" @confirm="multipleDel">
        <el-button v-show="lengths>1" slot="reference" type="danger" icon="el-icon-delete" plain>批量删除</el-button>
      </el-popconfirm>
    </div>
    <position-manage :outer-visible="outerVisible" :add-o-redit="addORedit" @clearPm="clearPm" />
    <choice-goods :goods-state="goodsState" :business-type="businessType" :list-query="listQuery" @close="close" />
    <img-upload :visible="imgUploadof" :list-id="+listId" @getList="getList" @closeDl="()=>{imgUploadof = false}" />
  </div>
</template>

<script>
import { recommendGoodsList, delRecommendGoods } from '@/api/points-mall/recommend'
import { default as act } from './actions/list'
import columns, { actions } from './columns/list'
import { mapGetters } from 'vuex'
import HeadTabs from './components/headTabs/index'
import PositionManage from './components/positionManage/index'
import ChoiceGoods from './components/ChoiceGoods/index'
import ImgUpload from './components/imgUpload/index.vue'
import _ from 'lodash'

const { VITE_APP_ENV } = import.meta.env
// 各环境、业务线需要展示活动图片的tagId
const showActivityImgEnvIdMap = {
  test: {
    ONETOONE: ['999', '1023', '1024'],
    BEAR: ['1025', '1028', '1029'],
    BEARMUSIC: ['1027']
  },
  product: {
    ONETOONE: ['8', '28', '29'],
    BEAR: ['30', '34', '35'],
    BEARMUSIC: ['33']
  }
}

export default {
  name: 'Recommend',
  components: { HeadTabs, PositionManage, ChoiceGoods, ImgUpload },
  data() {
    return {
      table: { stripe: true },
      tableKey: 1,
      columns: columns({ getList: this.getList, showActivityImg: false }),
      actionFunction: actions({ del: this.singleDel, showActivityImg: false, imgUpload: this.imgUpload }),
      list: [],
      act: act({ add: this.create, optionManage: this.optionManage }),
      outerVisible: false,
      addORedit: true,
      selectedInfoList: '',
      goodsState: false,
      num: 1,
      total: 0,
      lengths: 0,
      businessType: '',
      ecommendationManageId: 0,
      epcReferName: '',
      listQuery: {
        page: 1,
        limit: 10
      },
      orderColumn: '',
      sortType: '',
      imgUploadof: false,
      listId: 0
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    goodslotName() {
      const typeObj = {
        'INKIND': '实物',
        'CARD_CODE': '卡密',
        'CASH': '现金',
        'CLASS': '课时',
        'THIRD_COURSE': '轻课'
      }
      return (val) => {
        return typeObj[val]
      }
    }
  },
  methods: {
    imgUpload(text, row) {
      this.imgUploadof = true
      this.listId = row.recommendGoodId
    },
    optionManage() {
      this.outerVisible = true
      this.addORedit = true
    },
    create() {
      this.goodsState = true
    },
    getList: _.debounce(function(parm, pages) {
      Object.assign(this._data, parm)
      Object.assign(this.listQuery, pages)
      const { sortType, orderColumn, businessType, ecommendationManageId, epcReferName } = this
      // 是否展示活动图片
      const showActivityImg = showActivityImgEnvIdMap[VITE_APP_ENV][businessType]?.includes(ecommendationManageId + '') || false
      this.$set(this, 'columns', columns({ getList: this.getList, showActivityImg }))
      this.$set(this, 'actionFunction', actions({ del: this.singleDel, showActivityImg, imgUpload: this.imgUpload }))
      const { page, limit: pageSize } = this.listQuery
      if (ecommendationManageId) {
        this.$bus.$emit('busRecommend', { businessType, ecommendationManageId })
      }
      const data = {
        businessType,
        ecommendationManageId,
        epcReferName,
        orderColumn,
        sortType,
        page,
        pageSize
      }
      recommendGoodsList(data).then((result) => {
        const { content, totalElements } = result.payload
        this.list = content || []
        this.total = +totalElements
        this.tableKey++ // 更新columns后要重新渲染下
      }).catch((err) => {
        console.log(err)
        this.list = []
      })
    }, 200),
    multipleDel() {
      this.del(this.selectedInfoList)
    },
    singleDel(dat, row) {
      this.del(row.recommendGoodId)
    },
    del(idsList) {
      delRecommendGoods({ idsList }).then(() => {
        this.getList()
      }).catch((err) => {
        console.log(err)
      })
    },
    // component positionManage
    clearPm(val) {
      this.outerVisible = val
    },
    // 表格选中行处理
    handleSelectionChange(val) {
      const arr = []
      val.map(item => {
        arr.push(item.recommendGoodId)
      })
      this.selectedInfoList = arr.join(',')
      this.lengths = val.length
    },
    sort(obj) {
      const { prop, order } = obj
      this.orderColumn = order ? prop : ''
      this.sortType = order === 'descending' ? 'reversed' : ''
      this.getList()
    },
    close() {
      this.goodsState = false
    }
  }
}
</script>
