import $store from '@/store'

export default [
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select', // 选择器,
    rules: [
      // 校验
      { required: true, message: '请选择业务线！' }
    ],
    attr: {
      clearable: true
    },
    options: $store?.state?.communityCouponCodeManage?.baseData.business
  },
  {
    prop: 'groupId',
    label: '人群名称',
    type: 'select',
    defaultVal: '',
    rules: [
      // 校验
      { required: true, message: '请选择人群！' }
    ],
    attr: {
      clearable: true,
      filterable: true
    },
    options: []
  },
  {
    prop: 'sendType',
    label: '发放方式',
    type: 'select',
    defaultVal: '',
    rules: [
      // 校验
      { required: true, message: '请选择发放方式！' }
    ],
    attr: {
      clearable: true
    },
    options: $store?.state?.communityCouponCodeManage?.baseData.sendWay
  },
  {
    prop: 'couponType',
    label: '券码类型',
    type: 'radio',
    rules: [{ required: true, message: '请选择券码类型！' }],
    options: [
      { label: '满减券', value: 'REDUCE' },
      { label: '折扣券', value: 'DISCOUNT' },
      { label: '兑换券', value: 'EXCHANGE' }
    ]
  },
  {
    prop: 'list',
    slot: 'list'
  },
  {
    prop: 'titleCenter',
    slot: 'titleCenter'
  },
  {
    prop: 'shareText',
    label: '小程序分享文案',
    type: 'input',
    attr: {
      // type: 'textarea',
      maxlength: 20,
      showWordLimit: true
    }
  },
  {
    prop: 'appletImg',
    label: '小程序封面图',
    type: 'upload', // 上传,
    note: true,
    noteConfig: {
      type: 'text',
      text: '支持图片上传，图片格式支持JPG/PNG'
    },
    attr: {
      action: 'picture-card',
      listType: 'picture-card'
    }
  },
  {
    prop: 'couponAmount',
    label: '券包金额',
    type: 'input',
    attr: {
      // type: 'textarea',
      maxlength: 20,
      showWordLimit: true
    }
  },
  {
    prop: 'couponName',
    label: '券包名称',
    type: 'input',
    attr: {
      // type: 'textarea',
      maxlength: 20,
      showWordLimit: true
    }
  },
  {
    prop: 'couponDesc',
    label: '券包描述',
    type: 'input',
    attr: {
      type: 'textarea',
      maxlength: 100,
      showWordLimit: true
    }
  }
]

export const formActions = () => {
  return {
    submit: {
      hide: false // 是否显示 默认false
    },
    reset: {
      hide: true
    },
    back: {
      hide: true
    },
    cancel: {
      hide: true
    }
  }
}
