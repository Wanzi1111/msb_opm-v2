export default [
  {
    prop: 'type',
    label: '商品类型',
    type: 'select', // 选择器,
    options: [
      {
        label: '卡密',
        value: 'CARD_CODE'
      },
      {
        label: '活动',
        value: 'ACTIVITY'
      },
      {
        label: '课时',
        value: 'CLASS'
      },
      {
        label: '现金',
        value: 'CASH'
      },
      {
        label: '轻课',
        value: 'THIRD_COURSE'
      }
    ],
    attr: {
      placeholder: '全部类型'
    }
  },
  {
    prop: 'goodsName',
    label: '名称/编码',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入商品名称/编码'
    }
  }
]
