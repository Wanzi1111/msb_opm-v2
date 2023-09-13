
export default [
  {
    prop: 'type',
    label: '商品类型',
    type: 'select',
    options: [
      {
        label: '实物',
        value: 'INKIND'
      },
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
        label: '虚拟权益',
        value: 'CURRICULUM'
      },
      {
        label: '轻课程',
        value: 'THIRD_COURSE'
      }
    ],
    attr: {
      clearable: true,
      placeholder: '全部'
    }
  },
  {
    prop: 'goodsTitle',
    label: '商品名称',
    type: 'input',
    attr: {
      clearable: true,
      placeholder: '请输入商品名称'
    }
  }
]

