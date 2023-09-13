
export default [
  {
    prop: 'advertType',
    label: '广告类型名称',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入广告类型名称'
    },
    // note: true,
    // noteConfig: {
    //   type: 'text',
    //   text: '命名规范: TY+序号+广告位'
    // },
    rules: [
      { required: true, message: '广告类型名称不能为空' }
    ]
  }
]

export const adActions = ({ quit }) => {
  return {
    submit: {
      label: '新增'
    },
    back: {
      hide: true
    },
    quit: {
      click: quit,
      type: 'button',
      label: '退出',
      attr: {
        icon: 'el-icon-close'
      }
    }
  }
}
