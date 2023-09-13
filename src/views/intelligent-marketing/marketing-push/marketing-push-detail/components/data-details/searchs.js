import moment from 'moment'

export default [
  {
    prop: 'createTime',
    label: '日期',
    type: 'dateTimePicker',
    layer: 'middle',
    defaultVal: [`${moment().subtract(7, 'days').format('YYYY-MM-DD')}`, `${moment().format('YYYY-MM-DD')}`],
    attr: {
      placeholder: '全部',
      clearable: true,
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59']
      // valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  }
]
