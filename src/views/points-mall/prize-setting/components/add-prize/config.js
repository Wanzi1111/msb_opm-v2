import $store from '@/store'
import { desensitizationName, desensitizationPhone, desensitizationAddress } from '@/utils'

export const confirmConfig = [
  {
    label: '商品名称',
    key: 'goods_name',
    value: ''
  },
  {
    label: '商品物流状态',
    key: 'status',
    value: '',
    render: (value) => $store?.state?.global?.baseDataMap?.express_status_map?.[value] || ''
  },
  {
    label: '收件人',
    key: 'consignee_name',
    value: '',
    render: (value) => desensitizationName(value)
  },
  {
    label: '收件电话',
    key: 'consignee_phone',
    value: '',
    render: (value) => desensitizationPhone(value)
  },
  {
    label: '所在地区',
    key: 'province',
    value: ''
    // render: (value) => goodsTypeMap[value] || ''
  },
  {
    label: '详细地址',
    key: 'address_detail',
    value: '',
    render: (value) => desensitizationAddress(value, 3)
  }
]

