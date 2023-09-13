<template>
  <div>
    <div class="title-container">
      <basics-title title="营销玩法" line :actions="act" />
    </div>
    <div class="app-container">
      <el-tabs v-model="activeId">
        <el-tab-pane
          v-for="item in darpList"
          :key="item.desc"
          :label="item.desc"
          :name="item.name"
        />
      </el-tabs>
      <loot v-if="activeId==='1'" :key="activeId" :active-id="activeId" />
      <luck-draw v-if="activeId==='2'" :key="activeId" />
    </div>
  </div>
</template>

<script>
import Loot from './loot'
import LuckDraw from './luck-draw'
import act from './actions'

export default {
  name: 'MarketingPlay',
  components: { LuckDraw, Loot },
  data() {
    return {
      act: act({ add: this.add }),
      activeId: '1',
      darpList: [{
        desc: '积分夺宝',
        name: '1'
      },
      {
        desc: '积分抽奖',
        name: '2'
      }]
    }
  },
  created() {
    this.activeId = this.$route.query.id || '1'
  },
  methods: {
    // 新增
    add() {
      const { activeId } = this
      if (activeId === '1') this.$router.push({ path: '/points-mall/create-marketing', query: { type: '新增' }})
      if (activeId === '2') this.$router.push({ path: '/points-mall/luck-draw', query: { type: '新增' }})
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
