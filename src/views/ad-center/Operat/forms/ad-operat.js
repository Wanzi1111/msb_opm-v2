/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: zhangjiawen
 * @Date: 2020-11-04 18:30:37
 * @LastEditors: zhangjianwen
 * @LastEditTime: 2020-12-07 18:13:41
 */

export default [
  {
    prop: 'picUrl',
    label: '展示图标',
    type: 'upload-media', // 上传,
    mediaRules: {
      time: 60,
      size: 3,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '请上传3M以下的图片，支持GIF、PNG和JPG格式'
    }
  },
  {
    prop: 'name',
    label: '标题',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'label',
    label: '副标题',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入'
    }
  },
  // {
  //   prop: 'triggerRealm',
  //   label: '用户定向',
  //   type: 'select', // 单选框,
  //   defaultVal: '0',
  //   options: [
  //     {
  //       label: '不限制用户',
  //       value: '0'
  //     }
  //   ],
  //   rules: [{ required: true, message: '用户定向不能为空' }]
  // },
  {
    prop: 'triggerType',
    label: '跳转类型',
    type: 'select', // 单选框,
    defaultVal: '0',
    options: [
      {
        value: '0',
        label: '跳转url'
      },
      {
        value: '1',
        label: '客户端跳转'
      },
      {
        value: '2',
        label: '小程序跳转'
      }
    ],
    rules: [{ required: true, message: '跳转类型不能为空' }]
  },
  // {
  //   prop: 'triggerResultI',
  //   label: '跳转页面',
  //   type: 'select', // 单选框,
  //   defaultVal: '小熊商城',
  //   visible: false,
  //   options: [
  //     {
  //       label: '小熊商城',
  //       value: '小熊商城'
  //     },
  //     {
  //       label: '任务中心',
  //       value: '任务中心'
  //     },
  //     {
  //       label: '在线客服',
  //       value: '在线客服'
  //     },
  //     {
  //       label: '点点商城',
  //       value: '点点商城'
  //     }
  //   ]
  // },
  {
    prop: 'triggerResultO',
    label: '跳转链接',
    type: 'input', // 输入框,
    defaultVal: '',
    visible: true,
    attr: {
      placeholder: '请输入'
    },
    rules: [{ required: true, message: '跳转链接不能为空' }]
    // note: true,
    // noteConfig: {
    //   type: 'text',
    //   text: '可配置url链接'
    // }
  },
  {
    prop: 'lineStatus',
    label: '是否分组',
    type: 'switch', // 切换,
    defaultVal: false
  },
  {
    prop: 'sideType',
    label: '用户区域',
    type: 'cascader',
    visible: true,
    attr: {
      showAllLevels: false,
      collapseTags: true,
      clearable: true,
      options: [],
      props: {
        multiple: true,
        emitPath: false
      }
    }
  },
  // {
  //   prop: 'sideType1',
  //   label: '国内',
  //   type: 'select',
  //   options: [],
  //   attr: {
  //     multiple: true
  //   }
  // },
  // {
  //   prop: 'sideType3',
  //   label: '港澳台',
  //   type: 'select',
  //   options: [],
  //   attr: {
  //     multiple: true
  //   }
  // },
  // {
  //   prop: 'sideType2',
  //   label: '海外',
  //   type: 'select',
  //   options: [],
  //   attr: {
  //     multiple: true
  //   }
  // },
  {
    prop: 'triggerRealm',
    label: '用户定向',
    slot: 'triggerRealm',
    visible: true
  }
]

export const actions = ({ quit }) => {
  return {
    submit: {
      label: '提交'
    },
    back: {
      hide: true
    },
    quit: {
      click: () => quit(),
      type: 'button',
      label: '取消',
      attr: {
        icon: 'el-icon-close'
      }
    }
  }
}
