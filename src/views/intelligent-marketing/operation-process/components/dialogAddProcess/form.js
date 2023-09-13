// import $store from '@/store'

export default [
  {
    prop: 'eventName',
    label: '事件名称',
    type: 'input', // 选择器,
    rules: [
      // 校验
      { required: true, message: '请输入事件名称！' }
    ],
    attr: {
      placeholder: '请输入事件名称',
      clearable: true
    }
  },
  {
    prop: 'userName',
    label: '负责人',
    type: 'input',
    rules: [
      // 校验
      { required: true, message: '请输入负责人！' }
    ],
    attr: {
      placeholder: '请输入负责人',
      clearable: true
    }
  },
  {
    prop: 'imageList',
    label: '流程图',
    type: 'upload',
    rules: [
      // 校验
      { required: true, message: '请上传流程图片！' }
    ],
    attr: {
      listType: 'picture-card',
      multiple: true,
      limit: 10
    },
    mediaRules: {
      size: 1,
      media: 'img',
      type: 'PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '图片大小不超过1M，支持JPG/PNG格式'
    }
  }
]

export const formActions = () => {
  return {
    submit: {
      hide: false // 是否显示 默认false
    },
    reset: {
      hide: true
    },
    back: {
      hide: true
    },
    cancel: {
      hide: true
    }
  }
}
