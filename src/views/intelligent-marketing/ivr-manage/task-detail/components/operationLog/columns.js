import moment from 'moment'

export default [
  {
    prop: 'ctime',
    label: '日期',
    align: 'center',
    minWidth: 100,
    render: (_, date) => moment(+date).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    prop: 'operator',
    label: '变更人',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'modifyType',
    label: '变更类型',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'content',
    label: '具体内容',
    align: 'center',
    showOverflowTooltip: true,
    minWidth: 200
  }
]
