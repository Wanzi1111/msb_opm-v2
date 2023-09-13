export default ({ handleExport }) => {
  return [
    {
      type: 'button', // 按钮
      label: '导出',
      click: handleExport,
      attr: {
        // type: 'primary',
        plain: true,
        icon: 'el-icon-download'
      },
      align: 'right'
    }
  ]
}
