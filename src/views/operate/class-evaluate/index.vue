<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="i in tabConfig" :key="i.key" :label="i.label" :name="i.key" />
      <keep-alive>
        <component :is="dynamicCom" />
      </keep-alive>
    </el-tabs>
  </div>
</template>

<script>
import OneByOne from './components/OneByOne'
import SmallClass from './components/SmallClass'
import AI from './components/AI'
import { TabListConfig } from './config'

export default {
  name: 'OperateClassEvaluate',
  components: {
    OneByOne,
    SmallClass,
    AI
  },
  data() {
    return {
      activeName: 'oneByOne',
      tabConfig: TabListConfig
    }
  },
  computed: {
    dynamicCom() {
      const i = this.tabConfig.map(v => v.key).indexOf(this.activeName)
      return [OneByOne, SmallClass, AI][i]
    }
  }
}

</script>
