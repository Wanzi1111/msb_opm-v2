export default [
  {
    prop: 'spreadUserId',
    label: '推广大使id',
    type: 'text', // 文本,
    attr: {
      disabled: true
    }
  },
  {
    prop: 'mobilePhone',
    label: '手机号',
    type: 'text', // 文本,
    attr: {
      disabled: true
    }
  },
  {
    prop: 'levelInfo',
    label: '等级',
    type: 'text', // 文本,
    attr: {
      disabled: true
    }
  },
  {
    prop: 'closeReason',
    label: '关停原因',
    type: 'textarea', // 输入框,
    attr: {
      autosize: { minRows: 4 },
      placeholder: '请输入关闭原因',
      maxlength: 100
    },
    rules: [{ required: true, message: '关闭原因不能为空' }]
  }
]

export const actions = ({ cancel, ensure }) => {
  return {
    submit: { // 默认按钮一
      hide: true // 是否显示 默认false
    },
    back: {
      hide: true
    },
    ensure: {
      click: ensure,
      type: 'button',
      label: '确认',
      attr: {
        type: 'primary'
      }
    },
    cancel: {
      click: cancel,
      type: 'button',
      label: '取消'
    }
  }
}
