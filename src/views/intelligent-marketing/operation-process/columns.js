import moment from 'moment'

export default [
  {
    prop: 'eventName',
    label: '计划名称',
    align: 'center',
    slot: 'eventName',
    width: 180
  },
  {
    prop: 'imageList',
    label: '流程图',
    align: 'center',
    slot: 'imageList',
    width: 180
  },
  {
    prop: 'ctime',
    label: '创建时间',
    align: 'center',
    minWidth: 180,
    render: (_, data) => data ? moment(+data).format('YYYY-MM-DD HH:mm:ss') : ''
  },
  {
    prop: 'userName',
    label: '负责人',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'operationName',
    label: '操作人',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'utime',
    label: '最近更新时间',
    align: 'center',
    minWidth: 180,
    render: (_, data) => data ? moment(+data).format('YYYY-MM-DD HH:mm:ss') : ''
  },
  {
    action: true,
    name: 'action',
    width: 130,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    action: (_, row) => {
      return [
        {
          type: 'button',
          label: '删除',
          click: (_, row) => handleTableAction('del', row),
          attr: {
            size: 'mini',
            type: 'warning'
          }
        },
        {
          type: 'button',
          label: '编辑',
          click: (_, row) => handleTableAction('edit', row),
          attr: {
            size: 'mini',
            type: 'default'
          }
        }
      ]
    }
  }
}
