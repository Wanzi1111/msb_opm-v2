export default [
  {
    align: 'center',
    width: 60,
    type: 'selection',
    fixed: true
  },
  {
    prop: 'ctime',
    label: '兑换日期',
    minWidth: 180,
    align: 'center'
  },
  {
    prop: 'orderId',
    label: '兑换订单',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'userId',
    label: '用户ID',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'goodsName',
    label: '商品名称',
    minWidth: 160,
    align: 'center'
  },
  {
    prop: 'goodsEpc',
    label: '商品编码',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'countryCode',
    label: '国家',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'status',
    label: '状态',
    minWidth: 120,
    align: 'center',
    render: (h, dat) => {
      let tag
      switch (dat) {
        case 0:
          tag = h('el-tag', { props: { type: 'warning' }}, '未充值')
          break
        case 1:
          tag = h('el-tag', { props: { type: 'success' }}, '已充值')
          break
        case 2:
          tag = h('el-tag', { props: { type: 'success' }}, '已取消')
          break
      }
      return tag
    }
  },
  {
    prop: 'partySerialNo',
    label: '第三方支付流水号',
    minWidth: 180,
    align: 'center'
  },
  {
    prop: 'importTime',
    label: '充值时间',
    minWidth: 180,
    align: 'center'
  },
  {
    prop: 'action',
    label: '操作',
    action: true,
    minWidth: 180,
    align: 'center',
    fixed: 'right',
    name: 'action'
  }
]

export const actions = ({ recharge, cancel }) => {
  return {
    action: (dat, row, index) => {
      if (row.status === 'RECHARGED') {
        return [
          {
            type: 'button',
            label: '已充值',
            attr: {
              type: 'success',
              size: 'mini'
            }
          },
          {
            type: 'button',
            label: '取消充值',
            click: () => cancel(row.id),
            attr: {
              type: 'warning',
              size: 'mini'
            }
          }
        ]
      } else if (row.status === 'CANCEL' || row.status === 'FAIL') {
        return [
          {
            type: 'button',
            label: '已取消',
            attr: {
              type: 'danger',
              size: 'mini'
            }
          }
        ]
      } else {
        return [
          {
            type: 'button',
            label: '充值',
            click: () => recharge(row.orderId),
            attr: {
              type: 'primary',
              size: 'mini'
            }
          },
          {
            type: 'button',
            label: '取消充值',
            click: () => cancel(row.orderId),
            attr: {
              type: 'warning',
              size: 'mini'
            }
          }
        ]
      }
    }
  }
}
