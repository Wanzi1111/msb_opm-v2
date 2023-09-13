import { byteLength } from '@/utils/index'

var validatePass = (rule, value, callback) => {
  if (byteLength(value) > 20) {
    callback(new Error('长度不得超过20个字符（10个汉字）'))
    return
  }
  callback()
}
export default [
  {
    prop: 'categoryName',
    type: 'input',
    label: '分类名称',
    rules: [
      { required: true, message: '必填, 不能为空', trigger: 'blur' },
      { validator: validatePass, trigger: 'blur' }
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
