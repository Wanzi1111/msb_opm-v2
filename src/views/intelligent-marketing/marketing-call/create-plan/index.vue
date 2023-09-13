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
      <template slot="channel">
        <el-form-item label="渠道来源" class="form-item" :rules="[{ required: true, message: '请选择时间！' }]">
          <div v-for="(v, i) in slotForm.channel" :key="i">
            <div class="channel-bar">
              <el-inputNumber v-model="v.value" placeholder="请输入渠道来源，仅支持数字" :min="1" :controls="false" style="width: 300px; margin-right: 20px" />
              <el-button v-if="i === slotForm.channel.length - 1" size="mini" @click="handleAddChannel">添加</el-button>
              <el-button v-if="slotForm.channel.length !== 1" size="mini" type="info" @click="handleDelChannel(i)">删除</el-button>
            </div>
          </div>
          <div class="note channel-bar">
            <i class="el-icon-info" />
            <span>可添加多个渠道，例子进量降按多个渠道累加计算</span>
          </div>
        </el-form-item>
      </template>
      <template slot="jobId">
        <el-form-item label="第三方任务ID" class="form-item" :rules="[{ required: true, message: '请选择时间！' }]">
          <el-button v-if="!slotForm.jobId" @click="handleCheckTaskId('check')">
            选择任务ID
          </el-button>
          <div v-else>
            <span>{{ slotForm.jobId }}</span>
            <el-button :disabled="!!$route.query.id" @click="handleCheckTaskId('check')">
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
              <el-option v-for="v in intelligentMarketing.callDinc.operatorList" :key="v.value" v-bind="v" />
            </el-select>
            <el-button slot="append">天</el-button>
          </el-input>
        </el-form-item>
      </template>
      <template slot="triggerType_slot2">
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择时间！' }]">
          <el-input v-model="slotForm.answeredTime.baseValue" placeholder="请输入内容" style="width: 300px">
            <el-select slot="prepend" v-model="slotForm.answeredTime.operator" placeholder="请选择" style="width: 120px">
              <el-option v-for="v in intelligentMarketing.callDinc.operatorList" :key="v.value" v-bind="v" />
            </el-select>
            <el-button slot="append">天</el-button>
          </el-input>
        </el-form-item>
      </template>
      <template slot="triggerType_slot3">
        <el-form-item label=" " class="form-item" :rules="[{ required: true, message: '请选择时间！' }]">
          <el-input v-model="slotForm.noAnsweredCount.baseValue" placeholder="请输入内容" style="width: 300px">
            <el-select slot="prepend" v-model="slotForm.noAnsweredCount.operator" placeholder="请选择" style="width: 120px">
              <el-option v-for="v in intelligentMarketing.callDinc.operatorList" :key="v.value" v-bind="v" />
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
              <template v-if="v.smsStatus === 1">
                <div>
                  <el-select v-model="v.intentLevels" multiple collapse-tags placeholder="请选择用户标签" style="width: 240px">
                    <el-option v-for="val in intentLevelListBySupplier" :key="val.value" v-bind="val" />
                  </el-select>
                  <span class="span-text">且通话时长</span>
                  <el-input v-model="v.baseValue" placeholder="请输入内容" style="width: 270px">
                    <el-select slot="prepend" v-model="v.operator" placeholder="请选择" style="width: 120px">
                      <el-option v-for="val in intelligentMarketing.callDinc.operatorList" :key="val.value" v-bind="val" />
                    </el-select>
                    <el-button slot="append">秒</el-button>
                  </el-input>
                </div>
                <div style="margin: 10px 0">
                  <el-select v-model="v.sceneCode" filterable placeholder="请选择场景模板" style="width: 300px">
                    <el-option v-for="val in smsTempList" :key="val.value" v-bind="val" />
                  </el-select>
                  <el-button v-if="i === slotForm.hangUpSMS.length - 1" size="mini" @click="handleAddHangUpSMS">添加</el-button>
                  <el-button v-if="slotForm.hangUpSMS.length !== 1" size="mini" type="info" @click="handleDelHangUpSMS(i)">删除</el-button>
                </div>
              </template>
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
              <template v-if="v.smsStatus === 1">
                <div>
                  <el-select v-model="v.intentLevels" multiple collapse-tags placeholder="请选择用户标签" style="width: 240px">
                    <el-option v-for="val in intentLevelListBySupplier" :key="val.value" v-bind="val" />
                  </el-select>
                  <span class="span-text">且通话时长</span>
                  <el-input v-model="v.baseValue" placeholder="请输入内容" style="width: 270px">
                    <el-select slot="prepend" v-model="v.operator" placeholder="请选择" style="width: 120px">
                      <el-option v-for="val in intelligentMarketing.callDinc.operatorList" :key="val.value" v-bind="val" />
                    </el-select>
                    <el-button slot="append">秒</el-button>
                  </el-input>
                  <span class="span-text">未购买</span>
                  <el-select v-model="v.packagesId" multiple collapse-tags placeholder="请选择套餐ID" style="width: 220px">
                    <el-option v-for="val in packageList" :key="val.value" v-bind="val" />
                  </el-select>
                </div>
                <div style="margin: 10px 0">
                  <el-select v-model="v.sceneCode" filterable placeholder="请选择场景模板" style="width: 300px">
                    <el-option v-for="val in smsTempList" :key="val.value" v-bind="val" />
                  </el-select>
                  <el-select v-model="v.remindType" style="width: 100px">
                    <el-option v-for="val in remindTypeOptions" :key="val.value" v-bind="val" />
                  </el-select>
                  <el-time-select
                    v-model="v.remindTime"
                    :picker-options="{ start: '00:00', step: '00:30', end: '23:30' }"
                    placeholder="选择时间"
                    style="width: 120px"
                  />
                  <el-button v-if="i === slotForm.reninderSMS.length - 1" size="mini" @click="handleAddReninderSMS">添加</el-button>
                  <el-button v-if="slotForm.reninderSMS.length !== 1" size="mini" type="info" @click="handleDelReninderSMS(i)">删除</el-button>
                </div>
              </template>
            </div>
          </div>
        </el-form-item>
      </template>
      <template slot="clues_put_in_storage">
        <el-divider content-position="left">线索入库</el-divider>
      </template>
      <template slot="status_intentLevels">
        <el-form-item label="是否线索入库" class="form-item" :rules="[{ required: true }]">
          <div v-for="(v, i) in slotForm.taskClueModel" :key="i">
            <div class="channel-bar">
              <div>
                <el-radio-group v-model="v.status">
                  <el-radio :label="1">需要入库</el-radio>
                  <el-radio :label="0">无需入库</el-radio>
                </el-radio-group>
              </div>
              <div v-if="v.status === 1">
                <el-select v-model="v.intentLevels" multiple collapse-tags placeholder="请选择用户标签" style="width: 240px">
                  <el-option v-for="val in intentLevelListBySupplier" :key="val.value" v-bind="val" />
                </el-select>
              </div>
            </div>
          </div>
        </el-form-item>
      </template>
      <template slot="initiative_to_add_wechat">
        <el-divider content-position="left">主动加V</el-divider>
      </template>
      <template slot="need_wechat">
        <el-form-item label="是否主动加V" class="form-item" :rules="[{ required: true }]">
          <div v-for="(v, i) in slotForm.addVModel" :key="i">
            <div class="channel-bar">
              <div>
                <el-radio-group v-model="v.status">
                  <el-radio :label="1">需要加V</el-radio>
                  <el-radio :label="0">无需加V</el-radio>
                </el-radio-group>
              </div>
              <div v-if="v.status === 1">
                <el-select v-model="v.intentLevels" multiple collapse-tags placeholder="请选择用户标签" style="width: 240px">
                  <el-option v-for="val in intentLevelListBySupplier" :key="val.value" v-bind="val" />
                </el-select>
              </div>
            </div>
          </div>
        </el-form-item>
      </template>
    </basics-form>

    <template>
      <dialog-third-party-task-platform v-if="dialogType === 'thirdPartyTaskPlatform'" :supplier-id="$refs.formRef.form.supplier || 1" :job-id="dialogData" :country-type="countryType" @handleDialogVis="handleDialogVis" />
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
  saveMarketingCall,
  getMarketingCallDetail
} from '@/api/intelligentMarketing'
import forms, { packageList, formActions } from './form'

