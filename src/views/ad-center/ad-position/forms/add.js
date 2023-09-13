import store from '@/store'
export default [
  {
    prop: 'bussinessName',
    label: '业务线',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择业务线'
    },
    options: store.getters.operatConfig.businessType,
    rules: [{ required: true, message: '业务线不能为空' }]
  },
  {
    prop: 'clientType',
    label: '客户端',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择客户端'
    },
    options: store.getters.operatConfig.clientType,
    rules: [{ required: true, message: '客户端不能为空' }]
  },
  {
    prop: 'classificationName',
    label: '广告类型',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择'
    },
    options: [],
    rules: [{ required: true, message: '广告类型不能为空' }]
  },
  {
    prop: 'advertType',
    label: '广告位名称',
    type: 'input',
    attr: {
      placeholder: '请输入'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '例：首页-banner'
    },
    rules: [
      { required: true, message: '请输入位置名称' }
    ]
  },
  {
    prop: 'sizeId',
    label: '广告尺寸',
    type: 'select', // 选择器,
    attr: {
      placeholder: '请选择'
    },
    options: [],
    rules: [{ required: true, message: '广告尺寸不能为空' }]
  },
  // {
  //   prop: 'totalCount',
  //   label: '广告数量',
  //   type: 'inputNumber', // 计数器,
  //   defaultVal: 1,
  //   rules: [{ required: true, message: '广告数量不能为空' }],
  //   note: true,
  //   noteConfig: {
  //     type: 'text',
  //     text: '正整数1~9，默认1'
  //   },
  //   attr: {
  //     class: 'custom-input-num',
  //     min: 1,
  //     max: 9,
  //     placeholder: '请输入'
  //   }
  // },
  {
    prop: 'coverUrl',
    label: '预览图片',
    type: 'upload-media', // 上传,
    mediaRules: {
      size: 3,
      media: 'img',
      type: 'GIF,PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '请上传3MB以下广告位的预览图片，支持GIF、PNG、JPG和JPEG格式'
    }
    // rules: [{ required: true, message: '预览图不能为空' }]
  }
  // {
  //   prop: 'enabled',
  //   label: '是否开启',
  //   type: 'switch',
  //   rules: [{ required: true }],
  //   defaultVal: true,
  //   attr: {
  //     activeColor: '#13ce66'
  //   }
  // }
]

export const actions = ({ quit, label = '新增' }) => {
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
