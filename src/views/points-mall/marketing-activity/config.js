// import $store from '@/store'

// export const tabList = [...($store.state.message.dict.appList.filter(v => !['2', '4'].includes(v.value)))]

export const tabList = [
  { label: '限时秒杀', value: '1' }
]

export const actions = ({ handleActions }) => ([{
  type: 'button', // 按钮
  label: '新增活动',
  click: handleActions,
  attr: {
    type: 'info',
    plain: true,
    size: 'mini',
    icon: 'el-icon-plus'
  }
}])
