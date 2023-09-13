export default ({ exportOder, exportProfit }) => {
  return [
    {
      type: 'button',
      label: '导出订单记录',
      click: exportOder,
      align: 'right',
      attr: {
        type: 'primary',
        plain: true,
        size: 'small',
        icon: 'el-icon-shopping-cart-full'
      }
    },
    {
      type: 'button', // 按钮
      label: '导出收益记录',
      click: exportProfit,
      align: 'right',
      attr: {
        type: 'primary',
        size: 'small',
        plain: true,
        icon: 'el-icon-s-data'
      }
    }
  ]
}
