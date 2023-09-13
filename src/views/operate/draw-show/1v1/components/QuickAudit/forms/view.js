/*
 * @Descripttion:
 * @version:
 * @Author: gaoleifang
 * @Date: 2020-08-26 15:31:45
 * @LastEditors: gaoleifang
 * @LastEditTime: 2020-09-24 16:05:40
 */
/**
 * @author: Liwei
 * @description: 表单配置
 * @date: 2020/5/7
 */
export default [
  {
    prop: 'ctime',
    label: '上传时间',
    type: 'text'
  },
  {
    prop: 'authorId',
    label: '视频作者',
    type: 'text'
  },
  {
    prop: 'videoUrl',
    label: '视频详情',
    type: 'upload-media',
    attr: {
      disabled: true
    },
    mediaRules: {
      media: 'video',
      type: 'MP4,m3u8'
    }
  },
  {
    prop: 'status',
    label: '审核结果',
    type: 'text'
  }
]

export const actions = ({ closeDl }) => {
  return {
    submit: {
      hide: true
    },
    back: {
      hide: true
    },
    quit: {
      click: () => closeDl(),
      type: 'button',
      label: '退出',
      attr: {
        icon: 'el-icon-close'
      }
    }
  }
}
