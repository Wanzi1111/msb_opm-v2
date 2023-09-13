import { authRange as options, statusEnum } from '../../enum'

export default [
  {
    prop: 'activityTitle',
    label: '活动名称',
    type: 'input',
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'time',
    label: '活动时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      clearable: true,
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
      clearable: true,
      placeholder: '全部'
    },
    options: statusEnum
  },
  {
    prop: 'authRange',
    label: '业务线',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options
  }
]
