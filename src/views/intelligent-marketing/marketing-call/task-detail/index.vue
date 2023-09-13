<template>
  <div>
    <div class="app-container">
      <basics-tabs
        :tab-list="tabList"
        :active-tab="activeTab"
        @handleTabClick="handleTabClick"
      />
    </div>

    <div class="app-container statics-bar">
      <div class="title">{{ `${$route.query.taskName} - ${$route.query.status}` }}</div>
      <div>
        <span v-for="v in staticsConfig" :key="v.key">{{ v.label }}：<b>{{ v.value }}</b></span>
      </div>
    </div>

    <component :is="currentCom" />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import TaskData from './components/taskData'
import OperationLog from './components/operationLog'
import BasicsTabs from '@/components/BasicsTabs'
import { tabList, staticsConfig } from './config'

export default {
  name: 'MarketingCallTaskDetail',
  components: { BasicsTabs, OperationLog, TaskData },
  data() {
    return {
      tabList,
      staticsConfig: [...staticsConfig],
      activeTab: 'taskData',
      currentCom: 'taskData'
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.staticsConfig.forEach(v => {
      v.value = this.$route.query[v.key]
    })
  },
  methods: {
    handleTabClick(val) {
      this.currentCom = val
      this.activeTab = val
    }
  }
}
</script>
<style lang="scss" scoped>
.statics-bar {
  .title {
    font-size: 16px;
    color: #272729;
    margin-bottom: 10px;
  }
  span {
    font-size: 14px;
    color: #909399;
    margin-right: 20px
  }
}
</style>
