import { FRAMING_ADMIN_SELECT, FRAMING_ADMIN_PICTUREBOX, FRAMING_ADMIN_STATUS } from '@/utils/enum'
const actionTabList = ['101', '105']
export default (actionTab, options) => [
  {
    prop: 'workFrameCategoryId',
    label: '裱框分类',
    type: 'select',
    attr: {
      placeholder: '请选择裱框分类'
    },
    options,
    rules: [{ required: true, message: '裱框类型不能为空' }]
  },
  {
    prop: 'type',
    label: '裱框类型',
    type: 'select', // 输入框,
    attr: {
      placeholder: '请选择裱框类型'
    },
    // visible: actionTab !== '101' ? false : undefined,
    options: FRAMING_ADMIN_SELECT.filter(res => res.value > 0),
    rules: [{ required: true, message: '裱框类型不能为空' }]
  },
  {
    prop: 'backgroundUrl',
    label: '背景原图',
    type: 'upload-media', // 上传,
    mediaRules: {
      size: 3,
      media: 'img',
      type: 'PNG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '支持文件类型png, 图片尺寸750*1000px，大小在3M以内'
    },
    rules: [
      { required: true, message: '背景原图不能为空' }
    ]
  },
  {
    prop: 'needPicture',
    label: '是否为大片',
    visible: actionTabList.includes(actionTab) ? false : undefined,
    type: 'radio', // 输入框,
    defaultVal: '0',
    options: [
      {
        label: '否',
        value: '0'
      },
      {
        label: '是',
        value: '1'
      }
    ]
  },
  {
    prop: 'newPictureBox',
    label: '上传相框',
    visible: actionTabList.includes(actionTab) ? false : undefined,
    type: 'radio', // 输入框,
    defaultVal: '1',
    options: [
      {
        label: '4张切图',
        value: '1'
      },
      {
        label: '8张切图',
        value: '2'
      }
    ],
    rules: [{ required: true, message: '相框不能为空' }]
  },
  {
    prop: 'pictureBox',
    label: '相框',
    visible: !actionTabList.includes(actionTab) ? false : undefined,
    type: 'select', // 输入框,
    attr: {
      placeholder: '请选择相框'
    },
    options: FRAMING_ADMIN_PICTUREBOX,
    rules: [{ required: true, message: '相框不能为空' }]
  },
  {
    prop: 'compressPicUrl',
    label: ' ',
    visible: actionTabList.includes(actionTab) ? false : undefined,
    type: 'upload', // 输入框,
    attr: {
      action: 'text',
      notImg: true
    },
    mediaRules: {
      multiple: false,
      size: 1000,
      type: 'ZIP'
    },
    note: !actionTabList.includes(actionTab),
    noteConfig: {
      type: 'text',
      text: '请上传格式为zip的压缩包文件，文件中切图数量请与相框选项一致'
    }
  },
  {
    prop: 'coordinate',
    label: '坐标值',
    slot: 'coordinate',
    rules: [{ required: true, message: '请确认已添加所有坐标值' }]
  },
  {
    prop: 'paper',
    label: '是否有卡纸',
    visible: actionTabList.includes(actionTab) ? false : undefined,
    type: 'radio', // 输入框,
    defaultVal: '0',
    options: [
      {
        label: '无',
        value: '0'
      },
      {
        label: '有',
        value: '1'
      }
    ]
  },
  {
    prop: 'paperJamUrl',
    label: '卡纸图',
    visible: actionTabList.includes(actionTab) ? false : undefined,
    type: 'upload-media', // 上传,
    mediaRules: {
      size: 3,
      media: 'img',
      type: 'PNG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '支持文件类型png, 图片尺寸150*200px，大小在3M以内'
    },
    rules: [
      { required: true, message: '卡纸图不能为空' }
    ]
  },
  {
    prop: 'paperJamMargin',
    label: '卡纸边距',
    visible: actionTabList.includes(actionTab) ? false : undefined,
    type: 'inputNumber', // 输入框,
    rules: [{ required: true, message: '请填写卡纸边距' }],
    attr: {
      min: -2147483648,
      max: 2147483648,
      controlsPosition: 'right',
      class: 'input-number-left'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '单位为px'
    }
  },
  {
    prop: 'angle',
    label: '旋转角度',
    type: 'inputNumber', // 输入框,
    attr: {
      placeholder: '输入旋转角度',
      min: -2147483648,
      max: 2147483648,
      controlsPosition: 'right',
      class: 'input-number-left'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '左旋转为负，右旋转为正'
    }
  },
  {
    prop: 'thumbnail',
    label: '缩略图',
    type: 'upload-media', // 上传,
    mediaRules: {
      size: 3,
      media: 'img',
      type: 'PNG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '支持文件类型png, 图片尺寸150*200px，大小在3M以内'
    },
    rules: [{ required: !actionTabList.includes(actionTab), message: '缩略图不能为空' }]
  },
  {
    prop: 'sort',
    label: '排序',
    type: 'inputNumber', // 输入框,
    attr: {
      placeholder: '请输入排序',
      min: 1,
      max: 2147483648,
      controlsPosition: 'right',
      class: 'input-number-left'
    },
    rules: [{ required: true, message: '排序不能为空' }]
  },
  {
    prop: 'status',
    label: '是否上架',
    defaultVal: 0,
    type: 'select', // 输入框,
    attr: {
      placeholder: '请选择'
    },
    options: FRAMING_ADMIN_STATUS.filter(res => res.value > -1)
  }
]

export const actions = ({ back }) => {
  return {
    back: {
      hide: true
    },
    uback: {
      label: '取消',
      click: back,
      type: 'button',
      attr: {
        icon: 'el-icon-back'
      }
    }
  }
}
