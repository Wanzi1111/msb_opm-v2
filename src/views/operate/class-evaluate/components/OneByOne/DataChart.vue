<!--
 * @Descripttion: 评价环形图
 * @version: 1.0.0
 * @Author: zhangjiawen
 * @Date: 2020-11-18 17:23:52
 * @LastEditors: yelei
 * @LastEditTime: 2020-12-03 15:52:34
-->
<template>
  <div v-loading="loading" class="chart-main">
    <div class="chartR">
      <section class="r-box">
        <p class="chartR-line">
          <span class="word-t">评价率</span>
          <span
            class="percent"
          >{{ (chartData && chartData.allCommentRatio) || 0 }}%</span>
        </p>
        <p class="chartR-line">
          <span class="word-t">主动评价率</span>
          <span
            class="percent"
          >{{ (chartData && chartData.commentRatio) || 0 }}%</span>
        </p>
      </section>
      <el-divider />
      <p class="chartR-b">
        <span>评价率 包括已完课且7天失效未评价数据</span>
      </p>
    </div>
    <div class="chartL">
      <div class="chartL-title">
        <p>5星</p>
        <p>4星</p>
        <p>3星</p>
        <p>2星</p>
        <p>1星</p>
      </div>
      <div class="chartL-con">
        <el-progress
          :width="100"
          :stroke-width="10"
          type="circle"
          :percentage="(chartData && +chartData.fiveCommentRatio) || 0"
          color="red"
        />
        <el-progress
          :width="100"
          :stroke-width="10"
          type="circle"
          :percentage="(chartData && +chartData.fourCommentRatio) || 0"
          color="#e6a23c"
        />
        <el-progress
          :width="100"
          :stroke-width="10"
          type="circle"
          :percentage="(chartData && +chartData.threeCommentRatio) || 0"
          color="#f56c6c"
        />
        <el-progress
          :width="100"
          :stroke-width="10"
          type="circle"
          :percentage="(chartData && +chartData.twoCommentRatio) || 0"
          color="#5cb87a"
        />
        <el-progress
          :width="100"
          :stroke-width="10"
          type="circle"
          :percentage="(chartData && +chartData.oneCommentRatio) || 0"
          color="blue"
        />
      </div>
      <el-divider />
      <p class="chartL-b">
        {{ classTime[0] }} 到 {{ classTime[1] }}期间有效评论数 共计{{
          chartData && chartData.count
        }}条
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataChart',
  components: {},
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          allCommentRatio: '4.17',
          commentRatio: '4.17',
          count: 12,
          fiveCommentRatio: '0.69',
          fourCommentRatio: '1.74',
          oneCommentRatio: '0.35',
          threeCommentRatio: '1.04',
          twoCommentRatio: '0.35'
        }
      }
    },
    classTime: {
      type: Array,
      default() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    console.log(this.data)
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.chart-main {
  display: flex;
  padding: 20px 0;
  border: 1px solid #e6e1e1;
  margin: 10px 0 20px 0;

  .chartR {
    width: 30%;
    margin-right: 30px;
    padding-left: 20px;
    .r-box {
      height: 134px;
    }
    .chartR-line {
      height: 40px;
      line-height: 40px;
      .word-t {
        display: inline-block;
        vertical-align: top;
        width: 90px;
        color: darkgrey;
      }
      .percent {
        color: #67c23a;
        font-size: 30px;
      }
    }
    .chartR-b {
      margin-top: 50px;
      color: darkgrey;
    }
  }
  .chartL {
    width: 60%;
    .chartL-title,
    .chartL-con {
      display: flex;
      justify-content: space-around;
    }
    .chartL-b {
      margin-top: 50px;
      color: darkgrey;
    }
    el-progress {
      display: inline-block;
    }
  }
}
</style>
