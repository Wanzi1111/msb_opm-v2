export const TableColumnsConfig = [
  {
    prop: 'couponName',
    label: '卡券名',
    minWidth: 80,
    align: 'center'
  },
  {
    prop: 'price',
    label: 'type',
    minWidth: 80,
    align: 'center',
    render: (h, dat, row, index) => row.type === 'CARD_CODE' ? '卡密' : '实物'
  },
  {
    prop: 'issue',
    label: '发放数/总数量',
    minWidth: 80,
    align: 'center',
    render: (h, dat, row, index) => `${row.issue} / ${row.total}`
  },
  {
    action: true,
    fixed: 'right',
    prop: 'action',
    name: 'action',
    label: '操作',
    minWidth: 80,
    align: 'center'
  }
]

export const SearchConfig = [
  {
    type: 'input',
    prop: 'couponName',
    label: '卡券名称:',
    attr: {
      placeholder: '请输入名称'
    }
  }
]

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

export const TableActionsConfigFn = ({ viewDetail, deleteItem }) => ({
  action: [
    {
      type: 'button',
      label: '详情',
      click: viewDetail,
      attr: {
        size: 'mini',
        icon: 'el-icon-view',
        type: 'primary'
      }
    },
    {
      type: 'button',
      label: '删除',
      click: deleteItem,
      attr: {
        size: 'mini',
        icon: 'el-icon-delete',
        type: 'danger'
      }
    }
  ]
})
