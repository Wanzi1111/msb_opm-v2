export default [
  {
    prop: 'weixinNum',
    label: '微信号',
    type: 'input', // 文本,
    attr: {
      placeholder: '请输入微信号'
    }
  },
  {
    prop: 'mobilePhone',
    label: '手机号',
    type: 'text',
    attr: {
      disabled: true
    }
  },
  {
    prop: 'spreadUserName',
    label: '姓名',
    type: 'input', // 文本,
    attr: {
      placeholder: '请输入姓名'
    }
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