// 渠道来源
const initChannelForm = { value: '' }
// 挂机短信
const initHangUpSMS = { smsStatus: 1, intentLevels: [], operator: 'gt', baseValue: 30, sceneCode: '', smsType: 1 }
// 提醒短信
const initReninderSMS = { smsStatus: 1, intentLevels: [], operator: 'gt', baseValue: 30, packagesId: [], sceneCode: '', smsType: 2, remindType: '0', remindTime: '' }
// 线索入库
const initTaskClueModel = { intentLevels: [], status: 1 }
// 是否加V
const initAddVModel = { intentLevels: [], status: 1 }

const remindTypeOptions = [
  { label: '当日', value: '0' },
  { label: '次日', value: '1' }
]

export default {
  name: 'CreateMarketingCallPlan',
  components: { DialogThirdPartyTaskPlatform },
  props: {},
  data() {
    return {
      packageList,
      visiable: true,
      forms,
      slotForm: {
        channel: [{ ...initChannelForm }],
        hangUpSMS: [cloneDeep(initHangUpSMS)],
        reninderSMS: [cloneDeep(initReninderSMS)],
        taskClueModel: [{ ...initTaskClueModel }],
        addVModel: [{ ...initAddVModel }],
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
      countryType: 0,
      smsTempList: [], // 短信模板
      remindTypeOptions, // 短信发送时间
      intentLevelListBySupplier: [], // 用户标签
      detailInit: false
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    appLoading() {
      const { loadings } = this
      return loadings._big_data_client_profile_group_page ||
        loadings._big_data_client_profile_group_getGroupTreeByRootId_1 ||
        loadings._big_data_client_profile_group_getGroupTreeByRootId_2 ||
        loadings._big_data_client_profile_group_getGroupTreeByRootId_3 ||
        loadings._ums_meixiu_api_sms_api_web_message_platform_sms_scenario_configuration_list ||
        loadings._ums_meixiu_api_out_m_task_manage_detail ||
        loadings._ums_meixiu_api_out_m_task_manage_save ||
        loadings._big_data_client_profile_group_listGroupDropDown
    },
    ...mapState(['intelligentMarketing'])
  },
  mounted() {
    const { id } = this.$route.query
    this.$nextTick(() => {
      this.handleInitOptions()
      this.getSMSScenarioConfigurationList()
    })
    if (id) {
      this.getMarketingCallDetail(id)
    }
  },
  methods: {
    // 编辑
    getMarketingCallDetail(id) {
      getMarketingCallDetail({ id })
        .then(({ payload }) => {
          const { businessLine, callSort, channel, exportBusinessLine, groupCode, jobId, ruleList, smsList, startTime, supplier, targetImportQuantity, targetTransferQuantity, taskName, taskClueModel, countryType, addVModel } = payload
          this.countryType = countryType
          this.detailInit = true
          // 呼叫规则、短信规则表单特殊处理
          const ruleMap = {}
          const hangUpSMS = []
          const reninderSMS = []
          ruleList.forEach(v => {
            ruleMap[v.ruleCode] = v
          })
          smsList.forEach(v => {
            v.intentLevels = v.intentLevels ? v.intentLevels.split(',') : []
            if (v.smsType === 1) {
              hangUpSMS.push(v)
            } else {
              v.remindType = v.remindType + ''
              v.packagesId = v.packagesId ? v.packagesId.split(',') : []
              // 兼容历史数据
              v.operator = v.operator || 'gt'
              reninderSMS.push(v)
            }
          })
          // 构造表单回显form
          const recoveryForm = {
            countryType,
            taskName,
            startTime: moment(+startTime),
            businessLine,
            supplier,
            targetImportQuantity,
            targetTransferQuantity,
            callSort,
            exportBusinessLine,
            groupCode,
            unrepeatedRuleCode: ruleMap.unrepeated.filterJobIds ? '0' : ruleMap.unrepeated.ruleStatus + '',
            answeredTimeRuleCode: ruleMap.answeredTime.ruleStatus + '',
            noAnsweredCountRoleCode: ruleMap.noAnsweredCount.ruleStatus + '',
            filterJobIds: ruleMap.unrepeated.filterJobIds
          }
          // 构造自定义回显form
          const slotForm = {
            jobId,
            // group: { groupCode, groupRootId, groupTreeId },
            channel: channel.split(',').map(v => ({ value: v })),
            hangUpSMS,
            reninderSMS,
            taskClueModel: [{ ...taskClueModel, intentLevels: taskClueModel.intentLevels.split(',') }],
            addVModel: [{ ...addVModel, intentLevels: addVModel.intentLevels.split(',') }],
            ...ruleMap
          }
          this.$refs.formRef.recoveryForm(recoveryForm)
          this.$refs.formRef.set({
            type: 'attr',
            data: { taskName: { disabled: true }, startTime: { disabled: true }}
          })
          this.slotForm = slotForm
        })
    },
    // 初始化options
    handleInitOptions() {
      const { intelligentMarketing: { callDinc: { businessLineList, callSortList, supplierList }}} = this
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
    // 添加渠道
    handleAddChannel() {
      this.slotForm.channel.push({ ...initChannelForm })
    },
    // 删除渠道
    handleDelChannel(i) {
      this.slotForm.channel.splice(i, 1)
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
      const { id } = this.$route.query
      // 整合数据
      let payload = cloneDeep({ ...values, ...this.slotForm })
      payload.hangUpSMS.forEach(v => { v.intentLevels = v.intentLevels.join(',') })
      payload.reninderSMS.forEach(v => { v.intentLevels = v.intentLevels.join(','); v.packagesId = v.packagesId.toString() })
      payload.taskClueModel.forEach(v => { v.intentLevels = v.intentLevels.join(',') })
      payload.addVModel.forEach(v => { v.intentLevels = v.intentLevels.join(',') })
      payload = {
        ...payload,
        startTime: moment(payload.startTime).valueOf(),
        channel: payload.channel.map(v => v.value).join(','),
        // 呼叫规则
        ruleList: [
          { ...payload.unrepeated, ruleStatus: '1' },
          { ...payload.answeredTime, ruleStatus: payload.answeredTimeRuleCode },
          { ...payload.noAnsweredCount, ruleStatus: payload.noAnsweredCountRoleCode }
        ],
        taskClueModel: payload.taskClueModel?.[0],
        addVModel: payload.addVModel?.[0],
        // 短信规则
        smsList: [...payload.hangUpSMS, ...payload.reninderSMS]
      }
      const newPayload = omit(payload, ['unrepeated', 'answeredTime', 'noAnsweredCount', 'unrepeatedRuleCode', 'answeredTimeRuleCode', 'noAnsweredCountRoleCode', 'triggerType_slot1', 'triggerType_slot2', 'triggerType_slot3', 'handUpSMSSlot', 'reminderSMSSlot', 'hangUpSMS', 'reninderSMS', 'status_intentLevels', undefined])
      if (id) newPayload.id = id
      // console.log('newPayload', newPayload)
      // return
      saveMarketingCall(newPayload)
        .then(() => {
          this.$message.success(`${id ? '编辑' : '创建'}运营计划成功～`)
          this.$router.push({ path: '/intelligent-marketing/marketing-call' })
        })
    },
    onFormChange(newValues, oldValues) {
      // 切换外呼平台
      if (newValues.supplier !== oldValues.supplier && newValues.supplier) {
        if (newValues.supplier === 1) {
          this.intentLevelListBySupplier = this.intelligentMarketing.callDinc.intentLevelList
        } else {
          this.intentLevelListBySupplier = this.intelligentMarketing.callDinc.intentLevel94List
        }
        if (this.detailInit) {
          this.detailInit = false
          return
        }
        this.slotForm.hangUpSMS = this.slotForm.hangUpSMS.map(v => ({ ...v, intentLevels: [] }))
        this.slotForm.reninderSMS = this.slotForm.reninderSMS.map(v => ({ ...v, intentLevels: [] }))
        this.slotForm.taskClueModel = this.slotForm.taskClueModel.map(v => ({ ...v, intentLevels: [] }))
        this.slotForm.addVModel = this.slotForm.addVModel.map(v => ({ ...v, intentLevels: [] }))
        this.slotForm.jobId = ''
      }
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
      // 已接通用户距当前时间
      if (newValues.answeredTimeRuleCode !== oldValues.answeredTimeRuleCode && newValues.answeredTimeRuleCode) {
        this.$refs.formRef.set({
          type: 'visible',
          data: { triggerType_slot2: newValues.answeredTimeRuleCode === '1' }
        })
      }
      // 呼叫次数-接通次数
      if (newValues.noAnsweredCountRoleCode !== oldValues.noAnsweredCountRoleCode && newValues.noAnsweredCountRoleCode) {
        this.$refs.formRef.set({
          type: 'visible',
          data: { triggerType_slot3: newValues.noAnsweredCountRoleCode === '1' }
        })
      }
      // 判断导入用户类型 不可以加 “ &&oldValues.countryType ” 这段代码，判断中包含数字0会导致判断异常
      if (newValues.countryType !== oldValues.countryType) {
        this.countryType = newValues.countryType
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
</style>
