export const packageList = [
  { label: '小熊美术体验版-62', value: '62' },
  { label: '小熊美术体验版-771', value: '771' },
  { label: '综合课包体验版-754', value: '754' },
  { label: '综合课包体验版-762', value: '762' },
  { label: '小熊书法体验版-668', value: '668' }
]

export default [
  {
    slot: 'divider_basics_info'
  },
  {
    prop: 'taskName',
    label: '任务名称',
    type: 'input', // 选择器,
    rules: [
      { required: true, message: '请输入任务名称！' },
      {
        required: true,
        validator: (_, value, callBack) => {
          if (value.length > 30) {
            callBack(new Error('请控制在30个字符以内！'))
          }
          callBack()
        }
      }
    ],
    attr: {
      placeholder: '请输入任务名称，最大不可超过30个汉字'
    }
  },
  {
    prop: 'startDate',
    label: '任务开始时间',
    type: 'datePicker', // 日期选择器,
    rules: [{ required: true, message: '请选择任务开始时间！' }],
    attr: {
      // type: 'daterange',
      clearable: true,
      placeholder: '请输入时间'
    }
  },
  {
    prop: 'endDate',
    label: '任务结束时间',
    type: 'datePicker', // 日期选择器,
    rules: [{ required: true, message: '请选择任务结束时间！' }],
    attr: {
      // type: 'daterange',
      clearable: true,
      placeholder: '请输入时间'
    }
  },
  {
    prop: 'schedule',
    label: '',
    slot: 'schedule'
  },
  {
    prop: 'haltDateFrom',
    label: '不可导入开始日期',
    type: 'datePicker', // 日期选择器,
    attr: {
      // type: 'daterange',
      clearable: true,
      placeholder: '请输入时间'
    }
  },
  {
    prop: 'haltDateTo',
    label: '不可导入结束日期',
    type: 'datePicker', // 日期选择器,
    attr: {
      // type: 'daterange',
      clearable: true,
      placeholder: '请输入时间'
    }
  },
  {
    prop: 'haltTime',
    label: '',
    slot: 'haltTime'
  },
  {
    prop: 'businessLine',
    label: '业务线类型',
    type: 'select', // 选择器,
    rules: [{ required: true, message: '请选择产品线！' }],
    attr: {
      clearable: true
    },
    options: []
  },
  {
    prop: 'supplier',
    label: '外呼平台',
    type: 'select',
    rules: [{ required: true, message: '请选择分类！' }],
    attr: {
      placeholder: '请选择外呼平台',
      clearable: true
    },
    options: []
  },
  {
    prop: 'targetImportQuantity',
    label: '每次目标导入量',
    type: 'inputNumber',
    rules: [{ required: true, message: '请输入目标导入量！' }],
    attr: {
      min: 1,
      controlsPosition: 'right',
      placeholder: '请输入目标导入量，仅可输入数字',
      clearable: true
    }
  },
  {
    prop: 'jobSlot',
    label: '第三方任务ID',
    slot: 'jobSlot'
  },
  {
    slot: 'divider_call_user_rule'
  },
  {
    prop: 'exportBusinessLine',
    label: '导出业务线',
    type: 'select',
    rules: [{ required: true, message: '请选择导出业务线！' }],
    options: []
  },
  {
    prop: 'groupCode',
    label: '选择分群',
    type: 'select',
    rules: [{ required: true, message: '请选择分群！' }],
    attr: {
      filterable: true
    },
    options: []
  },
  {
    prop: 'unrepeatedRuleCode',
    label: '导入过本任务',
    type: 'radio',
    rules: [{ required: true, message: '请选择导入过本任务！' }],
    defaultVal: '0',
    options: [
      { label: '过滤部分任务ID', value: '0' },
      { label: '过滤全部第三方任务ID', value: '1' }
    ]
  },
  {
    prop: 'triggerType_slot1',
    label: ' ',
    slot: 'triggerType_slot1',
    visible: false
  },
  {
    prop: 'triggerType_slot0',
    label: ' ',
    slot: 'triggerType_slot0',
    visible: false
  },
  {
    prop: 'answeredTimeRuleCode',
    label: '已接通用户距当前时间',
    type: 'radio',
    rules: [{ required: true, message: '请选择已接通用户距当前时间！' }],
    defaultVal: '1',
    options: [{ label: '不过滤', value: '0' }, { label: '过滤', value: '1' }]
  },
  {
    prop: 'triggerType_slot2',
    label: ' ',
    slot: 'triggerType_slot2',
    visible: false
  },
  {
    prop: 'noAnsweredCountRoleCode',
    label: '呼叫次数-接通次数',
    type: 'radio',
    rules: [{ required: true, message: '请选择呼叫次数-接通次数！' }],
    defaultVal: '1',
    options: [{ label: '不过滤', value: '0' }, { label: '过滤', value: '1' }]
  },
  {
    prop: 'triggerType_slot3',
    label: ' ',
    slot: 'triggerType_slot3',
    visible: false
  },
  {
    prop: 'callSort',
    label: '呼叫顺序',
    type: 'radio',
    rules: [{ required: true, message: '请选择呼叫顺序！' }],
    defaultVal: 0
    // options: [{ label: '随机', value: '1' }, { label: '注册时间由近到远', value: '2' }, { label: '注册时间由远到近', value: '3' }]
  },
  {
    slot: 'divider_sms_setting'
  },
  {
    prop: 'handUpSMSSlot',
    slot: 'handUpSMSSlot'
  },
  {
    prop: 'reminderSMSSlot',
    slot: 'reminderSMSSlot'
  }
]

export const formActions = (cancel) => {
  return {
    submit: {
      hide: false, // 是否显示 默认false
      label: '提交'
    },
    reset: {
      hide: true
    },
    back: {
      hide: false
    },
    cancel: {
      hide: true
    }
  }
}
