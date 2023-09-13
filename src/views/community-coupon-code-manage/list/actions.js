export default ({ batchControl }) => {
  return [
    {
      type: 'button', // 按钮
      label: '批量启用',
      click: () => batchControl(1),
      attr: {
        type: 'primary',
        plain: true,
        icon: 'el-icon-check'
      }
    },
    {
      type: 'button', // 按钮
      label: '批量停用',
      click: () => batchControl(0),
      attr: {
        type: 'warning',
        plain: true,
        icon: 'el-icon-close'
      }
    }
  ]
}
