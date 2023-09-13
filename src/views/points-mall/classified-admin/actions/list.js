export default ({ newClassified }) => {
  return [
    {
      type: 'button', // 按钮
      label: '新建分类',
      click: newClassified,
      attr: {
        type: 'primary',
        plain: true,
        icon: 'el-icon-plus'
      }
    }
  ]
}
