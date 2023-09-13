import { business } from '../../../enum/index'

export default [
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select', // 输入框,
    layer: 'large',
    defaultVal: 'ONETOONE',
    attr: {
      placeholder: '请选择业务线'
    },
    options: business
  }
]
