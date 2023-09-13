
export default [
  {
    prop: 'businessType',
    type: 'select',
    label: '业务线',
    attr: {
      placeholder: '请选择业务线',
      props: {},
      value: 'businessType',
      label: 'name',
      disabled: true
    },
    options: [],
    rules: [{ required: true, message: '必选, 不能为空', trigger: 'blur' }]
  },
  {
    prop: 'targetCategoryId',
    type: 'cascader',
    label: '分类ID',
    attr: {
      props: {
        showAllLevels: 'false',
        value: 'id',
        label: 'categoryName',
        children: 'childs'
      }
    },
    rules: [{ required: true, message: '必选, 不能为空', trigger: 'blur' }]
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
