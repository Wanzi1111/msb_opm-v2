import moment from 'moment'

export default [
  {
    prop: 'time',
    label: '选择时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    defaultVal: [`${moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss')}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`],
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  }
]
