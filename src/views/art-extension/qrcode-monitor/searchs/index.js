import moment from 'moment'

export default [
  {
    prop: 'reportTime',
    label: '报名时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    defaultVal: [`${moment().subtract(1, 'months').unix() * 1000}`, `${moment().unix() * 1000}`],
    attr: {
      clearable: true,
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'timestamp'
    }
  },
  {
    prop: 'dataTime',
    label: '数据时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    defaultVal: [`${moment().subtract(1, 'months').unix() * 1000}`, `${moment().unix() * 1000}`],
    attr: {
      clearable: true,
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'timestamp'
    }
  },
  {
    prop: 'spreadUserId',
    label: '推广大使id',
    type: 'input', // 输入框,
    attr: {
      clearable: true,
      placeholder: '请输入推广大使id'
    }
  }
]
