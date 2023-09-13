// import moment from 'moment'

export default [
  {
    prop: 'businessTypeName',
    label: '业务线',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'groupName',
    label: '人群名称',
    align: 'center',
    width: 180
  },
  {
    prop: 'couponCode',
    label: '券码信息',
    align: 'center',
    minWidth: 330,
    render: (h, _, row) => h('div', {}, `ID：${row.couponCode}, 名称：${row.couponName}, 发${row.couponCount}张`)
  },
  {
    prop: 'yffCount',
    label: '已发放数量',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'yhxCount',
    label: '已核销数量',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'ygqCount',
    label: '已过期数量',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'orderTotalAmount',
    label: '订单总金额',
    align: 'center',
    minWidth: 100
  }
]
