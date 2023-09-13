import store from '@/store'

export default [
  {
    prop: 'status',
    label: '活动状态',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: store.getters.baseData.activity_status
  },
  {
    prop: 'activityTitle',
    label: '活动标题',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: store.getters.baseData.activity_business_type
  }
]
