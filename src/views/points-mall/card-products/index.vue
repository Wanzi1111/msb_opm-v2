<template>
  <div>
    <div class="title-container">
      <basics-title title="虚拟商品" line :actions="basicsActionConfig" />
    </div>
    <div class="app-container">
      <el-tabs v-model="activeState">
        <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name" />
      </el-tabs>
      <empty v-if="!~~activeState" />
      <real v-if="~~activeState" />
    </div>
  </div>
</template>

<script>
import BasicsTitle from '@/components/BasicsTitle'
import Empty from './empty/index.vue'
import Real from './real/index.vue'
import { BasicsActionConfigFn } from './config'

export default {
  name: '',
  components: { BasicsTitle, Empty, Real },
  data() {
    return {
      activeState: '0',
      tabs: [
        { label: '虚拟商品', name: '0' },
        { label: '实物商品', name: '1' }
      ],
      basicsActionConfig: BasicsActionConfigFn({
        addGood: this.addGood
      })
    }
  },
  created() {
    this.activeState = this.$route.query?.type ? this.$route.query?.type + '' : '0'
  },
  methods: {
    // 新增商品
    addGood() {
      const path = !~~this.activeState ? 'card-products/edit' : 'real-edit'
      this.$router.push({
        path,
        query: { proType: 0 }
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
