export default [
  {
    prop: 'id',
    label: '课程ID',
    align: 'center',
    width: 120
  },
  {
    prop: 'name',
    label: '课程名称',
    align: 'center'
  },
  {
    action: true,
    name: 'action',
    width: 120,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    action: (_, row) => {
      return row.checked
        ? [
          {
            type: 'button',
            label: '选择',
            click: (_, row) => handleTableAction('edit', row),
            attr: {
              size: 'mini',
              type: 'text'
            }
          }
        ]
        : [
          {
            type: 'text',
            label: '已选择'
          }
        ]
    }
  }
}
