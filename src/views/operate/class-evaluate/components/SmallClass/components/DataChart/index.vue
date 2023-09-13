<template>
  <div v-loading="loading" class="card-box">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card :body-style="{ height: '161px', display: 'flex' }">
          <div class="chart-static">
            <div class="static-rate">
              参与率 <span>{{ chartData.allCommentRatio || 0 }}%</span>
            </div>
            <div class="static-rate">
              主动评价率 <span>{{ chartData.commentRatio || 0 }}%</span>
            </div>
            <span class="static-tip">
              数据统计近7天所有数据
            </span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card :body-style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}">
          <div class="chart-box">
            <div v-for="v in chartConfig" :key="v.key" class="progress-box">
              <div class="progress-title">{{ v.title }}</div>
              <el-progress
                :type="v.type"
                :width="v.width"
                :stroke-width="v.strokeWidth"
                :color="v.color"
                :percentage="Number(chartData[v.key]) || 0"
              />
            </div>
          </div>
          <div class="chart-total">
            共{{ chartData.count || 0 }}条
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ChartConfig } from './config'

export default {
  name: 'SmallClassDataChart',
  props: {
    chartData: {
      type: Object,
      default: () => ({
        allCommentRatio: 0,
        commentRatio: 0,
        count: 0,
        fiveCommentRatio: 0,
        fourCommentRatio: 0,
        oneCommentRatio: 0,
        threeCommentRatio: 0,
        twoCommentRatio: 0
      })
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chartConfig: ChartConfig
    }
  }
}
</script>

<style lang="scss" scoped>
.card-box {
  margin-top: 10px;
  margin-bottom: 15px;
  .chart-static {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    .static-rate {
      // margin-top: 30px;
      vertical-align: top;
      span {
        color: #67c23a;
        font-size: 30px;
      }
    }
    .static-tip {
      text-align: right;
      font-size: 12px;
      color: '#ccc';
    }
  }
  .chart-box {
    display: flex;
    flex: 1;
    justify-content: space-around;
    .progress-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .progress-title {
        margin-bottom: 5px;
        font-size: 14px;
      }
    }
  }
  .chart-total {
    width: 100px;
    font-size: 14px;
    text-align: right;
  }
}
</style>
