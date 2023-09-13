export default ({ classification, toAddAd }) => {
  return [
    {
      type: 'button', // 按钮
      label: '添加活动',
      click: toAddAd,
      attr: {
        type: 'primary'
      },
      align: 'right'
    },
    {
      type: 'button', // 按钮
      label: '分类管理',
      click: classification,
      attr: {
        type: 'primary'
      },
      align: 'right'
    }
  ]
}
