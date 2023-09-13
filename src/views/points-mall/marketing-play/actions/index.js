export default ({ add }) => {
  return [
    {
      type: 'button', // 按钮
      label: '新增',
      click: add,
      // align: 'right',
      attr: {
        type: 'primary',
        plain: true,
        icon: 'el-icon-plus'
      }
    }
  ]
}
