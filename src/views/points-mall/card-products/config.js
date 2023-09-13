export const BasicsActionConfigFn = ({ addGood }) => [
  {
    type: 'button', // 按钮
    label: '新增',
    click: addGood,
    attr: {
      type: 'primary',
      plain: true,
      icon: 'el-icon-plus'
    },
    align: 'right'
  }
]
