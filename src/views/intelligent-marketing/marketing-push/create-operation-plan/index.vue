<template>
  <div
    v-loading="loading"
    class="app-container"
  >
    <basics-form
      ref="formRef"
      :forms="forms"
      :loading="loadings._ums_api_sms_api_messagePlatForm_addOrUpdateSmsScenarioConfiguration"
      :actions="formActions"
      @submitForm="onFormSubmit"
      @changeForm="onFormChange"
    >
      <template slot="divider_setting">
        <el-divider content-position="left">设置触发条件</el-divider>
      </template>
      <template slot="startDate">
        <el-form-item label=" " label-width="86px" :rules="[{ required: true, message: '请选择时间！' }]">
          <div v-for="(v, i) in slotForm.triggerDateTimes" :key="i" style="margin: 5px">
            <el-date-picker
              v-model="slotForm.triggerDateTimes[i]"
              :picker-options="triggerDateTimesPickerOptions"
              type="datetime"
              placeholder="选择日期时间"
            />
            <el-button v-if="i === slotForm.triggerDateTimes.length - 1" size="mini" @click="handleAddStartDateList">添加</el-button>
            <el-button v-if="slotForm.triggerDateTimes.length !== 1" size="mini" type="info" @click="slotForm.triggerDateTimes.splice(i, 1)">删除</el-button>
          </div>
        </el-form-item>
      </template>
      <template slot="timeRange">
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择时间！' }]">
          <el-date-picker
            v-model="slotForm.timeRangeVals.timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-select v-model="slotForm.timeRangeVals.triggerDays" multiple placeholder="请选择">
            <el-option v-for="(e, index) in baseData.marketing_week_list" :key="index" :label="e.label" :value="e.value" />
          </el-select>
          <el-time-picker
            v-model="slotForm.timeRangeVals.time"
            placeholder="选择时间"
          />
        </el-form-item>
      </template>
      <template slot="behavior">
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择！' }]">
          <user-group-behavior ref="behaviorRef" :edit-data="triggerRules" :default-config="defaultBehaviorConfig" />
        </el-form-item>
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择！' }]">
          <div>
            <span class="span-label">则</span>
            <el-select v-model="slotForm.triggerTimeABObj.triggerType" style="width: 120px" placeholder="请选择">
              <el-option v-for="(e, index) in baseData.marketing_trigger_time_delay" :key="index" :label="e.label" :value="e.value" />
            </el-select>
            <el-input v-if="slotForm.triggerTimeABObj.triggerType === '2'" v-model="slotForm.triggerTimeABObj.delayTime" placeholder="请输入" style="width: 180px">
              <template slot="append">
                <el-select v-model="slotForm.triggerTimeABObj.opt" style="width: 80px" placeholder="请选择">
                  <el-option v-for="(e, index) in baseData.marketing_trigger_time_delay_list" :key="index" :label="e.label" :value="e.value" />
                </el-select>
              </template>
            </el-input>
            <span class="span-label">对受众用户进行触达</span>
          </div>
        </el-form-item>
      </template>
      <template slot="behaviorAB">
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择！' }]">
          <div>在起止时间内完成用户行为事件满足A</div>
          <user-group-behavior ref="behaviorRef" :edit-data="triggerAB_ARules" :default-config="defaultBehaviorConfig" />
        </el-form-item>
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择！' }]">
          <div>在规定时间内未满足B</div>
          <user-group-behavior ref="behaviorBRef" :edit-data="triggerAB_BRules" :default-config="defaultBehaviorABConfig" />
        </el-form-item>
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择！' }]">
          <div>
            <span class="span-label">则</span>
            <el-select v-model="slotForm.triggerTimeABObj.triggerType" style="width: 120px" placeholder="请选择">
              <el-option v-for="(e, index) in baseData.marketing_trigger_time_delay" :key="index" :label="e.label" :value="e.value" />
            </el-select>
            <el-input v-if="slotForm.triggerTimeABObj.triggerType === '2'" v-model="slotForm.triggerTimeABObj.delayTime" placeholder="请输入" style="width: 180px">
              <template slot="append">
                <el-select v-model="slotForm.triggerTimeABObj.opt" style="width: 80px" placeholder="请选择">
                  <el-option v-for="(e, index) in baseData.marketing_trigger_time_delay_list" :key="index" :label="e.label" :value="e.value" />
                </el-select>
              </template>
            </el-input>
            <span class="span-label">对受众用户进行触达</span>
          </div>
        </el-form-item>
      </template>
      <template slot="triggerLimitTimes">
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择！' }]">
          <span class="span-label">同一用户</span>
          <el-input v-model="slotForm.triggerLimitObj.limitTime" placeholder="请输入" style="width: 170px">
            <template slot="append">
              <el-select v-model="slotForm.triggerLimitObj.opt" placeholder="请选择" style="width: 80px">
                <el-option v-for="(e, index) in baseData.marketing_trigger_limit_list" :key="index" :label="e.label" :value="e.value" />
              </el-select>
            </template>
          </el-input>
          <span class="span-label">最多触发</span>
          <el-input v-model="slotForm.triggerLimitObj.limitCount" placeholder="请输入" style="width: 140px">
            <template slot="append">次</template>
          </el-input>
        </el-form-item>
      </template>
      <template slot="filterTimeS">
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择时间！' }]">
          <el-time-picker
            v-model="slotForm.filterTimeS[0]"
            placeholder="选择时间"
          />
          <span>&nbsp;&nbsp;至&nbsp;&nbsp;</span>
          <el-time-picker
            v-model="slotForm.filterTimeS[1]"
            placeholder="选择时间"
          />
        </el-form-item>
      </template>
      <template slot="divider_select">
        <el-divider content-position="left">选择受众用户</el-divider>
      </template>
      <template slot="userGroup" slot-scope="scope">
        <el-form-item label="用户分群" class="form-item" :prop="scope.form.groupId" :rules="[{ required: true, message: '请选择分群！' }]">
          <el-select v-model="scope.form.groupId" filterable placeholder="请选择" style="width: 300px">
            <template slot="empty">
              <el-empty :image-size="100">
                <el-link @click="$router.push({ path: '/intelligent-marketing/user-group-detail' })">去创建用户分群</el-link>
              </el-empty>
            </template>
            <el-option v-for="v in scope.item.options" :key="v.value" :label="v.label" :value="v.value" />
          </el-select>
        </el-form-item>
      </template>
    </basics-form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import moment from 'moment'
