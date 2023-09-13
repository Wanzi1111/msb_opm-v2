export default ({ create, type }) => {
  return [
    {
      type: 'button',
      label: `新建配置`,
      click: create,
      align: 'right',
      attr: {
        type: 'primary',
        plain: false,
        icon: 'el-icon-plus'
      }
    }
  ]
}
