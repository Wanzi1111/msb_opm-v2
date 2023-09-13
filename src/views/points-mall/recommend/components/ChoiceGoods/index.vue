<template>
  <div>
    <el-dialog
      title="选择商品"
      width="80%"
      :visible.sync="goodsState"
      :before-close="()=>$emit('close')"
    >
      <div style="margin-bottom:20px;font-size: 18px">
        <el-link type="primary">业务线：{{ businessName }} &nbsp; | &nbsp; 位置名称：{{ optionsName }} </el-link>
      </div>
      <basics-search ref="searchs" :loading="loadings._ums_meixiu_api_im_g_v1_goods_query_goods || loadings._ums_meixiu_api_im_g_v1_recommend_query_recommendationTag" :searchs="searchsCard" @changeSearch="changeSearch" @submitSearch="submitSearch" />
      <basics-table
        ref="table"
        :attr="attr"
        :loading="loadings._ums_meixiu_api_im_g_v1_goods_query_goods || loadings._ums_meixiu_api_im_g_v1_recommend_query_epcList"
        :columns="columns"
        :list="list"
        :get-list="getList"
        :total="total"
        :list-query="listQuery"
        :action-function="actions"
        @selection-change="handleSelectionChange"
      >
        <template slot="goodslotname" slot-scope="scope">
          <div style="display:flex;">
            <div>
              <span> [{{ goodslotName( scope.row.type ) }}] </span>
              {{ scope.row.type === 'CARD_CODE' ? scope.row.epcReferName : scope.row.type === 'INKIND' ? scope.row.title : scope.row.epcReferName }}
              <div v-show="scope.row.goodsCouponStatus==='UNABLE'" style="color:red;">已停用</div>
            </div>
          </div>
        </template>
      </basics-table>
      <div v-loading="loadings._ums_meixiu_api_im_g_v1_recommend_add_recommendGoods" style="margin: 2% 0 0 85%">
        <el-button plain @click="$emit('close')">取消</el-button>
        <el-button plain type="primary" @click="addGoods">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/points-mall/mall-admin'
import { addRecommendGoods, recommendationTag, epcList } from '@/api/points-mall/recommend'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'
import searchsCard from './searchs/listcard'
import columns, { actions } from './columns/list'
import { business, classValue, classValueone } from '../../enum/index'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'ChoiceGoods',
  components: { BasicsSearch, BasicsTable },
  props: {
    // businessType: {
    //   type: String,
    //   default: ''
    // },
    // ecommendationManageId: {
    //   type: String,
    //   default: ''
    // }
    goodsState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchsCard: searchsCard,
      attr: { stripe: true },
      type: '',
      columns: columns,
      actions: actions(),
      total: 0,
      loading: false,
      list: [],
      filterArr: [],
      businessType: 'ONETOONE',
      ecommendationManageId: '',
      listQuery: {
        page: 1,
        limit: 10
      },
      goodsModelList: [],
      epc: [],
      optionsArr: [],
      businessArr: business

    }
  },
  computed: {
    ...mapGetters(['loadings']),
    optionsName() {
      const { optionsArr, ecommendationManageId } = this
      const arr = optionsArr.filter(item => item.id === ecommendationManageId)
      return arr && arr[0]?.label
    },
    businessName() {
      const { businessArr, businessType } = this
      const arrBsi = businessArr.filter(item => item.value === businessType)
      return arrBsi && arrBsi[0]?.label
    },
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
  created() {
    this.$bus.$on('busRecommend', ({ businessType, ecommendationManageId }) => {
      this.businessType = businessType
      this.ecommendationManageId = ecommendationManageId
      this.lineList() // 加载位置信息
    })
    // this.lineList()
  },
  methods: {
    // 表格选中行处理
    handleSelectionChange(val) {
      this.goodsModelList = []
      val.map(item => {
        this.goodsModelList.push({ goodsId: item.id, epc: item.epc })
      })
    },
    addGoods() {
      const { businessType, ecommendationManageId, goodsModelList } = this
      // if (!businessType) return this.$message.error('请选择业务线')
      // if (!ecommendationManageId) return this.$message.error('请选择位置名称')
      if (goodsModelList.length < 1) return this.$message.error('请选择商品')
      const data = {
        ecommendationManageId,
        businessType,
        goodsModelList
      }
      addRecommendGoods(data).then(async () => {
        // this.$emit('clos')
        this.$message.success('已添加')
        await this.getEpcList()
      }).catch((err) => {
        console.log(err)
      })
    },
    lineList: _.debounce(async function() {
      const { businessType, ecommendationManageId } = this
      await recommendationTag({ businessType }).then((result) => {
        const arr = result?.payload.map(item => {
          item.label = item.recommendationTag
          item.value = item.id
          return item
        })
        this.optionsArr = arr
        this.ecommendationManageId = ecommendationManageId || arr[0].id
        // this.$nextTick(() => {
        //   this.$refs.searchs && this.$refs.searchs.set({
        //     type: 'options',
        //     data: { ecommendationManageId: arr }
        //   })
        //   this.$refs.searchs && this.$refs.searchs.recoveryForm({
        //     businessType,
        //     ecommendationManageId: this.ecommendationManageId
        //   })
        // })
        this.getEpcList() // 加载 已添加的商品code
      }).catch((err) => {
        this.$message(err)
      })
    }, 200),
    getList: _.debounce(function() {
      const { page, limit: pageSize } = this.listQuery
      const { businessType, ecommendationManageId, epc, type, epcReferName } = this
      const data = {
        ecommendationManageId,
        businessType,
        epcReferName,
        type,
        status: 'PUTAWAY',
        currencyType: 'GOLDCOIN',
        page,
        pageSize
      }
      getList(data).then((result) => {
        const { content, totalElements } = result.payload
        this.list = content.map(ma => {
          if (epc.includes(ma.epc)) {
            ma = { ...ma, stStatus: true }
          }
          return ma
        })
        this.total = totalElements
      }).catch((err) => {
        console.log(err)
      })
    }, 200),
    getEpcList: _.debounce(async function() {
      const { businessType, ecommendationManageId } = this
      await epcList({ businessType, ecommendationManageId }).then((result) => {
        this.epc = result.payload || []
        this.getList()
      }).catch((err) => {
        console.log(err)
      })
    }, 201),
    changeSearch(val, oldVal) {
      const { type, epcReferName, businessType } = val
      this.type = type
      this.epcReferName = epcReferName
      if (businessType && businessType !== oldVal.businessType) {
        this.$nextTick(() => {
          this.$refs.searchs.set({
            type: 'options',
            data: { type: businessType === 'BEAR' ? classValue : classValueone }
          })
        })
      }
    },
    async submitSearch(val) {
      this.listQuery = {
        page: 1,
        limit: 10
      }
      await this.getEpcList()
    }
  }
}
</script>
