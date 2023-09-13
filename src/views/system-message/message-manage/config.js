import $store from '@/store'

export const tabList = [...($store.state.message.dict.appList.filter(v => !['2', '4'].includes(v.value)))]

export const actions = ({ handleActions }) => ([{
  type: 'button', // 按钮
  label: '新增消息组',
  click: handleActions,
  attr: {
    type: 'info',
    plain: true,
    size: 'mini',
    icon: 'el-icon-plus'
  }
}])
