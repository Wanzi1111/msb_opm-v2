export default [
  {
    prop: 'uid',
    label: '用户id',
    type: 'input',
    attr: {
      placeholder: '请输入用户id',
      clearable: true
    }
  },
  {
    prop: 'businessName',
    label: '业务线',
    type: 'select',
    defaultVal: '美术宝1对1',
    attr: {
      placeholder: '请输入账号名',
      clearable: false
    },
    options: [
      { label: '美术宝1对1', value: '美术宝1对1' },
      { label: '小熊艺术', value: '小熊艺术' }
    ]
  },
  {
    prop: 'advertType',
    label: '广告位置',
    type: 'select',
    attr: {
      placeholder: '请输入类型',
      clearable: true
    }
  }
]
