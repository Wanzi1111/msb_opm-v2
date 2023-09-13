import moment from 'moment'

export default [
  {
    prop: 'groupName',
    label: '消息组名称',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'subGroupCount',
    label: '二级消息组数量',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'displaySort',
    label: '排序',
    align: 'center',
    minWidth: 80
  },
  {
    prop: 'closingRate',
    label: 'C端关闭率',
    align: 'center',
    minWidth: 80,
    render: (_, data) => `${(data * 100).toFixed(2)}%`
  },
  {
    prop: 'status',
    label: '状态',
    align: 'center',
    action: true,
    name: 'status',
    minWidth: 80
  },
  {
    prop: 'ctime',
    label: '创建时间',
    align: 'center',
    minWidth: 180,
    render: (_, data) => data ? moment(+data).format('YYYY-MM-DD HH:mm:ss') : '--'
  },
  {
    action: true,
    name: 'action',
    width: 220,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    status: (status) => {
      return [
        {
          type: 'switch',
          click: (_, row) => handleTableAction('status', row),
          attr: {
            value: +status === 1
          }
        }
      ]
    },
    action: () => {
      return [
        {
          type: 'button',
          label: '详情',
          click: (_, row) => handleTableAction('detail', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-view',
            type: 'default'
          }
        },
        {
          type: 'button',
          label: '编辑',
          click: (_, row) => handleTableAction('edit', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-edit',
            type: 'default'
          }
        },
        {
          type: 'button',
          label: '删除',
          click: (_, row) => handleTableAction('del', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-delete',
            type: 'warning'
          }
        }
      ]
    }
  }
}
