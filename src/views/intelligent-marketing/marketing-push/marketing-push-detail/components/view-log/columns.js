import moment from 'moment'

export default [
  {
    prop: 'utime',
    label: '日期',
    align: 'center',
    minWidth: 100,
    render: (_, date) => moment(+date).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    prop: 'operationName',
    label: '变更人',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'operationType',
    label: '变更类型',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'operationContent',
    label: '具体内容',
    align: 'center',
    minWidth: 200
  }
]
