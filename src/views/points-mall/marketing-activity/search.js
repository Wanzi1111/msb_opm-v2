import allEnum from '@/utils/enum'

export default [
  {
    prop: 'activityName',
    label: '活动名称',
    type: 'input',
    attr: {
      placeholder: '请输入',
      clearable: true
    }
  },
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select',
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: [...allEnum.marketing_activity_line]
  },
  {
    prop: 'time',
    label: '活动时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'status',
    label: '活动状态',
    type: 'select',
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: [
      { label: '未开始', value: 'NOT_STARTED' },
      { label: '进行中', value: 'RUNNING' },
      { label: '已结束', value: 'END' },
      { label: '已下架', value: 'DISABLED' }
    ]
  }
]
