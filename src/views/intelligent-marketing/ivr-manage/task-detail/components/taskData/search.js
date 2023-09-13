export default [
  {
    prop: 'time',
    label: '统计时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  }
]
