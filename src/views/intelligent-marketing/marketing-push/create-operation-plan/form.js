import $store from '@/store'

const { getters: { baseData: {
  marketing_intrigger_type_list,
  marketing_do_not_disturb_list,
  marketing_trigger_limit
}}} = $store

export default [
  {
    slot: 'divider_setting'
  },
  {
    prop: 'name',
    label: '计划名称',
    type: 'input', // 选择器,
    rules: [
      { required: true, message: '请输入计划名称！' },
      {
        required: true,
        validator: (_, value, callBack) => {
          if (value.length > 20) {
            callBack(new Error('请控制在20个字符以内！'))
          }
          callBack()
        }
      }
    ],
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'businessType',
    label: '产品线',
    type: 'select', // 选择器,
    rules: [{ required: true, message: '请选择产品线！' }],
    attr: {
      clearable: true
    }
    // options: [...dinc.listSupplierNameType]
  },
  {
    prop: 'oneTypeId',
    label: '分类',
    type: 'cascader',
    rules: [{ required: true, message: '请选择分类！' }],
    attr: {
      clearable: true
    }
  },
  {
    prop: 'templateId',
    label: '模板ID',
    type: 'select',
    rules: [{ required: true, message: '请选择模板ID！' }],
    attr: {
      clearable: true,
      filterable: true
    }
  },
  {
    prop: 'applyName',
    label: '推送应用',
    type: 'input', // 选择器,
    rules: [{ required: true, message: '请输入推送应用！' }],
    attr: {
      placeholder: '自动回填配置应用',
      disabled: true
    }
  },
  {
    prop: 'messageContent',
    label: '模板内容',
    type: 'textarea',
    rules: [
      { required: true, message: '请输入模板内容！' }
      // {
      //   required: true,
      //   validator: (_, value, callBack) => {
      //     if (value.length > 30) {
      //       callBack(new Error('请控制在30个字符以内！'))
      //     }
      //     callBack()
      //   }
      // }
    ],
    attr: {
      placeholder: '自动回填模板配置的内容',
      autosize: {
        minRows: 4
      },
      disabled: true
    }
  },
  {
    prop: 'triggerType',
    label: '触发时机',
    type: 'radio',
    defaultVal: '1',
    options: marketing_intrigger_type_list
  },
  {
    prop: 'startDate',
    slot: 'startDate',
    // label: ' ',
    // type: 'datePickerDatetime',
    // rules: [{ required: true, message: '请选择时间！' }],
    // defaultVal: new Date(),
    // attr: {
    //   placeholder: '请输入'
    // },
    visible: false
  },
  {
    prop: 'timeRange',
    slot: 'timeRange',
    visible: false
  },
  {
    prop: 'behavior',
    slot: 'behavior',
    visible: false
  },
  {
    prop: 'behaviorAB',
    slot: 'behaviorAB',
    visible: false
  },
  {
    prop: 'triggerLimit',
    label: '触发限制',
    type: 'radio',
    defaultVal: '0',
    options: marketing_trigger_limit,
    visible: false
  },
  {
    prop: 'triggerLimitTimes',
    slot: 'triggerLimitTimes',
    visible: false
  },
  {
    prop: 'filterTime',
    label: '勿扰时段',
    type: 'radio',
    defaultVal: '0',
    options: marketing_do_not_disturb_list
  },
  {
    prop: 'filterTimeS',
    slot: 'filterTimeS',
    visible: false
  },
  {
    slot: 'divider_select'
  },
  {
    prop: 'notificationStypeType',
    label: '选择分群',
    type: 'radio',
    defaultVal: '1',
    options: [
      {
        label: '不限',
        value: '0',
        disabled: true
      },
      {
        label: '用户分群推送',
        value: '1'
      }
    ]
  },
  {
    prop: 'groupId',
    label: '用户分群',
    type: 'select',
    slot: 'userGroup',
    options: []
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
