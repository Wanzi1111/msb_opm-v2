<template>
  <el-dialog
    title="概率测算"
    :visible.sync="vsibled"
    width="600px"
    @close="onDialogClose"
  >
    <div style="margin-bottom: 10px">
      <span>模拟结果：</span> <el-input v-model.number="drawTotalNum" prefix-icon="el-icon-edit" style="width: 20%" placeholder="请输入次数" /> /次
      <div class="but-right">
        <el-button type="text" @click="getList()">刷新</el-button>
      </div>
    </div>
    <basics-table
      ref="table"
      :attr="attr"
      :loading="loadings._ums_meixiu_api_im_g_v1_admin_rvactivity_simulatedLottery"
      :columns="columns"
      :list="list"
      :row-style="rowStyle"
      :get-list="getList"
    />

  </el-dialog>
</template>

<script>
import BasicsTable from '@/components/BasicsTable'
import columns from './columns/list'
import { mapGetters } from 'vuex'

export default {
  name: 'ProbabilityCalculation',
  components: { BasicsTable },
  props: {
    vsibledCalculation: {
      default() {
        return false
      },
      type: Boolean
    },
    calculationList: {
      default() {
        return []
      },
      type: Array
    }
  },
  data() {
    return {
      attr: { stripe: true },
      list: [],
      drawTotalNum: 100000,
      columns
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    vsibled: {
      get() {
        return this.vsibledCalculation
      },
      set() {}
    },
    rowStyle: {
      get() {
        return { background: '#f0f9eb' }
      },
      set() {}
    }
  },
  watch: {
    vsibledCalculation(val) {
      if (val) {
        this.getList()
      }
    }
  },
  methods: {
    // 关闭弹窗
    onDialogClose() {
      // 关闭弹窗重置抽奖次数
      this.drawTotalNum = 100000
      this.$emit('update:vsibledCalculation', false)
    },
    // 获取列表
    getList() {
      const { drawTotalNum, $route: { query: { activityId }}} = this
      const customGoodsProbabilityMap = {}
      this.calculationList.forEach(e => {
        customGoodsProbabilityMap[e.id] = e.winPrizeProbability
      })
      if (this.calculationList.length) {
        const parmas = {
          activityId,
          drawTotalNum,
          customGoodsProbabilityMap
        }
        this.$api.simulatedLottery(parmas).then((res) => {
          const { payload } = res
          this.list = payload.map(res => {
            return {
              id: res
            }
          })
          this.$message.success('已获取测算结果')
        }).catch((err) => {
          console.log('error', err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.but-right{
  float: right;
}
</style>
