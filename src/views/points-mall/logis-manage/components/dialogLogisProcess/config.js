import $store from '@/store'
import { desensitizationName, desensitizationPhone } from '@/utils'

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
  // {
  //   label: '所在地区',
  //   key: 'province',
  //   value: ''
  // },
  {
    label: '收货地址',
    key: 'addressDetail',
    value: ''
  },
  {
    label: '仓库信息',
    key: 'supplier',
    value: ''
  },
  {
    label: '快递详情',
    key: 'expressName',
    value: ''
  },
  {
    label: '物流进度',
    key: 'subVo',
    value: '',
    slot: true,
    name: 'subVo'
  }
]
