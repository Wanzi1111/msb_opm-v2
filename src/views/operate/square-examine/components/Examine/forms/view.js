/*
 * @Descripttion:
 * @version:
 * @Author: gaoleifang
 * @Date: 2020-08-26 15:31:45
 * @LastEditors: gaoleifang
 * @LastEditTime: 2020-09-24 16:55:10
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
    prop: 'coverUrl',
    label: '视频内容',
    // label: '视频封面',
    type: 'upload-media',
    attr: {
      disabled: true
    },
    mediaRules: {
      size: 2,
      media: 'img',
      type: 'PNG,JPG,JPEG'
    }
  },
  {
    prop: 'status',
    label: '审核结果',
    type: 'text'
  },
  {
    prop: 'refuseCauseText',
    label: '驳回理由',
    type: 'text',
    visible: false
  },
  {
    prop: 'ptime',
    label: '审核时间',
    type: 'text'
    // render: (h, dat) => {
    //   return moment(dat).format('YYYY-MM-DD HH:mm:ss')
    // }
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
