<template>
  <div>
    <div class="title-container">
      <basics-title title="奖品配置" line />
    </div>
    <div
      v-loading="
        loadings._ums_meixiu_api_im_g_v1_admin_rvactivity_activityGoodsList
      "
      class="app-container"
    >
      <basics-action :actions="act" />
      <basics-table
        :loading="
          loadings._ums_meixiu_api_im_g_v1_admin_rvactivity_activityGoodsList
        "
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      >
        <template slot="winPrizeProbability" slot-scope="scope">
          <el-input
            v-model="scope.row.winPrizeProbability"
            placeholder="请输入内容"
            prefix-icon="el-icon-edit"
          />
        </template>
      </basics-table>
    </div>
    <add-prize
      :vsibled-prize.sync="vsibledPrize"
      :handle-dialog-vis="handleDialogVis"
      @getList="getList"
    />
    <probability-calculation
      :vsibled-calculation.sync="vsibledCalculation"
      :calculation-list="list"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import columns, { tableActions } from './columns'
import act from './actions'
import AddPrize from './components/add-prize'
import ProbabilityCalculation from './components/probability-calculation'

export default {
  name: 'PrizeSetting',
  components: { AddPrize, ProbabilityCalculation },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      act: act({ add: this.add, calculates: this.calculates }),
      vsibledPrize: false,
      vsibledCalculation: false,
      columns,
      total: 0,
      list: [],
      actionFunction: tableActions({
        handleUpdate: this.handleUpdate,
        handleDelete: this.handleDelete
      }),
      multipleSelection: [],
      sign: true
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    // this.getList();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getList()
    })
  },
  methods: {
    // 新增奖品
    add() {
      this.vsibledPrize = true
    },
    // 奖品概率测算
    calculates() {
      this.vsibledCalculation = true
    },
    // 获取列表
    getList() {
      const { activityId } = this.$route.query
      this.$api.activityGoodsList({ activityId }).then(({ payload }) => {
        this.list = payload
        this.total = payload.length
      })
    },
    // 更新概率
    handleUpdate(row) {
      const { id, winPrizeProbability } = row
      this.$api
        .updateProbability({
          activityGoodsId: id,
          probability: winPrizeProbability
        })
        .then(() => {
          this.$message.success('概率已更新')
          this.getList()
        })
        .catch((err) => {})
    },
    // handleDelete 删除奖品
    handleDelete(row) {
      const { id } = row
      this.$api
        .delActivityGoodsById({ activityGoodsId: id })
        .then(() => {
          this.$message.success('数据已删除！')
          this.getList()
        })
        .catch((err) => {})
    },
    handleDialogVis(refresh) {
      this.vsibledPrize = false
      refresh && this.getList()
    }
  }
}
</script>
<style lang="scss" scoped></style>
