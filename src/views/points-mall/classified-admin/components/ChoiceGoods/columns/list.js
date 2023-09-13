import moment from 'moment'
export default [
  {
    align: 'center',
    width: 60,
    type: 'selection',
    fixed: true
  },
  {
    prop: 'epc',
    label: '商品编码',
    align: 'center',
    slot: 'id'
  },
  {
    prop: 'goodsName',
    label: '商品标题',
    align: 'center'
  },
  {
    prop: 'imGoodsPaymentList',
    slot: 'imGoodsPaymentList',
    label: '商品兑换价',
    align: 'center'
  },
  {
    prop: 'utime',
    label: '当前更新时间',
    align: 'center',
    render: (h, dat, row, index) => {
      return h(
        'i',
        { props: { class: 'el-icon-time' }},
        moment(+dat).format('YYYY-MM-DD HH:mm:ss')
      )
    }
  },
  {
    action: true,
    name: 'action',
    prop: 'action',
    label: '操作',
    align: 'center'
  }
]

export const actions = ({ editGoods }) => {
  return {
    action: (dat, row, index) => {
      const { stStatus } = row
      return [
        {
          type: 'button',
          label: '修改分类',
          click: () => editGoods(row),
          attr: {
            disabled: stStatus,
            size: 'mini',
            icon: 'el-icon-edit',
            type: 'primary'
          }
        }
      ]
    }
  }
}
