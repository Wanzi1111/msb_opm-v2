import { PRIZE_TYPE_ENUM } from '../schema'

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
    prop: 'receiverName',
    label: '姓名',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入姓名'
    }
  },
  {
    prop: 'receiverMobile',
    label: '电话',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入电话'
    }
  },
  {
    prop: 'prizeType',
    label: '奖品类型',
    type: 'select', // 选择器,
    options: PRIZE_TYPE_ENUM,
    attr: {
      placeholder: '请选择奖品类型',
      clearable: true
    }
  }
]

