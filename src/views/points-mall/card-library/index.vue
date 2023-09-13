<!--
 * @Author: ZhangYeLei
 * @Date: 2022-03-25 17:40:48
 * @LastEditTime: 2022-04-07 18:12:19
 * @LastEditors: ZhangYeLei
-->
<template>
  <div>
    <div class="title-container">
      <basics-title title="卡卷库" line />
    </div>
    <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="tab in tabList" :key="tab.name" :label="tab.label" :name="tab.name" />
      </el-tabs>
      <component :is="currentView" />
    </div>
  </div>
</template>

<script>
import OverseasGoods from './overseasGoods/index.vue'
import DomesticGoods from './domesticGoods/index.vue'

const tabList = [
  { label: '国内商品', name: '国内商品' },
  { label: '海外商品', name: '海外商品' }
]

export default {
  components: { OverseasGoods, DomesticGoods },
  data() {
    return {
      tabList: tabList,
      activeName: '国内商品',
      currentView: DomesticGoods
    }
  },
  methods: {
    handleClick() {
      this.currentView = this.activeName === '国内商品' ? DomesticGoods : OverseasGoods
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
