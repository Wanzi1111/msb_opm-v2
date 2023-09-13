/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-12-04 20:10:33
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-05 13:44:42
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
  {
    prop: 'redirectType',
    label: ' ',
    type: 'checkbox', // 输入框,
    slot: 'formRoute',
    defaultVal: 0
  },
  {
    prop: 'redirectId',
    visible: true,
    colAttr: {
      style: {
        height: '0' // 防止隐藏字段渲染一个空行
      }
    },
    defaultVal: 0
  },
  //   0不限制1手机号2数字3汉字
  {
    prop: 'textFormat',
    label: '文本格式',
    type: 'select', // 选择器,
    attr: {
      placeholder: '不限制'
    },
    options: [
      {
        label: '不限制',
        value: 0
      },
      {
        label: '手机号',
        value: 1
      },
      {
        label: '数字',
        value: 2
      },
      {
        label: '汉字',
        value: 3
      }
    ],
    defaultVal: 0
    // rules: [{ required: true, message: '请选择业务线' }]
  },
  {
    prop: 'textRowHeight',
    label: '行高',
    type: 'select', // 选择器,
    attr: {
      placeholder: ''
    },
    options: [
      {
        label: '1行',
        value: 1
      },
      {
        label: '2行',
        value: 2
      },
      {
        label: '3行',
        value: 3
      }
    ],
    defaultVal: 1
  },
  {
    prop: 'textMinWords',
    label: '字数范围(最少)',
    type: 'inputNumber',
    attr: {
      placeholder: '最少字数',
      min: 1
    },
    defaultVal: 1,
    rules: [
      { required: true, message: '最少字数为1' },
      {
        validator: (rule, value, callback) => {
          if (value < 1) {
            callback(new Error('字数最少为1'))
            return
          }
          callback()
        }, trigger: 'blur'
      }
    ]
  },
  {
    prop: 'textMaxWords',
    label: '字数范围(最多)',
    type: 'inputNumber',
    attr: {
      placeholder: '最多字数',
      min: 2
    },
    defaultVal: 500,
    rules: [
      { required: true, message: '请输入最多字数' }
    ]
  },
  {
    prop: 'textDefaultNote',
    label: '默认提示',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入'
    }
    // defaultVal: '请输入'
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

