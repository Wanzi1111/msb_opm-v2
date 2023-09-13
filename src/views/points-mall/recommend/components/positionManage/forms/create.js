import { business } from '../../../enum/index'
export default [
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select', // 输入框,
    attr: {
      placeholder: '请选择业务线'
    },
    options: business,
    rules: [{ required: true, message: '请选择业务线' }]
  },
  {
    prop: 'recommendationTag',
    label: '位置名称',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入位置名称',
      maxlength: 10,
      showWordLimit: true
    },
    rules: [{ required: true, message: '请输入位置名称' }]
  }
]

export const actions = ({ back }) => {
  return {
    back: {
      hide: true
    },
    uback: {
      label: '取消',
      click: back,
      type: 'button',
      attr: {
        icon: 'el-icon-back'
      }
    }
  }
}
