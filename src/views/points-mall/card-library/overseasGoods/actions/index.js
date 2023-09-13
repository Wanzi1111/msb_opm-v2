export default ({ exports, imports }) => {
  return [
    {
      type: 'button', // 按钮
      label: '批量导出',
      align: 'right',
      click: exports,
      attr: {
        icon: 'el-icon-download'
      }
    },
    {
      type: 'button', // 按钮
      label: '批量充值',
      align: 'right',
      click: imports,
      attr: {
        type: 'primary'
      }
    }
  ]
}
