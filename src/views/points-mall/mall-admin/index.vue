<template>
  <div class="app-container">
    <el-tabs v-model="activeState">
      <el-tab-pane v-for="(item, index) in newStateList" :key="index" :label="item.name" />
    </el-tabs>
    <basics-search ref="searchs" :loading="loadings['_ums_meixiu_api_im_g_v1_goods_query_goods']" :searchs="searchs" @submitSearch="submitSearch">
      <template slot="goldCoin" slot-scope="scope">
        <div style="display: flex">
          <div>
            <el-input v-model="scope.form.startCoion" />
          </div>
          <div style="margin: 0 3px">_</div>
          <div>
            <el-input v-model="scope.form.endCoion" />
          </div>
        </div>
      </template>
    </basics-search>
    <basics-action v-show="activeState==='0'" :actions="act1" />
    <basics-action v-show="activeState!=='0'" :actions="act" />
    <basics-table
      ref="table"
      :table="table"
      :loading="loadings['_ums_meixiu_api_im_g_v1_goods_query_goods']"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
      :action-function="actionFunction"
      @sort-change="sort"
      @selection-change="handleSelectionChange"
    >
      <template slot="excessInventory" slot-scope="scope">
        <span v-if="scope.row.countryType==='OVERSEAS'">-</span>
        <span v-else :style="{color: scope.row.excessInventory == 0 ? 'red': ''}">{{ scope.row.excessInventory }}</span>
      </template>
      <!-- <template slot="goodslot" slot-scope="scope">
        <div style="display:flex;">
          <div style="max-width: 100px;">
            <el-image
              :src="imgView(scope.row)"
              :preview-src-list="imgViewBig(scope.row)"
            />
          </div>
        </div>
      </template> -->
      <template slot="goodslotname" slot-scope="scope">
        <div style="display:flex;">
          <div>
            [{{ goodslotName( scope.row.type ) }}]
            {{ scope.row.type === 'CARD_CODE' ? scope.row.epcReferName : scope.row.type === 'INKIND' ? scope.row.title : scope.row.epcReferName }}
            <div v-show="scope.row.goodsCouponStatus==='UNABLE'" style="color:red;">已停用</div>
          </div>
        </div>
      </template>
      <template slot="price" slot-scope="scope">
        <div>
          {{ scope.row.type === 'CLASS' ? `${scope.row.classNum}课时` : `${scope.row.price}元` }}
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
    <set-rate :exchange-boolean="exchange" :dialog-visible="dialogVisible" :business-type="activeState" @close="close" @setRate="submitRate" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList, updownShelf, deleteGood, getCategorysMapBusiness } from '@/api/points-mall/mall-admin'
