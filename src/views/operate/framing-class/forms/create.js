
export default [
  {
    prop: 'name',
    label: '标题',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入标题'
    },
    rules: [
      { required: true, message: '标题不能为空' },
      { max: 5, message: '命名规则5个字以内, 请重新定义' }
    ]
  },
  {
    prop: 'sort',
    label: '排序',
    type: 'inputNumber', // 输入框,
    attr: {
      placeholder: '请输入排序',
      min: 1,
      max: 2147483648,
      controlsPosition: 'right',
      class: 'input-number-left'
    },
    rules: [{ required: true, message: '排序不能为空' }]
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
