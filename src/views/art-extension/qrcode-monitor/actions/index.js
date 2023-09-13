export default ({ manualRefresh }) => {
  return [
    {
      type: 'button',
      label: '手动刷新',
      click: manualRefresh,
      align: 'right',
      attr: {
        type: 'primary',
        plain: true,
        size: 'small',
        icon: 'el-icon-refresh'
      }
    }
  ]
}
