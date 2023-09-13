/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-11-27 11:46:47
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-04 17:13:01
 */
// import store from '@/store'
import { byteLength } from '@/utils/index'
export default [
  {
    prop: 'surveyBizLineCode',
    label: '业务线',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择'
    },
    options: [], // store.getters.bizLine && store.getters.bizLine.bizLine ||
    rules: [{ required: true, message: '请选择业务线' }]
  },
  {
    prop: 'surveyTypeCode',
    label: '问卷类型',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择'
    },
    options: [],
    rules: [{ required: true, message: '请选问卷类型' }]
  },
  {
    prop: 'surveyTitle',
    label: '问卷名称',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入'
    },
    rules: [
      { required: true, message: '问卷名称不能为空' },
      { validator: (rule, value, callback) => {
        console.log(value, rule)
        console.log(byteLength(value))
        if (byteLength(value) < 15) {
          callback(new Error('长度不得少于15个字符（8个汉字）'))
          return
        }
        if (byteLength(value) > 40) {
          callback(new Error('长度不得超过40个字符（20个汉字）'))
          return
        }
        callback()
      }, trigger: 'blur' }
    //   { min: 15, message: '长度不得少于15个字符', trigger: 'blur' },
    //   { max: 40, message: '长度不得超过40个字符', trigger: 'blur' }
    ]
  }
]

export const actions = ({ cancel, submit }) => {
  return {
    back: {
      hide: true
    },
    cancel: {
      label: '取消',
      click: cancel,
      type: 'button',
      attr: {
        icon: ''
      }
    },
    submit: {
      label: '确定',
      //   click: submit,
      type: 'button',
      attr: {
        icon: ' ',
        type: 'primary'
      }
    }
  }
}
