export default [
  {
    prop: 'goodsThumbnail',
    label: '图片上传',
    type: 'upload-media', // 输入框,
    attr: {
      action: 'text',
      notImg: true
    },
    mediaRules: {
      size: 1,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '仅此活动图片使用'
    }
  }
]
export const actions = ({ closeDl, ensure }) => {
  return {
    submit: { // 默认按钮一
      label: '确定'
      // hide: true // 是否显示 默认false
    },
    back: {
      hide: true
    },
    closeDl: {
      click: closeDl,
      type: 'button',
      label: '取消'
    }
  }
}
