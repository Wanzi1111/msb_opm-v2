<template>
  <div>
    <!-- 搜索框 -->
    <basics-search
      :loading="loadings._ums_meixiu_api_im_g_v1_admin_update_thirdGoodsStatus"
      :searchs="searchs"
      @submitSearch="submitSearch"
    />
    <!-- 表格数据 -->
    <basics-table
      :columns="columns"
      :loading="loadings._ums_meixiu_api_im_g_v1_admin_query_thirdGoods"
      :list="tableData"
      :action-function="actionFunction"
      :get-list="getList"
      :list-query="paginationQuery"
      :total="total"
      :attr="attr"
    >
      <template slot="surplus" slot-scope="scope">
        <span
          v-if="scope.row.type === 'CLASS' || scope.row.countryType === 'OVERSEAS'"
        >--</span>
        <span v-else :style="{ color: scope.row.surplus == 0 ? 'red' : '' }">{{
          scope.row.surplus
        }}</span>
      </template>
      <template slot="goodslotname" slot-scope="scope">
        <div style="display: flex">
          <div>
            {{ scope.row.type === "CARD_CODE" ? "[虚拟]" : scope.row.type === "CLASS" ? "[课时]" : "[实物]" }}
            {{ row.goodsName > 9 ? "123".substr(0, 9) + "..." : row.goodsName }}
          </div>
        </div>
      </template>
      <template slot="price" slot-scope="scope">
        <div>
          {{
            scope.row.type === "CLASS"
              ? `${scope.row.parValue}课时`
              : `${scope.row.price}元`
          }}
        </div>
      </template>
    </basics-table>
  </div>
</template>

<script>
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'
import columns, { actions } from './columns/list'
import { mapGetters } from 'vuex'
import searchs from './searchs/searchs'

const initPaninationQuery = { page: 1, limit: 10 }

export default {
  name: 'Real',
  components: { BasicsSearch, BasicsTable },
  data() {
    return {
      columns,
      searchs,
      actionFunction: actions({
        edit: this.editGood,
        status: this.handleStatus
      }),
      paginationQuery: { ...initPaninationQuery }, // 分页查询query
      tableData: [],
      total: 0,
      searchInfo: {},
      attr: {
        stripe: true
      }
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    // 获取实体商品数据
    getList() {
      const { page, limit: pageSize } = this.paginationQuery
      this.$api
        .queryThirdGoods({ page, pageSize, ...this.searchInfo, goodsCouponStatus: 'DEFAULT' })
        .then(res => {
          const { code, status, payload } = res
          if (code !== 0) {
            this.$message.error(status)
            return
          }
          this.tableData = payload.content
          this.total = Number(payload.totalElements)
        })
    },
    // 点击查询按钮
    submitSearch(val) {
      this.searchInfo = { ...val }
      this.paginationQuery = { ...initPaninationQuery }
      this.getList()
    },
    handleStatus(val, row) {
      const { goodsCouponStatus: dat, id } = row
      this.$confirm(
        `${dat === 'ENABLE'
          ? '停用后商城系统将自动下架不再展示'
          : '启用后商品将可正常使用'
        }`,
        `确定${dat === 'ENABLE' ? '停用' : '启用'}商品？`,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: `${dat === 'ENABLE' ? 'warning' : 'success'}`,
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          const param = { id }
          param['goodsCouponStatus'] = dat === 'ENABLE' ? 'UNABLE' : 'ENABLE'
          this.$api
            .thirdGoodsStatus(param)
            .then(res => {
              const { code, status } = res
              if (code !== 0) {
                this.$message.error(status)
                return
              }
              this.getList()
              this.$message({
                type: 'success',
                message: `${dat === 'ENABLE' ? '停用' : '启用'}商品成功~`
              })
            })
            .catch(e => { })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 编辑商品
    editGood(dat, value) {
      this.$router.push({
        path: 'real-edit',
        query: { proType: 1, listData: JSON.stringify(value) }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.commdity {
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 60px !important;
  }
  span {
    white-space: nowrap;
  }
}
</style>
