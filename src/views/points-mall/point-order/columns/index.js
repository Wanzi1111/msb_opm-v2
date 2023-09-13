import $store from '@/store'

const idEnum = {
  1: '一对一',
  2: '小班课'
}

export const transferPrice = (type, { paymentType, coinAmount, coinAmountOriginal, rmbAmount, rmbAmountOriginal, classAmount, classAmountOriginal }) => {
  let text = ''
  if (type === 'payable') { // 订单应付
    switch (paymentType) {
      case 'COIN': {
        text = coinAmountOriginal + '金币'
        break
      }
      case 'CASH': {
        text = rmbAmountOriginal + '现金'
        break
      }
      case 'CLASS': {
        text = classAmountOriginal + '课时'
        break
      }
      case 'COINANDCASH': {
        text = coinAmountOriginal + '金币+' + rmbAmountOriginal + '现金'
        break
      }
    }
  } else { // 优惠金额
    switch (paymentType) {
      case 'COIN': {
        text = (coinAmountOriginal - coinAmount).toFixed(2) + '金币'
        break
      }
      case 'CASH': {
        text = (rmbAmountOriginal - rmbAmount).toFixed(2) + '现金'
        break
      }
      case 'CLASS': {
        text = (classAmountOriginal - classAmount).toFixed(2) + '课时'
        break
      }
      case 'COINANDCASH': {
        text = (coinAmountOriginal - coinAmount).toFixed(2) + '金币+' + (rmbAmountOriginal - rmbAmount).toFixed(2) + '现金'
        break
      }
    }
  }
  return text
}

export default () => [
  {
    prop: 'outTradeNo',
    label: '订单ID',
    align: 'center',
    width: 150,
    fixed: true
  },
  {
    prop: 'userId',
    minWidth: 180,
    label: '用户信息',
    align: 'center'
  },
  {
    prop: 'goodsType',
    label: '商品类型',
    align: 'center'
  },
  {
    prop: 'goodsName',
    label: '商品名称',
    align: 'center',
    minWidth: 180
  },
  {
    prop: 'goodsEpc',
    label: '商品编码',
    minWidth: 180,
    align: 'center'
  },
  {
    prop: 'buyTime',
    label: '下单时间',
    align: 'center',
    minWidth: 180
  },
  {
    prop: 'source',
    label: '订单类型',
    minWidth: 120,
    align: 'center'
  },
  // {
  //   prop: 'channel',
  //   label: '渠道来源',
  //   minWidth: 120,
  //   align: 'center',
  //   render: (_, data) => $store.state.pointsMallOrder.baseDataMap.channel[data] || '--'
  // },
  {
    prop: 'orderStatus',
    label: '订单状态',
    minWidth: 120,
    align: 'center',
    render: (h, dat) => {
      let tag
      switch (dat) {
        case '新建':
          tag = h('el-tag', { props: { type: '' }}, '新建')
          break
        case '已完成':
          tag = h('el-tag', { props: { type: 'success' }}, '已完成')
          break
        case '部分退款':
          tag = h('el-tag', { props: { type: 'warning' }}, '部分退款')
          break
        case '全部退款':
          tag = h('el-tag', { props: { type: 'danger' }}, '全部退款')
          break
      }
      return tag
    }
  },
  {
    prop: 'expressStatus',
    label: '物流状态',
    minWidth: 130,
    align: 'center',
    render: (h, dat) => {
      let tag = dat
      switch (dat) {
        case '待发货':
          tag = h('el-tag', { props: { type: 'warning' }}, '待发货')
          break
        case '已发货':
          tag = h('el-tag', { props: { type: '' }}, '已发货')
          break
        case '发货失败':
          tag = h('el-tag', { props: { type: 'danger' }}, '发货失败')
          break
        case '已签收':
          tag = h('el-tag', { props: { type: 'success' }}, '已签收')
          break
        case '已取消':
          tag = h('el-tag', { props: { type: 'info' }}, '已取消')
          break
      }
      return tag
    }
  },
  {
    prop: 'discountType',
    label: '活动类型',
    minWidth: 120,
    align: 'center',
    render: (h, data) => {
      const tagColor = ['info', '', 'success', 'warning', 'danger']
      const text = $store.state.pointsMallOrder.baseDataMap.disCount[data]
      return h('el-tag', { props: { type: tagColor[+data] || '', effect: 'plain' }}, text)
    }
  },
  {
    prop: 'appPaltform',
    label: '订单应付',
    minWidth: 120,
    align: 'center',
    render: (_, __, row) => transferPrice('payable', row)
  },
  {
    prop: 'appPaltform',
    label: '优惠金额',
    minWidth: 140,
    align: 'center',
    render: (_, __, row) => transferPrice('discount', row)
  },
  {
    prop: 'orderAmount',
    label: '订单实付金额',
    minWidth: 160,
    align: 'center',
    render: (h, dat, row) => {
      if (!row.userIdentity) {
        return dat || '--'
      } else {
        return dat && `${dat}(${idEnum[row.userIdentity] || '--'})` || '--'
      }
    }
  },
  {
    action: true,
    label: '操作',
    name: 'action',
    width: 120,
    align: 'center',
    fixed: 'right'
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    action: (_, row) => {
      return [
        {
          type: 'button',
          label: '查看订单',
          click: () => handleTableAction('viewDetail', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-view'
          }
        }
      ]
    }
  }
}