import { cloneDeep, omit, pick } from 'lodash'
import {
  addPlan,
  addUserPath,
  listCategory,
  listGroupDropDown,
  findMarketPushDetailById,
  selectPushMessageTemplateList
} from '@/api/intelligentMarketing'
import { getToken } from '@/utils/auth'
import UserGroupBehavior from './components/userGroupBehavior'
import forms, { formActions } from './form'
import { transferData } from '../index.vue'
import { transformMap, behavior_times_rules, behavior_attr_rules, trigger_time_limit_type } from './components/config'
import { transferTimeToSecond, transferSecondTime } from './utils'

const userId = getToken('userId')
const cname = getToken('cname')

const initSlotForm = {
  timeRangeVals: { // 触发时机-定时重复
    timeRange: '',
    triggerDays: [0],
    time: new Date()
  },
  triggerLimitObj: { // 触发限制
    limitTime: '',
    opt: '4',
    limitCount: ''
  },
  triggerTimeABObj: { // 触发时机-触发AB型-延迟触达
    triggerType: '1',
    opt: '1',
    delayTime: ''
  },
  triggerDateTimes: [''], // 触发时机-定时单次
  filterTimeS: [] // 勿扰时段
}

const defaultBehaviorConfig = {
  defaultVal: {
    actionType: 'do',
    triggerTimeType: 'RANGE'
  },
  comAttrConfig: {
    actionType: {
      disabled: true
    }
  }
}

const defaultBehaviorABConfig = {
  defaultVal: {
    actionType: 'undo',
    triggerTimeType: 'LIMIT'
  },
  comAttrConfig: {
    actionType: {
      disabled: true
    }
  }
}

const businessTypeMap = {
  '101': '1',
  '109': '2',
  '106': '2',
  '113': '100'
}

