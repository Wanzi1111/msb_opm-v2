export default [
  {
    prop: 'weixinNum',
    label: '微信号',
    type: 'text',
    attr: {
      disabled: true
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
    prop: 'occupation',
    label: '职业',
    type: 'text',
    attr: {
      disabled: true
    }
  },
  {
    prop: 'calendarRange',
    label: '年龄范围',
    type: 'text',
    attr: {
      disabled: true
    }
  },
  {
    prop: 'income',
    label: '每月收入期许',
    type: 'text',
    attr: {
      disabled: true
    }
  },
  {
    prop: 'platform',
    label: '参与平台',
    type: 'text',
    attr: {
      disabled: true
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
      label: '通过审核',
      attr: {
        type: 'primary'
      }
    },
    cancel: {
      click: cancel,
      type: 'button',
      label: '淘汰',
      attr: {
        type: 'danger'
      }
    }
  }
}
