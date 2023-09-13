/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-12-05 13:35:49
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-05 14:09:33
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
      //   { min: 15, message: '长度不得少于15个字符', trigger: 'blur' },
      //   { max: 40, message: '长度不得超过40个字符', trigger: 'blur' }
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
  //   0-星星，1-评分
  {
    prop: 'scoreStyle',
    label: '选择样式',
    type: 'radio',
    attr: {
      placeholder: '不限制'
    },
    options: [
      {
        label: '星星',
        value: 0
      },
      {
        label: '评分',
        value: 1
      }
    ],
    defaultVal: 0
    // rules: [{ required: true, message: '请选择业务线' }]
  },
  {
    prop: 'scoreNoteLow',
    label: '分值说明(最低)',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入'
    },
    rules: [{ required: true, message: '请输入分值说明' }]
  },
  {
    prop: 'scoreNoteHigh',
    label: '分值说明(最高)',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入'
    },
    rules: [{ required: true, message: '请输入分值说明' }]
  },
  {
    prop: 'scoreShow',
    label: ' ',
    type: 'checkbox', // 输入框,
    defaultVal: true,
    options: [
      {
        label: '显示分值说明',
        value: true
      }
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