import { searchs } from './searchs/searchs'
import setRate from './components/setRate'
import columns, { actions } from './columns/list'
import BasicsAction from '@/components/BasicsAction'
import { default as act } from './actions/list'
import { default as act1 } from './actions/list1'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'
const classValue = [
  {
    label: '全部类型',
    value: ''
  },
  {
    label: '实物',
    value: 'INKIND'
  },
  {
    label: '卡密',
    value: 'CARD_CODE'
  },
  {
    label: '现金',
    value: 'CASH'
  },
  {
    label: '课时',
    value: 'CLASS'
  },
  {
    label: '轻课',
    value: 'THIRD_COURSE'
  }
]
export default {
  name: 'MallAdmin',
  components: { BasicsAction, BasicsSearch, BasicsTable, setRate },
  data() {
    return {
      exchange: false,
      activeState: '0',
      searchs: searchs({ searc: this.searc }),
      table: { stripe: true },
      list: [],
      columns: columns(),
      dialogVisible: false,
      options: [{ categoryName: '全部分类', id: '' }],
      listQuery: {
        page: 1,
        limit: 10
      },
      query: {
        status: 'PUTAWAY'
      },
      multipleSelection: [],
      act: act({ add: this.add, setRate: this.setRate, batchUpShelf: this.batchUpShelf, batchDownShelf: this.batchDownShelf }),
      act1: act1({ add: this.add, setRate: this.setRate, setRates: this.setRates, batchUpShelf: this.batchUpShelf, batchDownShelf: this.batchDownShelf }),
      total: 0,
      actionFunction: actions({ updownShelf: this.updownShelf, edit: this.edit, deleteGood: this.deleteGood })
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    newStateList() {
      return this.$store.getters.mallConfig.businessType
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
  watch: {
    activeState() {
      this.getList()
      this.getCategorysMapBusiness()
    }
  },
  created() {
    this.getList(true)
    this.getCategorysMapBusiness()
    // this.sort({ order: 'descending' })
  },
  activated() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  mounted() {

    // this.$nextTick(() => {
    //   document.getElementsByClassName('is-sortable')[0].onclick = function() {

    //   }
    // })
  },
  methods: {
    sort(obj) {
      const that = this
      const st = {
        sales: {
          ascending: 'INVENTORY_DESC',
          descending: 'INVENTORY_ASC'
        },
        excessInventory: {
          ascending: 'EXCESSINVENTORY_DESC',
          descending: 'EXCESSINVENTORY_ASC'
        }
      }
      that.query.sortColumn = st[obj.prop][obj.order]
      that.getList()
    },
    getCategorysMapBusiness() {
      const { activeState } = this
      this.$nextTick(() => {
        if (activeState === '0') {
          this.$refs.searchs.set({
            type: 'options',
            data: { type: classValue }
          })
        } else {
          this.$refs.searchs.set({
            type: 'options',
            data: { type: classValue.filter(item => item.value !== 'CLASS') }
          })
        }
      })
      const businessType = this.newStateList[activeState].businessType
      this.options = [{ categoryName: '全部分类', id: '' }]
      getCategorysMapBusiness({ businessType }).then(res => {
        this.options = this.options.concat(res.payload)
        this.$nextTick(() => {
          this.$refs.searchs.set({
            type: 'options',
            data: { categoryIds: res.payload[businessType] }
          })
        })
      })
    },

    // 搜索
    submitSearch(val) {
      this.query = { ...val }
      this.listQuery = {
        page: 1,
        limit: 10
      }
      this.getList()
    },
    imgView(scope) {
      return scope.img || require('@/assets/images/mall.png')
    },
    imgViewBig(scope) {
      return [scope.img || require('@/assets/images/mall.png')]
    },
    getList() {
      const { listQuery, query } = this
      const categoryIdsArr = []
      if (query.categoryIds) {
        query.categoryIds.forEach(res => {
          const [, child] = res
          categoryIdsArr.push(child)
        })
      }
      const categoryIds = categoryIdsArr.join()
      getList({
        page: listQuery.page,
        pageSize: listQuery.limit,
        ...query,
        currencyType: 'GOLDCOIN',
        businessType: this.newStateList[this.activeState].businessType,
        categoryIds
      }).then(res => {
        if (res.code === 0) {
          const data = res.payload
          this.total = +data.totalElements
          this.list = data.content
        }
      })
    },
    submitRate() {
      this.$message.success('汇率设置成功')
      this.close()
    },
    updownShelf(dat, row) {
      let txt = ''
      let tip = ''
      let status = ''
      const arrId = []
      if ((row && row.status === 'REMOVE') || dat === 'down') {
        txt = '商品上架即表明商品可被正常兑换，请谨慎操作'
        tip = '商品上架'
        if (row && row.goodsCouponStatus === 'UNABLE') {
          this.$message.warning('商品已停用，不能操作')
          return
        }
      } else {
        txt = '商品下架即表明商品将不在商城中显示'
        tip = '商品下架'
      }
      if (dat) {
        // debugger
        this.multipleSelection.forEach(item => {
          if (dat === 'down' && item.goodsCouponStatus === 'UNABLE') {
            return
          }
          arrId.push(item.id)
        })
        status = dat !== 'up' ? 'PUTAWAY' : 'REMOVE'
      } else {
        status = row.status === 'REMOVE' ? 'PUTAWAY' : 'REMOVE'
        arrId.push(row.id)
      }
      this.$confirm(txt, tip, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updownShelf({
          ids: arrId.join(),
          status: status
        }).then(() => {
          this.getList()
          this.$message.success(`${tip}${dat === 'up' || dat === 'down' ? '批量' : ''}成功`)
        })
      })
    },
    batchUpShelf() {
      if (this.multipleSelection.length <= 0) {
        this.$message.warning('请选择商品')
        return
      }
      if (this.multipleSelection.length === 1 && this.multipleSelection[0].goodsCouponStatus === 'UNABLE') {
        this.$message.warning('商品已停用，不能操作')
        return
      }
      this.updownShelf('down')
    },
    batchDownShelf() {
      if (this.multipleSelection.length <= 0) {
        this.$message.warning('请选择商品')
        return
      }
      this.updownShelf('up')
    },
    setRate() {
      this.dialogVisible = true
      this.exchange = false
    },
    setRates() {
      this.exchange = true
      this.dialogVisible = true
    },
    edit(dat, row) {
      this.$router.push({ name: 'createGood', query: { rows: JSON.stringify(row), activeState: this.activeState }})
    },
    close() {
      this.dialogVisible = false
    },
    add() {
      this.$router.push({ name: 'createGood', query: {
        activeState: this.activeState,
        businessType: this.newStateList[this.activeState].businessType
      }})
    },
    handleSelectionChange(rows) {
      this.multipleSelection = rows
    },
    deleteGood(dat, row) {
      const txt = '删除后，商品将不再展现给用户且无法恢复哦'
      const tip = '确定要删除这个商品吗？'
      this.$confirm(txt, tip, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGood({ id: row.id }).then(res => {
          this.$message.success('商品删除成功')
          this.getList()
        })
      })
    }
  }
}
</script>

<style></style>
