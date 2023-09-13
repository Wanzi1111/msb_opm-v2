export default [
  {
    slot: 'message-divider'
  },
  {
    prop: 'groupName',
    label: '消息分组名称',
    type: 'input', // 选择器,
    attr: {
      clearable: true,
      placeholder: '请输入消息分组名称',
      maxLength: 20
    },
    rules: [
      { required: true, message: '请输入消息分组名称！' }
    ]
  },
  {
    prop: 'displaySort',
    label: '消息展示排序',
    type: 'inputNumber', // 选择器,
    rules: [
      // 校验
      { required: true, message: '请选择业务线！' }
    ],
    attr: {
      clearable: true,
      min: 0
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '请选择消息组序号，数值越小越靠前，不可重复'
    }
  },
  {
    prop: 'subSupport',
    label: '是否支持二级分组',
    type: 'radio',
    defaultVal: '1',
    rules: [
      // 校验
      { required: true, message: '请选择是否支持二级分组！' }
    ],
    options: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
  },
  {
    // slot: 'twoNum',
    prop: 'twoNums',
    label: '选择二级消息组数量',
    type: 'select', // 选择器,
    defaultVal: 1,
    rules: [{ required: true, message: '请选择二级消息组数量！' }],
    options: [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 },
      { label: 6, value: 6 },
      { label: 7, value: 7 },
      { label: 8, value: 8 },
      { label: 9, value: 9 },
      { label: 10, value: 10 }
    ],
    note: true,
    noteConfig: {
      type: 'text',
      text: '最多创建10个消息组，最少创建1个'
    }
  },
  {
    slot: 'temp-divider'
  },
  {
    prop: 'tempId',
    slot: 'tempId'
  },
  {
    slot: 'open-divider'
  },
  {
    prop: 'status',
    label: '是否立即开启',
    type: 'radio',
    defaultVal: '0',
    rules: [
      // 校验
      { required: true, message: '请选择是否立即开启！' }
    ],
    options: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ],
    note: true,
    noteConfig: {
      type: 'text',
      text: '开启后应用内消息页面可见，不选择默认为关闭状态，需要手动开启'
    }
  }
]

export const formActions = () => {
  return {
    submit: {
      hide: false // 是否显示 默认false
    },
    reset: {
      hide: true
    },
    back: {
      hide: false
    }
    // cancel: {
    //   click: () => cancel(),
    //   type: 'button',
    //   label: '取消'
    // }
  }
}
