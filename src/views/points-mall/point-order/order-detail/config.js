import moment from 'moment'
// import $store from '@/store'
import { desensitizationName, desensitizationPhone } from '@/utils'

export const orderStatusMap = {
  CREATE: '新建',
  COMPLETE: '已完成',
  PART_REFUND: '部分退款',
  REFUND: '全部退款',
  REFUND_ERROR: '退款失败'
}

export const appPaltformMap = {
  BEAR_APP: '小熊美术',
  MUSIC_APP: '小熊音乐',
  ONETOONE_APP: '一对一',
  ART_WORLD_APP: '艺术宝'
}

export const orderSourceMap = {
  DUIHUAN: '兑换',
  DUOBAO: '积分夺宝',
  CHOUJIANG: '积分抽奖'
}

export const expressMap = {
  DAIFAHUO: '待发货',
  YIFAHUO: '已发货',
  FAIL: '发货失败',
  QIANSHOU: '已签收',
  INVALID: '已取消'
}

export const goodsMap = {
  INKIND: '金币',
  YIFAHUO: '已发货',
  FAIL: '发货失败',
  QIANSHOU: '已签收',
  INVALID: '已取消'
}

export const paymentTypeMap = {
  CLASS: '课时',
  COIN: '金币',
  CASH: '现金',
  COINANDCASH: '金币 + 人民币'
}

export const goodsTypeMap = {
  INKIND: '实物',
  CARD_CODE: '卡密',
  ACTIVITY: '活动',
  CLASS: '课时',
  CASH: '现金'
}

export const paymentMethodMap = {
  AliPayH5: '支付宝',
  WxH5: '微信'
}
export const orderInfo = [
  {
    label: '订单ID',
    key: 'outTradeNo',
    value: ''
  },
  {
    label: '下单时间',
    key: 'ctime',
    value: '',
    render: (value) => value ? moment(+value).format('YYYY-MM-DD HH:mm:ss') : ''
  },
  {
    label: '订单完成时间',
    key: 'buyTime',
    value: '',
    render: (value) => value ? moment(+value).format('YYYY-MM-DD HH:mm:ss') : ''
  },
  {
    label: '订单状态',
    key: 'orderStatus',
    value: '',
    render: (value) => orderStatusMap[value] || ''
  },
  {
    label: '订单来源',
    key: 'appPlatform',
    value: '',
    render: (value) => appPaltformMap[value] || ''
  },
  {
    label: '订单类型',
    key: 'source',
    value: '',
    render: (value) => orderSourceMap[value] || ''
  }
  // {
  //   label: '渠道来源',
  //   key: 'channel',
  //   value: '',
  //   render: (value) => $store.state.pointsMallOrder.baseDataMap.channel[value] || '--'
  // }
]

export const userInfo = [
  {
    label: '用户ID',
    key: 'userId',
    value: ''
  }
]

export const goodDetail = [
  {
    label: '商品图片',
    key: 'goodsHeadImg',
    value: '',
    slot: true,
    name: 'goodsHeadImg'
  },
  {
    label: '商品名称',
    key: 'goodsName',
    value: ''
  },
  {
    label: '商品ID',
    key: 'goodsId',
    value: ''
  },
  {
    label: '商品价格',
    key: 'goodsPrice',
    value: ''
  },
  {
    label: '商品数量',
    key: 'goodsNum',
    value: ''
  },
  {
    label: '商品类型',
    key: 'goodsType',
    value: '',
    render: (value) => goodsTypeMap[value] || ''
  }
]

export const payInfo = [
  {
    label: '运费',
    key: 'freight',
    value: '0',
    static: true
  },
  {
    label: '活动类型',
    key: 'discountType',
    value: ''
    // render: (value) => ['无促销', '秒杀促销', '生日月促销'][value]
  },
  {
    label: '订单应付',
    key: 'payable',
    value: ''
  },
  {
    label: '优惠金额',
    key: 'discount',
    value: ''
  },
  {
    label: '实付金额',
    key: 'goodsCostPrice',
    value: ''
  },
  {
    label: '支付时间',
    key: 'buyTime',
    value: '',
    render: (value) => value ? moment(+value).format('YYYY-MM-DD HH:mm:ss') : ''
  },
  {
    label: '支付方式',
    key: 'paymentType',
    value: ''
  },
  {
    label: '交易流水号',
    key: 'outTradeNo',
    value: ''
  }
]

export const logisInfo = [
  {
    label: '物流状态',
    key: 'expressStatus',
    value: ''
    // render: (value) => expressMap[value] || ''
  },
  {
    label: '物流单号',
    key: 'orderNo',
    value: ''
  },
  {
    label: '运单号',
    key: 'trackingNum',
    value: ''
  },
  {
    label: '收件人',
    key: 'recipientName',
    value: '',
    render: (value) => desensitizationName(value)
  },
  {
    label: '收件人电话',
    key: 'recipientMobile',
    value: '',
    render: (value) => desensitizationPhone(value)
  },
  {
    label: '收件地址',
    key: 'addressDetail',
    value: ''
  }
]

export const agreementRecordColumns = [
  {
    label: '序号',
    align: 'center',
    width: 80,
    prop: 'id'
  },
  {
    label: '协议名称',
    align: 'center',
    prop: 'name'
  },
  {
    label: '产品名称',
    align: 'center',
    prop: 'goodsName'
  },
  {
    label: '签署时间',
    align: 'center',
    minWidth: 130,
    prop: 'ctime',
    render: (_, value) => value ? moment(+value).format('YYYY-MM-DD HH:mm:ss') : ''
  },
  {
    label: '发版时间',
    minWidth: 130,
    align: 'center',
    prop: 'contractVersionTime'
  },
  {
    label: '生效时间',
    align: 'center',
    minWidth: 130,
    prop: 'buyTime',
    render: (_, value) => value ? moment(+value).format('YYYY-MM-DD HH:mm:ss') : ''
  },
  {
    label: '协议内容',
    align: 'center',
    prop: 'contractVersionPdfUrl',
    slot: 'contractVersionPdfUrl'
    // name: 'contractVersionPdfUrl'
  },
  {
    label: '备注',
    align: 'center',
    prop: 'note'
  }
]
