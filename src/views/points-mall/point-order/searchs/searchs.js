import moment from 'moment'
import $store from '@/store'

export const defaultValObj = {
  time: [moment().subtract(1, 'months').startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')]
}

export default [
  {
    prop: 'userId',
    label: '用户ID',
    type: 'input',
    attr: {
      placeholder: '请输入用户ID'
    }
  },
  {
    prop: 'epc',
    label: '商品名称/编码',
    type: 'input',
    attr: {
      placeholder: '请输入商品名称/编码'
    }
  },
  {
    prop: 'time',
    label: '日期',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    defaultVal: defaultValObj.time,
    attr: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'outTradeNo',
    label: '订单ID',
    type: 'input',
    attr: {
      placeholder: '请输入订单ID'
    }
  },
  {
    prop: 'orderStatus',
    label: '订单状态',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      { label: '新建', value: '1' },
      { label: '已完成', value: '2' },
      { label: '部分退款', value: '3' },
      { label: '全部退款', value: '4' },
      { label: '退款失败', value: '5' }
    ]
  },
  {
    prop: 'goodsType',
    label: '商品类型',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      { label: '实物', value: '1' },
      { label: '卡密', value: '2' },
      { label: '活动', value: '3' },
      { label: '课时', value: '4' },
      { label: '现金', value: '5' },
      { label: '轻课', value: '8' }
    ]
  },
  {
    prop: 'paymentType',
    label: '支付方式',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      { label: '金币', value: 'COIN' },
      { label: '课时', value: 'CLASS' },
      { label: '现金', value: 'CASH' },
      { label: '金币+现金', value: 'COINANDCASH' }
    ]
  },
  {
    prop: 'source',
    label: '订单类型',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      { label: '兑换', value: '1' },
      { label: '积分夺宝', value: '2' },
      { label: '积分抽奖', value: '3' }
    ]
  },
  {
    prop: 'appPaltform',
    label: '订单来源',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: [
      { label: '小熊美术', value: '1' },
      { label: '小熊音乐', value: '2' },
      { label: '一对一', value: '3' },
      { label: '艺术宝', value: '4' }
    ]
  },
  {
    prop: 'discountType',
    label: '活动类型',
    type: 'select',
    attr: {
      clearable: true,
      placeholder: '全部'
    },
    options: $store.state.pointsMallOrder.baseData.disCount
  }
  // {
  //   prop: 'channel',
  //   label: '渠道来源',
  //   type: 'select',
  //   attr: {
  //     clearable: true,
  //     placeholder: '全部'
  //   },
  //   options: $store.state.pointsMallOrder.baseData.channel
  // }
]
