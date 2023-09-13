export default ({ add, sort, disabled }) => {
  console.log('disabled', disabled)
  return [
    {
      prop: 'create',
      type: 'button', // 按钮
      label: '创建裱框',
      click: add,
      attr: {
        type: 'primary',
        plain: true,
        icon: 'el-icon-plus'
      }
    },
    {
      prop: 'total', // 添加 prop 为可配置actions
      type: 'span', // 文本
      label: 'total',
      align: 'right',
      attr: {
        style: 'color: slategrey;'
      }
    },
    {
      type: 'button', // 按钮
      label: '倒序/正序',
      click: sort,
      align: 'right',
      attr: {
        icon: 'el-icon-sort'
        // style: 'margin-right: 100px'
      }
    }
  ]
}
