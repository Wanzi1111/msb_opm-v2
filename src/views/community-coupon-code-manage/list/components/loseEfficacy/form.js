import $store from '@/store'

export default [
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select', // 选择器,
    rules: [
      { required: true, message: '请选择业务线！' }
    ],
    attr: {
      clearable: true
    },
    options: $store?.state?.communityCouponCodeManage?.baseData.business
  },
  {
    prop: 'groupId',
    label: '选择人群',
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
    prop: 'file',
    slot: 'file'
  },
  {
    prop: 'operationType',
    label: '操作',
    type: 'radio',
    rules: [
      // 校验
      { required: true, message: '请选择操作方式！' }
    ],
    attr: {
      clearable: true
    },
    options: [
      {
        value: '0',
        label: '失效'
      }, {
        value: '1',
        label: '补发'
      }
    ]
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
