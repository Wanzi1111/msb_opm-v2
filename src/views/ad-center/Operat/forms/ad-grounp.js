/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: zhangjiawen
 * @Date: 2020-11-04 18:30:37
 * @LastEditors: zhangjianwen
 * @LastEditTime: 2020-11-12 22:52:53
 */
import store from '@/store'
export default [
  {
    prop: 'bussinessName',
    label: '业务线',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择客户端'
    },
    options: store.getters.operatConfig.businessType,
    rules: [{ required: true, message: '客户端不能为空' }]
  },
  {
    prop: 'languageVersion',
    label: '语言版本',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择客户端'
    },
    options: [
      { value: '0', label: '中文' },
      { value: '1', label: '英文' },
      { value: '2', label: '其他' }
    ],
    defaultVal: '0'
  },
  {
    prop: 'clientType',
    label: '客户端',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择客户端'
    },
    options: [],
    rules: [{ required: true, message: '客户端不能为空' }]
  },
  {
    prop: 'classifyId',
    label: '分类',
    type: 'select', // 选择器,
    recovery: true,
    attr: {
      placeholder: '请选择分类'
    },
    options: [],
    rules: [{ required: true, message: '分类不能为空' }]
  },
  {
    prop: 'name',
    label: '组名称',
    type: 'input', // 文本,
    attr: {
      placeholder: '组名称'
    },
    // options: store.getters.adConfig.clientType,
    rules: [{ required: true, message: '组名称不能为空' }]
  },
  {
    prop: 'picUrl',
    label: '预览图',
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
    // rules: [{ required: true, message: '图片不能为空' }]
  }
]

export const actions = ({ quit }) => {
  return {
    // submit: {
    //   hide: true
    // },
    quit: {
      click: quit,
      type: 'button',
      label: '取消',
      attr: {
        icon: 'el-icon-close'
      }
    },
    back: {
      hide: true
    }
  }

  //   submit: {
  //     // 默认按钮一
  //     hide: true // 是否显示 默认false
  //   },
  //   back: {
  //     hide: true
  //   },
  //   ensure: {
  //     click: ensure,
  //     type: "button",
  //     label: "确定",
  //     attr: {
  //       type: "primary"
  //     }
  //   },
  //   cancel: {
  //     click: cancel,
  //     type: "button",
  //     label: "取消"
  //   }
  // };
}
