<template>
  <div class="app-container">
    <div>
      <div class="title-bar">
        <span>{{ titleData.name }}</span>
        <el-tag :type="titleData.statusTagType">{{ titleData.status }}</el-tag>
      </div>
      <div class="info-bar">
        <span><i class="el-icon-magic-stick" /> {{ titleData.businessType }}</span>
        <span><i class="el-icon-position" /> {{ titleData.triggerType }}</span>
        <span><i class="el-icon-date" /> {{ titleData.date }}</span>
      </div>
    </div>

    <basics-tabs
      :tab-list="tabList"
      :active-tab="activeTab"
      @handleTabClick="handleTabClick"
    />

    <component :is="currentCom" @handleTitleData="handleTitleData" />

    <template>
      <!-- <dialog-marketing-push-classify v-if="dialogType === 'editMarketingPushClassify'" @handleDialogVis="handleDialogVis" /> -->
    </template>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import { transferTriggerTime } from '@/views/intelligent-marketing/marketing-push/columns'
import { tabList } from './config'
import DataDetails from './components/data-details'
import ScheduleConfiguration from './components/schedule-configuration'
import ViewLog from './components/view-log'

export default {
  name: 'MarketingPushDetail',
  components: { DataDetails, ScheduleConfiguration, ViewLog },
  data() {
    return {
      tabList,
      titleData: {
        name: '',
        businessType: '',
        status: '',
        statusTagType: '',
        triggerType: '',
        triggerTagType: '',
        date: ''
        // businessType: '',
      },
      activeTab: 'DataDetails',
      currentCom: 'DataDetails'
    }
  },
  computed: {
    ...mapGetters(['loadings', 'baseDataMap']),
    ...mapState(['intelligentMarketing'])
  },
  mounted() {
  },
  methods: {
    handleTabClick(com) {
      this.currentCom = com
      this.activeTab = com
    },
    handleTitleData(data) {
      const { triggerType, businessType, status, name } = data
      const { intelligentMarketing: { pushDincMap }} = this
      const statusList = ['已停用', '运行中', '已结束']
      const statusMap = ['warning', '', 'success']
      this.titleData = {
        name,
        triggerType: this.baseDataMap.marketing_intrigger_type_list_map[triggerType],
        businessType: pushDincMap.listBusinessType_map[businessType],
        date: transferTriggerTime({ ...data, triggerType: +data.triggerType }, 'DETAIL'),
        status: statusList[status],
        statusTagType: statusMap[status]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.title-bar {
  color: rgba(0,0,0,0.85);
  font-weight: 600;
  font-size: 18px;
  line-height: 36px
}
.info-bar {
  font-size: 12px;
  color: #909399;
  margin: 10px 0;
  span {
    margin-right: 10px;
  }
}
</style>
