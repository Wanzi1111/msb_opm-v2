<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="推荐试听奖励" name="recommend">
        <recommend v-if="activeName === 'recommend'" />
      </el-tab-pane>
      <el-tab-pane label="分享海报奖励" name="share">
        <share v-if="activeName === 'share'" />
      </el-tab-pane>
      <el-tab-pane label="排行榜奖励" name="ranking">
        <ranking v-if="activeName === 'ranking'" />
      </el-tab-pane>
      <el-tab-pane label="月度转介绍" name="introduce">
        <introduce v-if="activeName === 'introduce'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Recommend from './components/Recommend'
import Share from './components/Share'
import Ranking from './components/Ranking'
import Introduce from './components/Introduce'

export default {
  name: 'PrizeSet',
  components: { Recommend, Share, Ranking, Introduce },
  data() {
    return {
      activeName: this.$route.query.tab || 'recommend'
    }
  },
  watch: {
    activeName(val = 'recommend') {
      this.$router.replace(`/activity-center/set?tab=${val}`)
    }
  }
}
</script>
