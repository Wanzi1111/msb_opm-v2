import store from '@/store'
let business = store.getters.mallConfig.businessType?.filter(item => item.id !== '3')
business = business.map(item => {
  item.value = item.businessType
  item.label = item.name
  return item
})

const classValueone = [
  {
    label: '全部类型',
    value: ''
  },
  {
    label: '实物',
    value: 'INKIND'
  },
  {
    label: '卡密',
    value: 'CARD_CODE'
  },
  {
    label: '课时',
    value: 'CLASS'
  }
]

const classValue = [
  {
    label: '全部类型',
    value: ''
  },
  {
    label: '实物',
    value: 'INKIND'
  },
  {
    label: '卡密',
    value: 'CARD_CODE'
  },
  {
    label: '现金',
    value: 'CASH'
  },
  {
    label: '轻课',
    value: 'THIRD_COURSE'
  }
]

export {
  business,
  classValue,
  classValueone
}
