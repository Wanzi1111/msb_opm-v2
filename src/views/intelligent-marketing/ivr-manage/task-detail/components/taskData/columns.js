export default [
  {
    prop: 'id',
    label: '序号',
    align: 'center',
    width: 80
  },
  {
    prop: 'date',
    label: '日期',
    align: 'center',
    minWidth: 180
  },
  {
    prop: 'importQuantity',
    label: '当日实际导入任务数',
    align: 'center',
    minWidth: 180
  },
  {
    prop: 'callQuantity',
    label: '当日呼叫数',
    align: 'center',
    minWidth: 180
  },
  {
    prop: 'connectQuantity',
    label: '当日接通数',
    align: 'center',
    minWidth: 180
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    action: () => {
      return [
        {
          type: 'button',
          label: '编辑',
          click: (_, row) => handleTableAction('edit', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-edit',
            type: 'default'
          }
        }
      ]
    }
  }
}
