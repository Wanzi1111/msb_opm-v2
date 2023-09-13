export default ({ toAddAd, classification }) => {
  return [
    {
      prop: 'radioValue',
      slot: 'radio'
    },
    {
      type: 'button', // 按钮
      label: '新建广告位',
      click: toAddAd,
      attr: {
        type: 'primary',
        plain: true,
        icon: 'el-icon-plus'
      },
      align: 'right'
    },
    {
      type: 'button', // 分类管理
      label: '分类管理',
      click: classification,
      attr: {
        type: 'primary',
        plain: true
      },
      align: 'right'
    }
  ]
}
