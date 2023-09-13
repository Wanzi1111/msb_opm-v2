export default [
  {
    prop: 'domesticForeign',
    label: '收件人',
    type: 'input', // 选择器,
    rules: [
      { required: true, message: '请输入收件人！' }
    ]
  },
  {
    prop: 'messageType',
    label: '收件电话',
    type: 'input', // 选择器,
    rules: [
      // 校验
      { required: true, message: '请选择收件电话！' }
    ],
    attr: {
      clearable: true
    }
  },
  {
    prop: 'supplierName',
    label: '所在地区',
    type: 'select',
    defaultVal: '',
    rules: [
      // 校验
      { required: true, message: '请选择所在地区！' }
    ],
    attr: {
      clearable: true
    },
    options: []
  },
  {
    prop: 'remark',
    label: '详细地址',
    type: 'textarea',
    defaultVal: '',
    attr: {
      placeholder: '请输入'
    }
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
      hide: true
    },
    cancel: {
      click: () => cancel(),
      type: 'button',
      label: '取消'
    }
  }
}
