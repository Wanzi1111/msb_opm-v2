import allEnum from '@/utils/enum'

export const goodsExchangeOptions = [
  { label: '课时', value: 'CLASS' },
  { label: '金币', value: 'COIN' },
  { label: '现金', value: 'CASH' },
  { label: '组合支付', value: 'COINANDCASH' }
]

export default [
  {
    prop: 'goodsType',
    label: '商品类型',
    type: 'select', // 选择器,
    attr: {
      clearable: true,
      placeholder: '请选择商品类型'
    },
    rules: [
      { required: true, message: '请选择商品类型！' }
    ],
    options: [...allEnum.marketing_activity_goods_type]
  },
  {
    prop: 'choiceGoods',
    slot: 'choiceGoods'
  },
  {
    prop: 'goodsName',
    label: '商品名称',
    type: 'input', // 选择器,
    attr: {
      clearable: true,
      placeholder: '请输入商品名称',
      maxLength: 20
    },
    rules: [
      { required: true, message: '请输入商品名称，最多不超过20个汉字！' }
    ]
  },
  {
    prop: 'limitNum',
    label: '秒杀库存',
    type: 'inputNumber',
    attr: {
      clearable: true,
      placeholder: '请输入秒杀库存',
      min: 1
    },
    rules: [
      { required: true, message: '请输入秒杀库存！' }
    ]
  },
  {
    prop: 'oneGoodsPrice',
    label: '1对1商品兑换',
    slot: 'oneGoodsPrice',
    visible: false
  },
  {
    prop: 'bearGoodsPrice',
    label: '小熊商品兑换',
    slot: 'bearGoodsPrice',
    visible: false

  }
]

export const formActions = () => {
  return {
    submit: {
      hide: false // 是否显示 默认false
    },
    reset: {
      hide: true
    },
    back: {
      hide: true
    }
    // cancel: {
    //   click: () => cancel(),
    //   type: 'button',
    //   label: '取消'
    // }
  }
}
