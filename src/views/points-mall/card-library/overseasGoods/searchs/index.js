import { Recharge_Status } from '../schema'

export default [
  {
    prop: 'userId',
    label: '用户ID',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入用户ID'
    }
  },
  {
    prop: 'epc',
    label: '商品名称/编码',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入商品名称/编码'
    }
  },
  {
    prop: 'time',
    label: '兑换日期',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      clearable: true,
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59'],
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    prop: 'status',
    label: '充值状态',
    type: 'select', // 选择器,
    options: Recharge_Status,
    attr: {
      placeholder: '全部',
      clearable: true
    }
  }
]

