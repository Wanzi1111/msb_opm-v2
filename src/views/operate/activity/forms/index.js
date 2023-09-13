import store from '@/store'
export default [
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择业务线'
    },
    options: store.getters.activityConfig.businessType,
    rules: [{ required: true, message: '业务线不能为空' }]
  },
  {
    prop: 'activityTypeId',
    label: '分类',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择分类'
    },
    options: [],
    rules: [{ required: true, message: '分类不能为空' }]
  },
  {
    prop: 'activityName',
    label: '活动标题',
    type: 'input', // 文本,
    attr: {
      placeholder: '请输入活动标题'
    },
    rules: [{ required: true, message: '活动标题不能为空' }]
  },
  {
    prop: 'activityCoverUrl',
    label: '上传图标',
    type: 'upload-media', // 上传,
    mediaRules: {
      size: 1,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '支持GIF、PNG、JPG和JPEG格式，请上传1M以下图片'
    },
    rules: [{ required: true, message: '预览图不能为空' }]
  },
  {
    prop: 'jumpUrl',
    label: '跳转链接',
    type: 'input', // 文本,
    attr: {
      placeholder: '请输入跳转链接'
    },
    rules: [{ required: true, message: '跳转链接不能为空' }]
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
