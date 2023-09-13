import { lineList } from '../../index.vue'

export const createLessonForm = [
  {
    prop: 'line',
    label: '业务线',
    type: 'select', // 输入框,
    attr: {
      placeholder: '请选择',
      disabled: true
    },
    options: lineList
  },
  {
    prop: 'activityId',
    label: '活动',
    type: 'select', // 输入框,
    attr: {
      placeholder: '请选择'
    },
    options: []
  },
  {
    prop: 'name',
    label: '课程名称',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请填写课程名称',
      maxlength: 15
    },
    rules: [{ required: true, message: '课程名称不能为空' }]
  },
  {
    prop: 'img',
    label: '课程封面',
    type: 'upload-media',
    mediaRules: {
      width: 750,
      height: 440,
      size: 0.4,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议750x440像素；图片大小不超过400KB'
    },
    attr: {
      disabled: false
    },
    rules: [{ required: true, message: '头图不能为空' }]
  },
  {
    prop: 'url',
    label: '课程视频',
    type: 'upload-media',
    mediaRules: {
      size: 200,
      media: 'media',
      type: 'mp4',
      time: 200
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '视频支持mp4格式，大小不超过200M'
    },
    attr: {
      disabled: false
    },
    rules: [{ required: true, message: '课程视频不能为空' }]
  }
]

export const actions = ({ back }) => {
  return {
    back: {
      hide: true
    },
    uback: {
      label: '返回',
      click: back,
      type: 'button',
      attr: {
        icon: 'el-icon-back'
      }
    }
  }
}
