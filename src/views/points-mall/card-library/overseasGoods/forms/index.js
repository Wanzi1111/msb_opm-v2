export default [
  {
    prop: 'couponNum',
    label: '卡号',
    type: 'input',
    attr: {
      placeholder: '请输入要充值的卡号'
    },
    rules: [{ required: true, message: '卡号不能为空' }]
  },
  {
    prop: 'couponPassword',
    label: '密码',
    type: 'input',
    attr: {
      placeholder: '请输入充值的密码，没有可不填写'
    }
  },
  {
    prop: 'partySerialNo',
    label: '交易流水号',
    type: 'input',
    attr: {
      placeholder: '请输入第三方购买当前商品的交易流水号'
    },
    rules: [{ required: true, message: '交易流水号不能为空' }]
  }
]

export const actions = ({ closeDl }) => {
  return {
    submit: {
      label: '立即充值'
    },
    back: {
      hide: true
    },
    quit: {
      click: () => closeDl(),
      type: 'button',
      label: '取消',
      attr: {
        icon: 'el-icon-close'
      }
    }
  }
}
