/**
 * @author: Liwei
 * @description: 表单配置
 * @date: 2020/5/7
 */
const videoRule = (rule, value, callback) => {
  if (!value.url) {
    callback(new Error('视频不能为空'))
  } else {
    callback()
  }
}
export default ({ remoteMethod, isEdit }) => {
  let conf = [
    {
      prop: 'authorId',
      label: '视频作者',
      type: 'select',
      attr: {
        disabled: !isEdit,
        filterable: true,
        remote: true,
        placeholder: '请输入作者ID/昵称/手机号关联作者',
        remoteMethod: remoteMethod
      },
      options: [],
      rules: isEdit ? [
        { required: true, message: '视频作者不能为空' }
      ] : []
    },
    {
      prop: 'coverUrl',
      // label: '视频封面',
      label: '视频内容',
      type: 'upload-media',
      attr: {
        disabled: !isEdit,
        bucketName: 'one-by-one',
        dir: '',
        rotate: true
      },
      mediaRules: {
        size: 2,
        media: 'img',
        type: 'PNG,JPG,JPEG'
      },
      note: true,
      noteConfig: {
        type: 'text',
        text: '请上传2M以下的图片，支持PNG、JPG和JPEG格式'
      },
      rules: isEdit ? [
        { required: true, message: '视频封面不能为空' }
      ] : []
    },
    {
      prop: 'videoUrl',
      // label: '视频详情',
      type: 'upload-media',
      attr: {
        disabled: !isEdit,
        bucketName: 'one-by-one',
        dir: '',
        rotate: true,
        class: 'video-style'
      },
      mediaRules: {
        duration: 121,
        time: 240,
        size: 100,
        media: 'video',
        poster: true,
        posterRatio: 1.77,
        type: 'MP4,m3u8',
        multiple: true
      },
      note: true,
      noteConfig: {
        type: 'text',
        text: '请上传100M以下/2分钟以内的视频，支持MP4/M3U8格式'
      },
      rules: isEdit ? [
        { required: true, message: '视频不能为空' },
        { validator: videoRule, trigger: 'change' }
      ] : []
    }
  ]
  if (!isEdit) {
    conf = [{
      prop: 'ctime',
      label: '上传时间',
      type: 'text',
      attr: {
        disabled: true
      }
    }, ...conf, {
      prop: 'status',
      label: '审核结果',
      type: 'radio',
      options: [
        {
          label: '审核通过',
          value: 2
        },
        {
          label: '审核驳回',
          value: 0
        }
      ],
      rules: [
        { required: true, message: '审核结果不能为空' }
      ]
    },
    {
      prop: 'refuseCause',
      label: '驳回理由',
      type: 'radio',
      visible: true,
      rules: [
        { required: true, message: '驳回理由不能为空' }
      ]
    },
    {
      prop: 'isRecommend',
      label: '是否推荐至首页',
      type: 'checkbox',
      visible: false,
      options: [
        {
          label: '是',
          value: '1'
        }
      ]
      // rules: [
      //   { required: true, message: '驳回理由不能为空' }
      // ]
    }]
  }
  return conf
}

export const actions = ({ closeDl, setTurn }) => {
  return {
    submit: {
      label: '确定'
    },
    back: {
      hide: true
    },
    turn: {
      click: () => setTurn(),
      type: 'button',
      label: '保存旋转',
      attr: {
        type: 'primary',
        plain: true,
        icon: 'el-icon-refresh'
      }
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
