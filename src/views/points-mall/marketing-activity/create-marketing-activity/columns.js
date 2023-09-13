const { marketing_activity_goods_type_map } = window.baseDataMap

console.log('marketing_activity_goods_type_map', window.baseDataMap.marketing_activity_goods_type_map)

export default [
  {
    prop: 'id',
    label: '序号',
    align: 'center',
    minWidth: 50
  },
  {
    prop: 'goodsName',
    label: '秒杀商品',
    align: 'center',
    minWidth: 150
  },
  {
    prop: 'goodsEpc',
    label: '商品编码',
    align: 'center',
    minWidth: 200
  },
  {
    prop: 'goodsType',
    label: '商品类型',
    align: 'center',
    minWidth: 80,
    render: (_, data) => marketing_activity_goods_type_map[data]
  },
  {
    prop: 'status',
    label: '商品兑换价',
    align: 'center',
    minWidth: 140,
    render: (h, _, row) => {
      const { businessType, bearCoinPrice, oneToOneCoinPrice } = row
      if (businessType === '1') {
        return h('div', {}, `1对1：${oneToOneCoinPrice} 金币`)
      } else if (businessType === '2') {
        return h('div', {}, `小熊：${bearCoinPrice} 金币`)
      }
      return h('div', {}, [
        h('div', {}, `1对1：${oneToOneCoinPrice} 金币`),
        h('div', {}, `小熊：${bearCoinPrice} 金币`)
      ])
    }
  },
  {
    prop: 'line',
    label: '秒杀价',
    align: 'center',
    minWidth: 200,
    render: (h, _, row) => {
      const { oneGoodsPrice, bearGoodsPrice } = row
      let oneGoodsPriceText = ''
      let bearGoodsPriceText = ''
      if (oneGoodsPrice) {
        const { paymentType, classPriceOne, classPriceSmall, coinPrice, cashPrice } = oneGoodsPrice
        switch (paymentType) {
          case 'CLASS': {
            oneGoodsPriceText = `1v1:${classPriceOne}课时、班课:${classPriceSmall}课时`
            break
          }
          case 'COIN': {
            oneGoodsPriceText = `${coinPrice} 金币`
            break
          }
          case 'CASH': {
            oneGoodsPriceText = `${cashPrice} 现金`
            break
          }
          case 'COINANDCASH': {
            oneGoodsPriceText = `${coinPrice} 金币、${cashPrice} 现金`
            break
          }
        }
      }
      if (bearGoodsPrice) {
        const { paymentType, coinPrice, cashPrice } = bearGoodsPrice
        switch (paymentType) {
          case 'COIN': {
            bearGoodsPriceText = `${coinPrice} 金币`
            break
          }
          case 'CASH': {
            bearGoodsPriceText = `${cashPrice} 现金`
            break
          }
          case 'COINANDCASH': {
            bearGoodsPriceText = `${coinPrice} 金币、${cashPrice} 现金`
            break
          }
        }
      }
      if (oneGoodsPriceText && !bearGoodsPriceText) {
        return h('div', {}, `1对1：${oneGoodsPriceText} `)
      } else if (!oneGoodsPriceText && bearGoodsPriceText) {
        return h('div', {}, `小熊：${bearGoodsPriceText} `)
      } else {
        return h('div', {}, [
          h('div', {}, `1对1：${oneGoodsPriceText}`),
          h('div', {}, `小熊：${bearGoodsPriceText}`)
        ])
      }
    }
  },
  {
    prop: 'limitNum',
    label: '秒杀库存',
    align: 'center',
    minWidth: 80
  },
  {
    prop: 'leftCount',
    label: '剩余秒杀库存',
    align: 'center',
    minWidth: 110
  },
  {
    prop: 'sortId',
    label: '排序',
    slot: 'sortId',
    align: 'center',
    fixed: 'right',
    minWidth: 100
  },
  {
    action: true,
    name: 'action',
    width: 140,
    prop: 'action',
    label: '操作',
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
          label: '编辑',
          click: (_, row) => handleTableAction('edit', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-edit',
            type: 'default'
          }
        },
        {
          type: 'button',
          label: '删除',
          click: (_, row) => handleTableAction('del', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-delete',
            type: 'default'
          }
        }
      ]
    }
  }
}
