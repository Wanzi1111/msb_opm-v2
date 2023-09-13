// export const tabList = [
//   {
//     label: '一对一',
//     value: '0'
//   },
//   {
//     label: '小熊美术',
//     value: '1'
//   }
// ]

export const actions = ({ handleActions, loseEfficacy }) => [
  {
    type: 'button', // 按钮
    label: '补发失效',
    click: loseEfficacy,
    attr: {
      plain: true,
      size: 'mini',
      icon: 'el-icon-edit'
    }
  },
  {
    type: 'button', // 按钮
    label: '绑定券码',
    click: handleActions,
    attr: {
      type: 'info',
      plain: true,
      size: 'mini',
      icon: 'el-icon-plus'
    }
  }
]
