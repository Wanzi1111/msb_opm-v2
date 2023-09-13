<template>
  <div id="classification">
    <!-- 操作 -->
    <el-row :gutter="12" style="margin-bottom: 20px">
      <el-col :span="8" style="display: flex">
        <div class="label">商品分类</div>
        <el-select v-model="listQuery.type" placeholder="请选择商品分类">
          <el-option
            v-for="item in categoryIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col v-if="listQuery.type !== 'CARD_CODE'" :span="8" style="display: flex">
        <div class="label">所属平台</div>
        <el-select v-model="listQuery.platformType" placeholder="请选择所属平台" @change="changePlatformType">
          <el-option
            v-for="item in platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="5" style="display: flex">
        <el-input v-model="listQuery.goodsName" placeholder="请选择商品名称" />
      </el-col>
      <el-col :span="2">
        <el-button
          :loading="loadings._operation_resource_listAdvertClassification"
          type="primary"
          @click="submitSearch"
        >搜索</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <basics-table
      ref="table"
      :table="table"
      :loading="tableLoading"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
    >
      <template slot="setting" slot-scope="scope">
        <el-button type="text" @click="settingRow(scope.row)">
          <span v-if="scope.row.isSetting" style="color: #909399 !important">已选择</span>
          <span v-else>选择</span>
        </el-button>
      </template>
    </basics-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BasicsTable from '@/components/BasicsTable'
import { queryAllProductsFore } from '@/api/points-mall/mall-admin'
import { inkind_columns, inkind_hongyuan_columns, card_columns } from './columns'

export default {
  components: { BasicsTable },
  props: {
    // 已选择的行的数据id
    select: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      table: { stripe: true },
      list: [],
      total: 10,
      tableLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        type: 'INKIND',
        platformType: 'MSB',
        goodsName: ''
      },
      categoryIdList: [
        {
          label: '实物',
          value: 'INKIND'
        },
        {
          label: '卡密',
          value: 'CARD_CODE'
        }
      ],
      platformList: [
        {
          label: '美术宝',
          value: 'MSB'
        },
        {
          label: '经发鸿源',
          value: 'HONGYUAN'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['loadings', 'adConfig']),
    // 业务线字典
    newStateList() {
      return this.$store.getters.mallConfig.businessType
    },
    columns() {
      const { type, platformType } = this.listQuery
      if (type === 'INKIND') {
        if (platformType === 'MSB') {
          return inkind_columns
        } else {
          return inkind_hongyuan_columns
        }
      } else {
        return card_columns
      }
    }
  },
  watch: {
    'listQuery.type': {
      handler: function(val, oldVal) {
        if (val !== oldVal) {
          this.listQuery.goodsName = ''
          this.getList()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 控制所属平台的分类
    changePlatformType(val) {
      this.listQuery.platformType = val
      this.getList()
    },
    // 选择
    settingRow(row) {
      const index = this.list.findIndex(item => item.id === row.id)
      if (index !== -1) {
        const list = this.list.map((item, key) => {
          return {
            ...item,
            isSetting: key === index
          }
        })
        this.list = list
        const data = JSON.parse(JSON.stringify(row))
        data.isInkind = this.listQuery.type === 'INKIND' ? 1 : 0
        if (this.listQuery.type === 'INKIND') {
          data.goodsName = data.productName
          data.surplus = data.orderStockNum
          data.epc = data.productCode
          data.price = data.stdPrice ? data.stdPrice : 0
        }
        this.$emit('selectRow', data)
      }
    },
    // 搜索
    submitSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    // 获取列表
    getList() {
      this.tableLoading = true
      const { listQuery } = this
      const data = {
        page: listQuery.page,
        pageSize: listQuery.limit
      }
      // 卡密
      // page: 1
      // pageSize: 10
      // type: CARD_CODE
      // goodsName
      if (listQuery.type === 'CARD_CODE') { // 卡密接口
        data.type = 'CARD_CODE'
        data.countryType = 'DOMESTIC'
        data.goodsName = listQuery.goodsName
        this.$api.goodscouponApi(data).then(res => {
          const data = res.payload || {}
          this.list = data.content.map(item => {
            // 之前存的是商品id，现在存的是productCode，兼容下
            const isSetting = item.id === parseInt(this.select) || item.productCode === this.select
            return {
              ...item,
              isSetting
            }
          })
          this.total = Number(data.totalElements) || 0
          this.tableLoading = false
        }).catch(() => { this.tableLoading = false })
      } else if (listQuery.type === 'INKIND') { // 实物
        if (listQuery.platformType === 'MSB') { // 美术宝
          data.productChildType = ['0906']
          data.productName = this.listQuery.goodsName
          queryAllProductsFore(data).then(res => {
            const data = res.data || {}
            this.list = data.rows.map(item => {
              const isSetting = item.id === parseInt(this.select) || item.productCode === this.select
              return {
                ...item,
                isSetting
              }
            })
            this.total = data.records || 0
            this.tableLoading = false
          }).catch(() => { this.tableLoading = false })
        } else { // 经发鸿源
          data.epcReferName = this.listQuery.goodsName
          this.$api.queryThirdGoods(data).then(res => {
            const data = res.payload || {}
            this.list = data.content.map(item => {
              const isSetting = item.id === parseInt(this.select) || item.productCode === this.select
              return {
                ...item,
                isSetting
              }
            })
            this.total = Number(data.totalElements) || 0
            this.tableLoading = false
          }).catch(() => { this.tableLoading = false })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#classification {
  .label {
    line-height: 36px;
    margin-right: 10px;
    margin-left: 10px;
  }
}
</style>
