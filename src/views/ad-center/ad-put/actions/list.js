export default ({ download, toAddAd }) => {
  return [
    {
      prop: 'radioValue',
      slot: 'radio'
    },
    {
      type: 'button', // 按钮
      label: '新建投放',
      click: toAddAd,
      attr: {
        type: 'primary',
        plain: true,
        icon: 'el-icon-plus'
      },
      align: 'right'
    },
    {
      type: 'button', // 按钮
      label: '下载数据',
      click: download,
      attr: {
        type: 'primary'
      },
      align: 'right'
    }
  ]
}
