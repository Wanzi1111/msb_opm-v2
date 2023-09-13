export default () => {
  return [
    // {
    //   prop: 'id',
    //   label: '位置ID',
    //   align: 'center',
    //   width: 100,
    //   fixed: true
    // },
    {
      prop: 'recommendationTag',
      label: '推荐位置',
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
export const actions = ({ edit }) => {
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
        }
      ]
    }
  }
}
