// import { business, classValue } from '../../../enum/index'
import { classValue } from '../../../enum/index'
export default [
  // {
  //   prop: 'businessType',
  //   label: '业务线',
  //   type: 'select', // 输入框,
  //   attr: {
  //     disabled: true,
  //     placeholder: '请选择'
  //   },
  //   options: business,
  //   rules: [{ required: true, message: '请选择' }]
  // },
  // {
  //   prop: 'ecommendationManageId',
  //   label: '位置名称',
  //   type: 'select',
  //   attr: {
  //     disabled: true,
  //     placeholder: '请选择'
  //   },
  //   rules: [{ required: true, message: '请输入' }]
  // },
  {
    prop: 'type',
    label: '商品类型',
    type: 'select', // 输入框,
    attr: {
      placeholder: '请选择'
    },
    options: classValue,
    rules: [{ required: true, message: '请选择' }]
  },
  {
    prop: 'epcReferName',
    label: '标题/编码',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  }
]
