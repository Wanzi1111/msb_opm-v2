/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-11-30 15:45:47
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-11-30 18:59:42
 */
export default [
  {
    prop: 'surveyDesc',
    label: '',
    type: 'textarea', // 输入框
    attr: {
      placeholder: '请输入',
      rows: 2
    }
    // rules: [{ required: true, message: '问卷名称不能为空' }]
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
