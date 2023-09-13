/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-12-05 13:35:49
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-05 16:06:05
 */
export default [
  {
    prop: 'title',
    label: '标题',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入标题'
    },
    rules: [
      { required: true, message: '请输入标题' }
    ]
  },
  {
    prop: 'required',
    label: ' ',
    type: 'checkbox', // 输入框,
    defaultVal: true,
    options: [
      {
        label: '必答',
        value: true
      }
    ]
  },
  {
    prop: 'show',
    label: ' ',
    type: 'checkbox', // 输入框,
    defaultVal: true,
    options: [
      {
        label: '是否展示',
        value: true
      }
    ]
  },
  {
    slot: 'nps'
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
