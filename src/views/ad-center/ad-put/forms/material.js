export default [
  // {
  //   prop: 'resourceUrl',
  //   label: '素材',
  //   type: 'upload-media', // 上传,
  //   mediaRules: {
  //     size: 3,
  //     media: 'img',
  //     type: 'GIF,PNG,JPG,JPEG'
  //   },
  //   note: true,
  //   noteConfig: {
  //     type: 'text',
  //     text: '支持GIF、PNG、JPG和JPEG格式'
  //   },
  //   rules: [{ required: true, message: '预览图不能为空' }]
  // },
  {
    slot: 'imageList',
    prop: 'imageList',
    defaultVal: [{
      prop: 'resourceUrl0',
      label: '素材',
      mediaRules: {
        size: 3,
        media: 'img',
        type: 'GIF,PNG,JPG,JPEG'
      },
      note: true
    }],
    label: ''
  },
  {
    slot: 'imageButs',
    prop: 'imageButs',
    defaultVal: [{
      prop: 'bannerUrl0',
      label: '素材',
      mediaRules: {
        media: 'img',
        type: 'GIF,PNG,JPG,JPEG',
        case: '<=',
        width: 656,
        height: 200
      },
      note: true
    }],
    label: ''
  },
  {
    slot: 'soundUrl',
    prop: 'soundUrl',
    label: '素材',
    mediaRules: {
      media: 'audio',
      type: 'mp3'
    }
  },
  {
    slot: 'tip',
    prop: 'tip',
    label: ' '
  }
]

export const actions = ({ quit, label = '保存' }) => {
  return {
    submit: {
      label
    },
    back: {
      hide: true
    },
    quit: {
      click: quit,
      type: 'button',
      label: '退出',
      attr: {
        icon: 'el-icon-close'
      }
    }
  }
}
