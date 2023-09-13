import store from '@/store'
export default [
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择业务线'
    },
    options: store.getters.operatConfig.businessType,
    rules: [{ required: true, message: '业务线不能为空' }]
  },
  {
    prop: 'clientType',
    label: '客户端',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择客户端'
    },
    options: store.getters.operatConfig.clientType,
    rules: [{ required: true, message: '客户端不能为空' }]
  },
  {
    prop: 'classificationName',
    label: '分类名称',
    type: 'input', // 文本,
    attr: {
      placeholder: '请输入分类名称'
    },
    rules: [{ required: true, message: '分类名称不能为空' }]
  }
]
export const actions = ({ close }) => {
  return {
    submit: {
      label: '确定'
    },
    back: {
      hide: true
    },
    quit: {
      click: close,
      type: 'button',
      label: '取消',
      attr: {
        icon: 'el-icon-close'
      }
    }
  }
}
