
const valiPass = (rule, value, callback) => {
  console.log(value)
  if (value && !/^[1-9]([0-9]+)?$/.test(value)) {
    callback(new Error('请输入正整数字'))
  } else {
    callback()
  }
}

const valiPass2 = (rule, value, callback) => {
  if (value && !/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)) {
    callback(new Error('请输入小数不超过2位的正数'))
  } else {
    callback()
  }
}

export default [
  [
    {
      prop: 'rate',
      type: 'input',
      slot: 'rate',
      rules: [
        { required: true, message: '汇率不能为空', trigger: 'blur' },
        { validator: valiPass, trigger: 'blur' }
      ]
    }
  ],
  [{
    prop: 'oneClassExchangePrice',
    type: 'input',
    slot: 'oneClassExchangePrice',
    rules: [
      { required: true, message: '汇率不能为空', trigger: 'blur' },
      { validator: valiPass2, trigger: 'blur' }
    ]
  },
  {
    prop: 'smallClassExchangePrice',
    type: 'input',
    slot: 'smallClassExchangePrice',
    rules: [
      { required: true, message: '汇率不能为空', trigger: 'blur' },
      { validator: valiPass2, trigger: 'blur' }
    ]
  }]
]

export const actions = ({ quit }) => {
  return {
    submit: {
      label: '确定'
    },
    back: {
      hide: true
    },
    quit: {
      click: quit,
      type: 'button',
      label: '取消',
      attr: {
        icon: 'el-icon-close'
      }
    }
  }
}
