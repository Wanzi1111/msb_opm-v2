<template>
  <div v-loading="loadings._ums_meixiu_api_sms_api_push_market_plan_config">
    <el-divider content-position="left">计划信息</el-divider>
    <basics-descriptions :column="2" :config="plan_message" :data-sourse="configData">
      <template slot="groupId" slot-scope="scope">
        <el-link style="margin-top: -2px" :href="scope.item.value && scope.item.value.link || ''" target="_blank">{{ scope.item.value ? scope.item.value.linkText : '' }}</el-link>
      </template>
      <template slot="startDate" slot-scope="scope">
        <div v-if="configData.triggerType === 2 && configData.triggerDateTimes">
          <div v-for="v in (scope.item.value.split(','))" :key="v">
            <span>{{ v }}</span>
          </div>
        </div>
        <div v-else>
          {{ scope.item.value }}
        </div>
      </template>
    </basics-descriptions>

    <el-divider content-position="left">PUSH模板信息</el-divider>
    <basics-descriptions :column="2" :config="push_message">
      <template slot="openUrl" slot-scope="scope">
        <el-link style="margin-top: -2px" :href="scope.item.value" target="_blank">{{ scope.item.value }}</el-link>
      </template>
      <template slot="remindType" slot-scope="scope">
        <el-tag v-for="v in scope.item.value" :key="v" style="margin-right: 5px">
          {{ v }}
        </el-tag>
      </template>
    </basics-descriptions>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { mapGetters, mapState } from 'vuex'
import { getMarketingPlanConfig } from '@/api/intelligentMarketing'
import BasicsDescriptions from '@/components/BasicsDescriptions'
import { transferTriggerTime } from '@/views/intelligent-marketing/marketing-push/columns'
import { formatTime2 } from '@/utils/index'
import { plan_message, push_message, rootListBusinessTypeMap } from './config'

export const statusTypeMap = ['info', 'success', '', 'danger']
const offLineTimeMap = {
  0: '0分钟-不设置离线',
  60: '1分钟',
  600: '10分钟',
  3600: '1小时',
  10800: '3小时',
  43200: '12小时',
  86400: '1天-默认',
  345600: '5天',
  691200: '10天-最长'
}

export default {
  name: 'MarketingPushConfig',
  components: { BasicsDescriptions },
  data() {
    return {
      plan_message: cloneDeep(plan_message),
      push_message: cloneDeep(push_message),
      configData: {}
    }
  },
  computed: {
    ...mapGetters(['loadings', 'baseDataMap']),
    ...mapState(['intelligentMarketing'])
  },
  watch: {},
  mounted() {
    const {
      $route: { query: { id }},
      intelligentMarketing: { pushDincMap },
      plan_message,
      push_message,
      baseDataMap
    } = this
    getMarketingPlanConfig({ id })
      .then(({ payload: { pushMarketingPlan, pushMessageTemplate }}) => {
        plan_message.forEach(v => {
          if (v.key === 'businessType') {
            v.value = pushDincMap.listBusinessType_map[pushMarketingPlan.businessType]
          } else if (v.key === 'oneType') {
            v.value = `${pushMarketingPlan.oneType} / ${pushMarketingPlan.twoType}`
          } else if (v.key === 'groupId') {
            v.value = {
              link: `/intelligent-marketing/user-group?bizId=${rootListBusinessTypeMap[pushMarketingPlan.businessType] || '1'}&groupCode=${pushMarketingPlan.groupId}&type=linkSearch`,
              linkText: pushMarketingPlan.groupId
            }
          } else if (v.key === 'triggerType') {
            const { triggerType, triggerDays } = pushMarketingPlan
            let text = baseDataMap.marketing_intrigger_type_list_map[triggerType]
            if (triggerType === 3) {
              text = triggerDays
                .split(',')
                .map(v => baseDataMap.marketing_week_list_map[v])
                .toString()
            }
            v.value = text
          } else if (v.key === 'startDate') {
            // 需要优化下
            v.value = transferTriggerTime(pushMarketingPlan, 'DETAIL')
          } else {
            v.value = pushMarketingPlan[v.key]
          }
        })
        const messageConfig = JSON.parse(pushMessageTemplate.messageConfig)

        console.log('pushMessageTemplate.messageConfig ', messageConfig)
        push_message.forEach(v => {
          if (v.key === 'openUrl') {
            v.value = messageConfig[v.key]
          } else if (v.key === 'offLineTime') {
            v.value = offLineTimeMap[messageConfig.offLineTime]
          } else if (v.key === 'applyId') {
            v.value = pushDincMap.listApply_map[pushMessageTemplate.applyId]
          } else if (v.key === 'supplierId') {
            v.value = pushDincMap.listSupplierNameType_map[pushMessageTemplate.supplierId]
          } else if (v.key === 'silentStartTime') {
            v.value = `${messageConfig.silentStartTime && formatTime2(messageConfig.silentStartTime)} - ${messageConfig.silentEndTime && formatTime2(messageConfig.silentEndTime)}（仅IOS设备生效）`
          } else if (v.key === 'remindType') {
            v.value = messageConfig?.remindType?.split(',').map(v => pushDincMap.listAndroidRemindType_map[v])
          } else if (v.key === 'deviceTypes') {
            v.value = messageConfig?.deviceTypes
          } else {
            v.value = pushMessageTemplate[v.key]
          }
        })

        this.plan_message = plan_message
        this.push_message = push_message
        this.configData = { ...pushMarketingPlan }
      })
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
