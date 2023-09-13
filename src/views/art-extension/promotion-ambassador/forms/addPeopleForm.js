export default [
  {
    prop: 'mobile',
    label: '手机号',
    type: 'input',
    attr: {
      placeholder: '请输入手机号'
    },
    rules: [
      // { required: true, message: '手机号不能为空' },
      {
        validator: (rule, value, callback) => {
          if (!value) {
            callback(new Error('手机号不能为空'))
          } else if (Number.isNaN(Number(value)) || value.length !== 11) {
            callback(new Error('请输入正确的手机号'))
          } else {
            callback()
          }
        }
      }
    ]
  }
]

export const actions = ({ cancel, ensure }) => {
  return {
    submit: { // 默认按钮一
      label: '确定'
      // hide: true // 是否显示 默认false
    },
    back: {
      hide: true
    },
    cancel: {
      click: cancel,
      type: 'button',
      label: '取消'
    }
  }
}

