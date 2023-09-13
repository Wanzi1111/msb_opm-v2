export default ({ editMultipleGoods, refreshGoods }) => {
  return [
    {
      type: 'button', // 按钮
      label: '批量修改',
      click: editMultipleGoods,
      attr: {
        type: 'primary',
        plain: true,
        icon: 'el-icon-edit-outline'
      }
    },
    {
      type: 'button', // 按钮
      label: '刷新商品',
      click: refreshGoods,
      attr: {
        type: 'success',
        plain: true,
        icon: 'el-icon-refresh'
      }
    }
  ]
}
