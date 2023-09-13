export const actions = ({ handleActions }) => ([
  {
    type: 'button', // 按钮
    label: '分类管理',
    click: () => handleActions('editMarketingPushClassify'),
    attr: {
      type: 'info',
      plain: true,
      size: 'mini',
      icon: 'el-icon-edit'
    }
  },
  {
    type: 'button', // 按钮
    label: '创建运营计划',
    click: () => handleActions('createOperationPlan'),
    attr: {
      type: 'info',
      plain: true,
      size: 'mini',
      icon: 'el-icon-plus'
    }
  }
])