export default {
  name: 'CreateOperationPlan',
  components: { UserGroupBehavior },
  props: {},
  data() {
    return {
      visiable: true,
      forms,
      formActions: formActions(),
      templateList: [],
      slotForm: cloneDeep(initSlotForm),
      eventId: '', // 防止多次点击提交生成多个重复的eventId
      behaviorForm: '', // 暂存行为规则表单数据，用于判断是否生成新的eventId
      triggerRules: {}, // 行为规则编辑数据
      triggerAB_ARules: {}, // AB型A行为规则编辑数据
      triggerAB_BRules: {}, // AB型B行为规则AA编辑数据
      defaultBehaviorConfig, // 默认行为规则配置
      defaultBehaviorABConfig // B型默认行为规则配置
    }
  },
  computed: {
    ...mapGetters(['loadings', 'baseData']),
    ...mapState(['intelligentMarketing']),
    loading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_sms_api_push_market_list_category ||
          loadings._big_data_client_profile_group_listGroupDropDown ||
          loadings._ums_meixiu_api_sms_api_v2_push_selectMessageTemplateByType ||
          loadings._ums_meixiu_api_sms_api_push_market_add_plan ||
          loadings._big_data_client_profile_group_listEventPropsDropdown ||
          loadings._big_data_client_profile_group_listAllEventDropdownWithBiz ||
          loadings._big_data_client_profile_paths_add ||
          loadings._ums_meixiu_api_sms_api_push_market_plan_findMarketPushDetailById
    },
    triggerDateTimesPickerOptions() {
      const { slotForm: { triggerDateTimes }} = this
      return triggerDateTimes.length
        ? {
          disabledDate(time) {
            return triggerDateTimes.map(v => moment(v).format('YYYY-MM-DD')).includes(moment(time).format('YYYY-MM-DD'))
          }
        }
        : {}
    }
  },
  mounted() {
    this.$nextTick(async () => {
      const { $route: { query: { type, id }}} = this
      await this.handleInitOptions()
      if (type) {
        this.handleCopy(id)
      }
    })
  },
  methods: {
    // 复用
    handleCopy(id) {
      findMarketPushDetailById({ id })
        .then(({ payload }) => {
          const { oneTypeId, twoTypeId, triggerType, businessType, filterStartTime, filterEndTime, triggerDays, triggerTime, startDate, endDate, triggerRules, triggerDateTimes, groupId, delayTime, limitTime, limitCount } = payload
          const recoveryData = {
            ...pick(payload, ['name', 'oneTypeId', 'twoTypeId', 'templateId', 'triggerDateTimes', 'groupId']),
            triggerType: triggerType + '',
            businessType: businessType + '',
            filterTime: filterStartTime && filterEndTime ? '1' : '0',
            oneTypeId: twoTypeId ? [oneTypeId + '', twoTypeId + ''] : [oneTypeId + ''],
            notificationStypeType: groupId ? '1' : '0',
            triggerLimit: +limitTime === 0 ? '0' : '1'
          }
          const slotForm = cloneDeep(initSlotForm)

          // console.log('triggerRules', triggerRules)
          // 触发时机
          if (+triggerType === 2) {
            slotForm.triggerDateTimes = triggerDateTimes ? triggerDateTimes.split(',').map(v => moment(v)) : []
          } else if (+triggerType === 3) {
            slotForm.timeRangeVals = {
              timeRange: [moment(startDate), moment(endDate)],
              triggerDays: triggerDays.split(','),
              time: moment(triggerTime)
            }
          } else if (+triggerType === 4 && triggerRules) {
            this.behaviorForm = triggerRules
            this.triggerRules = JSON.parse(triggerRules).events.events[0]
          } else if (+triggerType === 5 && triggerRules) {
            this.behaviorForm = triggerRules
            const rules = JSON.parse(triggerRules).events.events
            this.triggerAB_ARules = rules[0]
            this.triggerAB_BRules = rules[1]

            // 延迟触达
            if (+delayTime === 0) {
              slotForm.triggerTimeABObj.triggerType = '1'
            } else {
              const { time, opt } = transferSecondTime(+delayTime)
              slotForm.triggerTimeABObj = {
                triggerType: '2',
                opt,
                delayTime: time
              }
            }
          }

          // 勿扰时段处理
          if (recoveryData.filterTime === '1') {
            slotForm.filterTimeS = [moment(filterStartTime, 'HH:mm'), moment(filterEndTime, 'HH:mm')]
          }

          // 触发限制-触发多次
          if (+limitTime > 0) {
            const { time, opt } = transferSecondTime(+limitTime)
            slotForm.triggerLimitObj = {
              limitTime: time,
              opt,
              limitCount
            }
          }

          console.log('', recoveryData.triggerLimit, triggerType)
          this.slotForm = slotForm
          this.$refs.formRef.recoveryForm(recoveryData)
          this.$refs.formRef.set({
            type: 'visible',
            data: { triggerLimitTimes: !!+recoveryData.triggerLimit && [4, 5].includes(+triggerType) }
          })
        })
    },
    handleAddStartDateList() {
      if (this.slotForm.triggerDateTimes.length < 5) {
        this.slotForm.triggerDateTimes.push('')
      } else {
        this.$message.error('最多添加5条！')
      }
    },
    handleInitOptions() {
      return new Promise((resolve) => {
        Promise.all([selectPushMessageTemplateList(), listGroupDropDown({ })])
          .then(([{ payload }, { result }]) => {
            payload.forEach(v => {
              v.label = v.templateId
              v.value = v.templateId
            })
            result.forEach(v => {
              v.label = v.groupCode + '-' + v.groupName
              v.value = v.groupCode
            })

            this.templateList = payload
            this.$nextTick(() => {
              this.$refs.formRef.set({
                type: 'options',
                data: {
                  businessType: this.intelligentMarketing.pushDinc.listBusinessType,
                  templateId: payload,
                  groupId: result
                }
              })
            })
            resolve()
          })
      })
    },
    async onFormSubmit(values) {
      let payload = cloneDeep(values)
      const { slotForm: { timeRangeVals, triggerDateTimes, filterTimeS, triggerLimitObj, triggerTimeABObj }} = this

      // 触发时机联动时间处理
      if (payload.triggerType === '2') {
        payload.triggerDateTimes = triggerDateTimes.map(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))
      } else if (payload.triggerType === '3') {
        payload.startDate = moment(timeRangeVals.timeRange[0]).format('YYYY-MM-DD')
        payload.endDate = moment(timeRangeVals.timeRange[1]).format('YYYY-MM-DD')
        payload.triggerTime = moment(timeRangeVals.time).format('HH:mm:ss')
        payload.triggerDays = timeRangeVals.triggerDays.join()
      } else if (['4', '5'].includes(payload.triggerType)) {
        let behaviorForm = this.$refs.behaviorRef.getBehaviorForm()
        const pathPayload = {
          bizId: businessTypeMap[payload.businessType] || '1',
          rules: JSON.stringify(behaviorForm),
          pathsName: payload.name,
          orderFlag: 0, // 无序
          cid: userId,
          cname: cname
        }

        const { events: { events }} = behaviorForm
        const { eventName, eventCountProp, actionType, dateTimeRangeValue: { beginTime, endTime }} = events[0]
        let planEvents = `${transformMap(behavior_attr_rules)[actionType]}${eventName}且${transformMap(behavior_times_rules)[eventCountProp.opCode]}${eventCountProp.value}次`

        // 触发AB型有两个行为规则控件，需要把数据组装到一起生成一个eventId
        if (payload.triggerType === '5') {
          const behaviorBForm = this.$refs.behaviorBRef.getBehaviorForm()
          console.log('behaviorBForm', behaviorBForm)
          const { events: { events: [{ windowPeriod, windowUnit, actionType, eventName }] }} = behaviorBForm

          behaviorForm.events.events = behaviorForm.events.events.concat(behaviorBForm.events.events)
          planEvents += `__${windowPeriod}${transformMap(trigger_time_limit_type)[windowUnit]}内${transformMap(behavior_attr_rules)[actionType]}${eventName}`
          behaviorForm = {
            ...behaviorForm,
            beginTime: moment(beginTime).format('YYYY-MM-DD'),
            endTime: moment(endTime).format('YYYY-MM-DD'),
            windowPeriod,
            windowUnit
          }
          pathPayload.orderFlag = 1 // 有序
          // 延迟触达
          pathPayload.rules = JSON.stringify(behaviorForm)
        }
        // console.log('behaviorForm', behaviorForm)
        // return

        // 触发A && 触发AB都支持延迟触发
        payload.delayTime = triggerTimeABObj.triggerType === '2' ? transferTimeToSecond(triggerTimeABObj.delayTime, triggerTimeABObj.opt) : 0

        // 用户路径
        if (!this.eventId || JSON.stringify(behaviorForm) !== this.behaviorForm) { // 防止相同数据多次点击提交生成多个eventId
          const { result: { id: eventId }} = await addUserPath(pathPayload)
          this.eventId = eventId
          this.behaviorForm = JSON.stringify(behaviorForm)
        }

        // 触发限制
        if (payload.triggerLimit === '1') {
          payload.limitTime = transferTimeToSecond(triggerLimitObj.limitTime, triggerLimitObj.opt)
          payload.limitCount = triggerLimitObj.limitCount
        } else {
          payload.limitTime = 0
          payload.limitCount = 1
        }

        payload = {
          ...payload,
          eventId: this.eventId,
          planEvents,
          triggerRules: JSON.stringify(behaviorForm),
          startDate: moment(beginTime).format('YYYY-MM-DD'),
          endDate: moment(endTime).format('YYYY-MM-DD')
        }
      }

      // 分类参数处理
      if (payload.oneTypeId.length === 1) {
        const currentType = this.oneTypeList.filter(v => v.value === payload.oneTypeId[0])[0]
        payload.oneTypeId = payload.oneTypeId[0]
        payload.oneType = currentType.name
      } else if (payload.oneTypeId.length === 2) {
        const currentType = this.oneTypeList.filter(v => v.id === +payload.oneTypeId[0])[0]
        const currentTwoType = currentType.children.filter(v => v.id === +payload.oneTypeId[1])[0]
        payload.twoTypeId = payload.oneTypeId[1]
        payload.twoType = currentTwoType.name
        payload.oneTypeId = payload.oneTypeId[0]
        payload.oneType = currentType.name
      }
      // 勿扰时段处理
      if (payload.filterTime === '1') {
        const [filterStartTime, filterEndTime] = filterTimeS
        payload.filterStartTime = moment(filterStartTime).format('HH:mm')
        payload.filterEndTime = moment(filterEndTime).format('HH:mm')
      }

      payload.operationId = userId
      payload.operationName = cname

      omit(payload, ['notificationStypeType', 'messageContent', 'applyName', 'undefined', 'filterTime', 'filterTimeS', 'behavior', 'undefined'])

      // console.log('payload', payload)
      // return

      addPlan(payload)
        .then(() => {
          this.$message.success('创建运营计划成功～')
          this.$router.push({ path: '/intelligent-marketing/marketing-push' })
        })
    },
    onFormChange(newValues, oldValues) {
      // console.log('newValues oldValues', newValues, oldValues)
      // 触发时机联动
      if (newValues.triggerType !== oldValues.triggerType && newValues.triggerType) {
        const visObj = { startDate: false, timeRange: false, behavior: false, behaviorAB: false, triggerLimit: false }
        const notificationStypeTypeOptions = [
          { label: '不限', value: '0', disabled: true },
          { label: '用户分群推送', value: '1' }
        ]
        if (newValues.triggerType === '2') {
          visObj.startDate = true
        } else if (newValues.triggerType === '3') {
          visObj.timeRange = true
        } else if (newValues.triggerType === '4') {
          visObj.behavior = true
          visObj.triggerLimit = true
          notificationStypeTypeOptions[0].disabled = false
        } else if (newValues.triggerType === '5') {
          visObj.behaviorAB = true
          visObj.triggerLimit = true
          notificationStypeTypeOptions[0].disabled = false
        }
        this.$nextTick(() => {
          this.$refs.formRef.set({
            type: 'visible',
            data: visObj
          })
          this.$refs.formRef.set({
            type: 'options',
            data: { notificationStypeType: notificationStypeTypeOptions }
          })
        })
      }

      // 分群列表是否展示
      if (newValues.notificationStypeType !== oldValues.notificationStypeType && newValues.notificationStypeType) {
        this.$nextTick(() => {
          this.$refs.formRef.set({
            type: 'visible',
            data: {
              groupId: newValues.notificationStypeType === '1'
            }
          })
        })
      }

      // 分类联动产品线
      if (newValues.businessType !== oldValues.businessType && newValues.businessType) {
        listCategory({ businessType: newValues.businessType })
          .then(res => {
            const treeData = transferData(res.payload)
            this.oneTypeList = treeData
            this.$nextTick(() => {
              this.$refs.formRef.set({
                type: 'options',
                data: { oneTypeId: treeData }
              })
            })
          })
      }

      // 模板id联动：模板内容及业务线回显
      if (newValues.templateId !== oldValues.templateId && newValues.templateId) {
        const currentTemp = this.templateList.filter(v => v.templateId === newValues.templateId)?.[0]
        if (currentTemp) {
          this.$nextTick(() => {
            this.$refs.formRef.set({
              type: 'defaultVal',
              data: { applyName: this.intelligentMarketing.pushDincMap.listApply_map[currentTemp.applyId], messageContent: currentTemp.messageContent }
            })
          })
        }
      }

      // 勿扰时段联动：开启 关闭
      if (newValues.filterTime !== oldValues.filterTime && newValues.filterTime) {
        this.$nextTick(() => {
          this.$refs.formRef.set({
            type: 'visible',
            data: { filterTimeS: !!+newValues.filterTime }
          })
        })
      }

      // 触发限制-可触发多次
      if (newValues.triggerLimit !== oldValues.triggerLimit && newValues.triggerLimit) {
        this.$nextTick(() => {
          this.$refs.formRef.set({
            type: 'visible',
            data: { triggerLimitTimes: !!+newValues.triggerLimit && [4, 5].includes(+newValues.triggerType) }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-item {
    ::v-deep .el-form-item__label {
      display: flex;
      width: 86px !important;
      margin-right: 10px;
      align-items: center;
      justify-content: flex-end;
      align-self: flex-start;
      line-height: 1.3;
      min-height: 36px;
      vertical-align: middle;
      flex-shrink: 0;
    }
  }
.span-label {
  margin: 0 5px;
  color: #666
}
</style>
