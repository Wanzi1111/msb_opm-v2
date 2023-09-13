export default ({ add, calculates }) => {
  return [
    {
      type: 'button', // 按钮
      label: '添加奖品',
      click: add,
      align: 'right',
      attr: {
        type: 'primary',
        plain: true
      }
    },
    {
      type: 'button', // 按钮
      label: '概率测算',
      click: calculates,
      align: 'right',
      attr: {
        type: 'primary',
        plain: true
      }
    }
  ]
}
