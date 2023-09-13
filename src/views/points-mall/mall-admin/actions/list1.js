export default ({ add, setRate, setRates, batchUpShelf, batchDownShelf }) => {
  return [
    {
      type: 'button', // 按钮
      label: '新增',
      click: add,
      attr: {
        type: 'primary',
        plain: true,
        icon: 'el-icon-plus'
      }
    },
    {
      type: 'button', // 按钮
      label: '设置金币汇率',
      click: setRate,
      attr: {
        type: 'primary',
        plain: true
      }
    },
    {
      type: 'button', // 按钮
      label: '设置课时汇率',
      click: setRates,
      attr: {
        type: 'primary',
        plain: true
      }
    },
    {
      type: 'button', // 按钮
      label: '批量上架',
      click: batchUpShelf,
      attr: {
        type: 'primary',
        plain: true
      }
    },
    {
      type: 'button', // 按钮
      label: '批量下架',
      click: batchDownShelf,
      attr: {
        type: 'primary',
        plain: true
      }
    }
  ]
}
