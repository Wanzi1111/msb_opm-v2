<template>
  <div
    v-loading="appLoading"
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
      <template slot="divider_basics_info">
        <el-divider content-position="left">基础信息</el-divider>
      </template>
      <template slot="schedule">
        <el-form-item class="form-item-slot" :rules="[{ required: true, message: '不能为空！' }]">
          <time-select :time-type="0" :form="slotForm" v-bind.sync="slotForm" />
        </el-form-item>
      </template>
      <template slot="haltTime">
        <el-form-item class="form-item-slot" :rules="[{ required: true, message: '不能为空！' }]">
          <time-select :time-type="1" :form="slotForm" v-bind.sync="slotForm" />
        </el-form-item>
      </template>
      <template slot="jobSlot">
        <el-form-item label="第三方任务ID" class="form-item" :rules="[{ required: true, message: '请选择时间！' }]">
          <el-button v-if="!slotForm.jobId" @click="handleCheckTaskId('check')">
            选择任务ID
          </el-button>
          <div v-else>
            <span>{{ slotForm.jobId }}</span>
            <el-button :disabled="!!$route.query.id && !$route.query.copy" @click="handleCheckTaskId('check')">
              重新选择
            </el-button>
          </div>
        </el-form-item>
      </template>

      <template slot="divider_call_user_rule">
        <el-divider content-position="left">呼叫用户规则</el-divider>
      </template>
      <template slot="triggerType_slot0">
        <el-form-item label="任务ID" class="form-item" :rules="[{ required: true, message: '请输入任务ID！' }]">
          <el-input v-model="slotForm.unrepeated.filterJobIds" style="width: 300px" />
          <div class="note channel-bar" style="margin-top:10px">
            <i class="el-icon-info" />
            <span>任务ID,多个请用英文，隔开</span>
          </div>
        </el-form-item>
      </template>
      <template slot="triggerType_slot1">
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择时间！' }]">
          <el-input v-model="slotForm.unrepeated.baseValue" placeholder="请输入内容" style="width: 300px">
            <el-select slot="prepend" v-model="slotForm.unrepeated.operator" placeholder="请选择" style="width: 120px">
              <el-option v-for="v in intelligentMarketing.ivrDinc.operatorList || []" :key="v.value" v-bind="v" />
            </el-select>
            <el-button slot="append">天</el-button>
          </el-input>
        </el-form-item>
      </template>
      <template slot="triggerType_slot2">
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择时间！' }]">
          <el-input v-model="slotForm.answeredTime.baseValue" placeholder="请输入内容" style="width: 300px">
            <el-select slot="prepend" v-model="slotForm.answeredTime.operator" placeholder="请选择" style="width: 120px">
              <el-option v-for="v in intelligentMarketing.ivrDinc.operatorList || []" :key="v.value" v-bind="v" />
            </el-select>
            <el-button slot="append">天</el-button>
          </el-input>
        </el-form-item>
      </template>
      <template slot="triggerType_slot3">
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择时间！' }]">
          <el-input v-model="slotForm.noAnsweredCount.baseValue" placeholder="请输入内容" style="width: 300px">
            <el-select slot="prepend" v-model="slotForm.noAnsweredCount.operator" placeholder="请选择" style="width: 120px">
              <el-option v-for="v in intelligentMarketing.ivrDinc.operatorList || []" :key="v.value" v-bind="v" />
            </el-select>
            <el-button slot="append">次</el-button>
          </el-input>
        </el-form-item>
      </template>

      <template slot="divider_sms_setting">
        <el-divider content-position="left">短信设置</el-divider>
      </template>
      <template slot="handUpSMSSlot">
        <el-form-item label="挂机短信" class="form-item" :rules="[{ required: true }]">
          <div v-for="(v, i) in slotForm.hangUpSMS" :key="i">
            <div class="channel-bar">
              <div>
                <el-radio-group v-model="v.smsStatus">
                  <el-radio :label="1">需要发送</el-radio>
                  <el-radio :label="0">无需发送</el-radio>
                </el-radio-group>
              </div>
              <div v-if="v.smsStatus === 1" style="margin: 10px 0">
                <el-select v-model="v.sceneCode" filterable placeholder="请选择场景模板" style="width: 300px">
                  <el-option v-for="val in smsTempList" :key="val.value" v-bind="val" />
                </el-select>
                <el-button v-if="i === slotForm.hangUpSMS.length - 1" size="mini" @click="handleAddHangUpSMS">添加</el-button>
                <el-button v-if="slotForm.hangUpSMS.length !== 1" size="mini" type="info" @click="handleDelHangUpSMS(i)">删除</el-button>
              </div>
            </div>
          </div>
        </el-form-item>
      </template>
      <template slot="reminderSMSSlot">
        <el-form-item label="提醒短信" class="form-item" :rules="[{ required: true }]">
          <div v-for="(v, i) in slotForm.reninderSMS" :key="i">
            <div class="channel-bar">
              <div>
                <el-radio-group v-model="v.smsStatus">
                  <el-radio :label="1">需要发送</el-radio>
                  <el-radio :label="0">无需发送</el-radio>
                </el-radio-group>
              </div>
              <div v-if="v.smsStatus === 1" style="margin: 10px 0">
                <el-select v-model="v.sceneCode" filterable placeholder="请选择场景模板" style="width: 300px">
                  <el-option v-for="val in smsTempList" :key="val.value" v-bind="val" />
                </el-select>
                <el-button v-if="i === slotForm.reninderSMS.length - 1" size="mini" @click="handleAddReninderSMS">添加</el-button>
                <el-button v-if="slotForm.reninderSMS.length !== 1" size="mini" type="info" @click="handleDelReninderSMS(i)">删除</el-button>
              </div>
            </div>
          </div>
        </el-form-item>
      </template>
    </basics-form>

    <template>
      <dialog-third-party-task-platform v-if="dialogType === 'thirdPartyTaskPlatform'" :job-id="dialogData" :business-line="''+businessLine" @handleDialogVis="handleDialogVis" />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import DialogThirdPartyTaskPlatform from './components/dialogThirdPartyTaskPlatform'
