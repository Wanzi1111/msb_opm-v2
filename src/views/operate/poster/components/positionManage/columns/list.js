export default () => {
  return [
    {
      prop: 'id',
      label: '位置ID',
      align: 'center',
      width: 100,
      fixed: true
    },
    {
      prop: 'position',
      label: '海报位置',
      align: 'center',
      minWidth: 110
    },
    {
      action: true,
      name: 'action',
      width: 230,
      prop: 'action',
      label: '操作',
      align: 'center',
      fixed: 'right'
    }
  ]
}
export const actions = ({ edit, startOrEnd }) => {
  return {
    action: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '编辑',
          click: () => edit(dat, row),
          attr: {
            size: 'mini',
            icon: 'el-icon-edit',
            type: 'primary'
          }
        },
        {
          type: 'button', // popconfirm时 可设置button与popconfirm两个元素的任何属性
          label: `${row.del === '0' ? '停用' : '启用'}`, // button 属性
          click: (dat, row) => startOrEnd(~~!+row.del, row),
          attr: {
            icon: 'el-icon-view',
            size: 'mini',
            plain: !!row.del,
            type: row.del === '0' ? 'danger' : 'success'
          }
        }
      ]
    }
  }
}
