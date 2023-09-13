import store from '@/store'

export const columns = [
  {
    prop: 'currentActivityCodeNo',
    label: '当前场次',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'userId',
    label: '中奖人ID',
    align: 'center',
    minWidth: 150
  },
  {
    prop: 'businessType',
    label: '中奖业务线',
    align: 'center',
    minWidth: 100,
    render: (_, data) => store.getters.baseDataMap.activity_business_type_map[data]
  },
  {
    prop: 'status',
    label: '是否领取',
    align: 'center',
    minWidth: 100,
    render: (_, data) => +data === 2 ? '是' : '否'
  }
]