import moment from 'moment'
import { cloneDeep, omit } from 'lodash'
import {
  selectSmsScenarioConfigurationList,
  listGroupDropDown,
  ivrSave,
  ivrDetail
} from '@/api/intelligentMarketing'
import forms, { packageList, formActions } from './form'
import TimeSelect from './components/timeSelect'

// 挂机短信
const initHangUpSMS = { smsStatus: 1, operator: 'gt', baseValue: 30, sceneCode: '', smsType: 1 }
// 提醒短信
const initReninderSMS = { smsStatus: 1, operator: 'gt', baseValue: ['', 30], sceneCode: '', smsType: 2 } // baseValue[0]: 套餐id，baseValue[1]: 通话时长

export default {
  name: 'CreateOperationPlan',
  components: { DialogThirdPartyTaskPlatform, TimeSelect },
  props: {},
  data() {
    return {
      packageList,
      visiable: true,
      forms,
      dateForm: {}, // 日期时间转换容器
      slotForm: {
        scheduleType: '0',
        scheduleTime: null,
        scheduleTimeTo: null,
        haltTimeFrom: null,
        haltTimeTo: null,
        hangUpSMS: [cloneDeep(initHangUpSMS)],
        reninderSMS: [cloneDeep(initReninderSMS)],
        jobId: '',
        // 导入过本任务
        unrepeated: {
          baseValue: '15',
          operator: 'le',
          ruleCode: 'unrepeated'
        },
        // 已接通用户距当前时间
        answeredTime: {
          baseValue: '15',
          operator: 'le',
          ruleCode: 'answeredTime'
        },
        // 呼叫次数-接通次数
        noAnsweredCount: {
          baseValue: '15',
          operator: 'le',
          ruleCode: 'noAnsweredCount'
        }
      },
      formActions: formActions(),
      dialogType: '',
      dialogData: '',
      smsTempList: [], // 短信模板
      businessLine: 0
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    appLoading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_out_m_ivr_detail ||
        loadings._big_data_client_profile_group_listGroupDropDown ||
        loadings._ums_meixiu_api_sms_api_web_message_platform_sms_scenario_configuration_list
    },
    ...mapState(['intelligentMarketing'])
  },
  mounted() {
    this.$nextTick(() => {
      this.handleInitOptions()
      this.getSMSScenarioConfigurationList()
      // 防止用户编辑后再创建导致disabled状态未更新
      this.$refs.formRef && this.$refs.formRef.set({
        type: 'attr',
        data: { taskName: { disabled: false }, startDate: { disabled: false }}
      })
    })
    if (this.$route.query.id) {
      this.ivrDetail()
    }
    this.businessLine = this.$route.query.businessLine
  },
  methods: {
    // 时间 格式化
    timeFormat(times, type) {
      // times： 时间对象。type：情况处理 0回显，1新增
      Object.keys(times).forEach(item => {
        this.dateForm[item] = !times[item] ? '' : type ? moment(times[item]).format('YYYY-MM-DD') : moment(times[item]).unix() * 1000
      })
    },
    ivrDetail() {
      const { id, copy } = this.$route.query
      ivrDetail({ id })
        .then(({ payload }) => {
          const { businessLine, ruleList, smsList, startDate, endDate, haltDateFrom, haltDateTo, scheduleType } = payload
          this.timeFormat({ startDate, endDate, haltDateFrom, haltDateTo }, 0)
          this.businessLine = businessLine
          // 呼叫规则、短信规则表单特殊处理
          const ruleMap = {}
          const hangUpSMS = []
          const reninderSMS = []
          ruleList.forEach(v => {
            ruleMap[v.ruleCode] = !copy ? v : { ...v, id: null }
          })
          smsList.forEach(v => {
            if (v.smsType === 1) {
              hangUpSMS.push(v)
            } else {
              v.remindType = v.remindType + ''
              // 兼容历史数据
              v.operator = v.operator || 'gt'
              reninderSMS.push(v)
            }
          })
          // 构造表单回显form
          const recoveryForm = {
            ...payload,
            ...this.slotForm,
            ...this.dateForm,
            businessLine,
            unrepeatedRuleCode: ruleMap.unrepeated.filterJobIds ? '0' : ruleMap.unrepeated.ruleStatus + '',
            answeredTimeRuleCode: ruleMap.answeredTime.ruleStatus + '',
            noAnsweredCountRoleCode: ruleMap.noAnsweredCount.ruleStatus + '',
            filterJobIds: ruleMap.unrepeated.filterJobIds
          }
          // 构造自定义回显form
          const slotForm = {
            // group: { groupCode, groupRootId, groupTreeId },
            hangUpSMS,
            scheduleType: scheduleType + '',
            reninderSMS,
            ...ruleMap
          }
          this.$refs.formRef.recoveryForm(recoveryForm)
          this.$refs.formRef.set({
            type: 'attr',
            data: { taskName: { disabled: !copy }, startDate: { disabled: !copy }}
          })
          this.slotForm = { ...payload, ...slotForm }
        })
    },
    // 初始化options
    handleInitOptions() {
      const { intelligentMarketing: { ivrDinc: { businessLineList, callSortList, supplierList }}} = this
      // 分群
      listGroupDropDown({ })
        .then(({ result }) => {
          result.forEach(v => {
            v.label = v.groupCode + '-' + v.groupName
            v.value = v.groupCode
          })
          this.$refs.formRef.set({
            type: 'options',
            data: {
              businessLine: businessLineList,
              exportBusinessLine: businessLineList,
              callSort: callSortList,
              supplier: supplierList,
              groupCode: result
            }
          })
        })
    },
    // 获取营销短信模板列表
    getSMSScenarioConfigurationList() {
      selectSmsScenarioConfigurationList({ pageNum: 1, pageSize: 999 })
        .then(({ payload: { list }}) => {
          this.smsTempList = list.map(v => ({ label: `${v.scenarioId}-${v.scenarioName}`, value: v.scenarioId }))
        })
    },
    // 添加一条挂机短信规则
    handleAddHangUpSMS() {
      this.slotForm.hangUpSMS.push(cloneDeep(initHangUpSMS))
    },
    // 删除一条挂机短信规则
    handleDelHangUpSMS(i) {
      this.slotForm.hangUpSMS.splice(i, 1)
    },
    // 添加一条提醒短信规则
    handleAddReninderSMS() {
      this.slotForm.reninderSMS.push(cloneDeep(initReninderSMS))
    },
    // 删除一条提醒短信规则
    handleDelReninderSMS(i) {
      this.slotForm.reninderSMS.splice(i, 1)
    },
    onFormSubmit(values) {
      const { id, copy } = this.$route.query
      // 优先处理时间格式
      const { startDate, endDate, haltDateFrom, haltDateTo } = values
      this.timeFormat({ startDate, endDate, haltDateFrom, haltDateTo }, 1)
      // 整合数据
      let payload = cloneDeep({ ...this.slotForm, ...values, ...this.dateForm })
      payload.reninderSMS.forEach(v => { v.baseValue = v.baseValue.toString() })
      payload.hangUpSMS.forEach(v => { v.baseValue = v.baseValue.toString() })
      const smsList = [...payload.hangUpSMS, ...payload.reninderSMS]
      smsList.forEach(res => {
        if (res.baseValue) {
          res.baseValue = res.baseValue.split(',')[0] || res.baseValue.split(',')[1]
        }
        // 如果是复用，则 smsList 中不能携带id字段 服务端要求的——_——||
        if (copy) delete res.id
      })
      payload = {
        ...payload,
        id: !copy && id ? id : null,
        // ...payload.group,
        // 呼叫规则
        ruleList: [
          { ...payload.unrepeated, ruleStatus: '1' },
          { ...payload.answeredTime, ruleStatus: payload.answeredTimeRuleCode },
          { ...payload.noAnsweredCount, ruleStatus: payload.noAnsweredCountRoleCode }
        ],
        // 短信规则
        smsList
      }
      const newPayload = omit(payload, ['unrepeated', 'answeredTime', 'noAnsweredCount', 'unrepeatedRuleCode', 'answeredTimeRuleCode', 'noAnsweredCountRoleCode', 'triggerType_slot1', 'triggerType_slot2', 'triggerType_slot3', 'handUpSMSSlot', 'reminderSMSSlot', 'hangUpSMS', 'reninderSMS', 'jobSlot', undefined])
      ivrSave(newPayload)
        .then(() => {
          this.$message.success(`${id ? '编辑' : '创建'}运营计划成功～`)
          this.$router.push({ path: '/intelligent-marketing/ivr-manage' })
        })
    },
    onFormChange(newValues, oldValues) {
      // 触发时机联动
      if (newValues.unrepeatedRuleCode !== oldValues.unrepeatedRuleCode && newValues.unrepeatedRuleCode) {
        this.$refs.formRef.set({
          type: 'visible',
          data: {
            triggerType_slot0: newValues.unrepeatedRuleCode === '0',
            triggerType_slot1: newValues.unrepeatedRuleCode === '0' || newValues.unrepeatedRuleCode === '1'
          }
        })
      }
      if (newValues.answeredTimeRuleCode !== oldValues.answeredTimeRuleCode && newValues.answeredTimeRuleCode) {
        this.$refs.formRef.set({
          type: 'visible',
          data: { triggerType_slot2: newValues.answeredTimeRuleCode === '1' }
        })
      }
      if (newValues.noAnsweredCountRoleCode !== oldValues.noAnsweredCountRoleCode && newValues.noAnsweredCountRoleCode) {
        this.$refs.formRef.set({
          type: 'visible',
          data: { triggerType_slot3: newValues.noAnsweredCountRoleCode === '1' }
        })
      }
    },
    handleCheckTaskId() {
      this.handleDialogVis('thirdPartyTaskPlatform', this.slotForm.jobId)
    },
    handleCheckLesson() {
      this.handleDialogVis('lesson')
    },
    handleDialogVis(dialogType, dialogData, type, data) {
      this.dialogType = dialogType
      this.dialogData = dialogData
      if (type === 'task') {
        this.slotForm.jobId = data || ''
      } else if (type === 'lesson') {
        this.slotForm.jobId = data.jobId || ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-item {
  ::v-deep .el-form-item__label {
    display: flex;
    // width: 140px !important;
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
.app-container {
  ::v-deep .el-form-item__label {
    width: 140px !important;
  }
}
.channel-bar {
  margin: 0 0 10px 152px;
  .span-text {
    font-size: 14px;
    color: rgb(144, 147, 153);
    margin: 0 5px;
  }
}
.note {
  align-self: flex-start;
  /*margin-left: 10px;*/
  color: #999;
  font-size: 12px;
  line-height: 1.5;
  i {
    cursor: pointer;
    color: #909399;
  }
}

.form-item-slot {
  width: 565px;
  padding: 0 0 0 150px;

  ::v-deep .el-date-editor{
    width: 115px;
  }
}
</style>
