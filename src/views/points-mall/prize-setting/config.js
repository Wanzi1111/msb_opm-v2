import allEnum from '@/utils/enum'

export const tabList = [
  {
    label: '美术宝1对1',
    value: 'ONETOONE'
  },
  {
    label: '小熊艺术',
    value: 'BEAR'
  }
]

export const cTabList = [
  {
    label: '全部',
    value: 0
  },
  ...allEnum.express_status
]

export const actions = ({ handleActions }) => ([{
  type: 'button', // 按钮
  label: '批量推单',
  click: handleActions,
  align: 'right',
  attr: {
    type: 'info',
    plain: true,
    size: 'mini',
    icon: 'el-icon-plus'
  }
}])
