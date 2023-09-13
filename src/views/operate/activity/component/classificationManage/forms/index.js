import store from '@/store'
export default [
  {
    prop: 'activityBusinessId',
    label: '业务线',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择业务线'
    },
    options: store.getters.activityConfig.businessType,
    rules: [{ required: true, message: '业务线不能为空' }]
  },
  {
    prop: 'typeName',
    label: '分类名称',
    type: 'input', // 文本,
    attr: {
      placeholder: '请输入分类名称'
    },
    rules: [
      { required: true, message: '分类名称不能为空' },
      { min: 1, max: 10, message: '长度不超过10个字符' }
    ]
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
