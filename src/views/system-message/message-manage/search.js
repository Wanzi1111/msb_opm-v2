export default [
  {
    prop: 'status',
    label: '是否启用',
    type: 'select',
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
  },
  {
    prop: 'time',
    label: '创建时间',
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
