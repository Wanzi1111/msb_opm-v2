
import { areas } from '../enum'
export default [
  {
    prop: 'line',
    label: '海报归属',
    type: 'select',
    attr: {
      placeholder: '请选择'
    },
    options: [
      { label: '美术宝1对1', value: '1' },
      { label: '小熊艺术', value: '2' },
      { label: '书画院', value: '3' }
    ],
    rules: [{ required: true, message: '请选择海报归属' }]
  },
  {
    prop: 'poster_id',
    label: '海报位置',
    type: 'select',
    attr: {
      placeholder: '请选择'
    },
    rules: [{ required: true, message: '请选择海报位置' }]
  },
  {
    prop: 'sub_line',
    label: '用户类型',
    type: 'radio',
    attr: {
      border: true,
      placeholder: '请选择'
    },
    rules: [{ required: true, message: '请选择用户类型' }]
  },
  {
    prop: 'area',
    label: '用户地区',
    type: 'radio',
    attr: {
      border: true
    },
    options: areas,
    rules: [{ required: true, message: '用户地区不能为空' }]
  },
  {
    prop: 'poster_name',
    label: '海报标题',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入海报标题',
      maxlength: 20,
      showWordLimit: true
    },
    rules: [{ required: true, message: '海报标题不能为空' }]
  },
  {
    prop: 'individualization',
    label: '海报类型',
    type: 'radio', // 输入框,
    attr: {
      border: true
    },
    options: [
      { value: '0', label: '标准海报' },
      { value: '1', label: '个性化海报' }
    ],
    defaultVal: '0',
    rules: [{ required: true, message: '海报类型不能为空' }]
  },
  {
    prop: 'poster_url',
    label: '海报图片',
    type: 'upload-media',
    mediaRules: {
      // width: 750,
      // height: 1334,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议750x1334像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: '海报图片不能为空' }]
  },
  {
    prop: 'individualization_url',
    label: '个性化海报制作图片',
    type: 'upload-media',
    mediaRules: {
      // width: 750,
      // height: 1334,
      size: 0.390625,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '尺寸：建议750x1334像素；图片大小不超过400KB'
    },
    rules: [{ required: true, message: '图片不能为空' }]
  },
  {
    prop: 'copywriting',
    label: '海报文案1',
    type: 'input',
    attr: {
      type: 'textarea',
      maxlength: 99,
      showWordLimit: true
    },
    rules: [{ required: true, message: '海报文案不能为空' }]
  },
  {
    prop: 'copywriting2',
    label: '海报文案2',
    type: 'input',
    attr: {
      type: 'textarea',
      maxlength: 99,
      showWordLimit: true
    }
  },
  {
    prop: 'copywriting3',
    label: '海报文案3',
    type: 'input',
    attr: {
      type: 'textarea',
      maxlength: 99,
      showWordLimit: true
    }
  },
  {
    prop: 'type',
    label: '海报样式',
    type: 'radio',
    rules: [{ required: true, message: '海报样式必选' }]
  }
]

export const actions = ({ preview, back }) => {
  return {
    back: {
      hide: true
    },
    preview: {
      label: '预览',
      click: preview,
      type: 'button',
      attr: {
        icon: 'el-icon-view',
        type: 'primary',
        plain: true
      }
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
