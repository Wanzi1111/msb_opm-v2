
// 用户定向-分群列表
export const userGroupColumns = [
  {
    prop: 'id',
    label: 'id',
    align: 'center',
    width: 80
  },
  {
    prop: 'groupCode',
    label: '分群ID',
    align: 'center',
    width: 100,
    slot: 'groupCode'
  },
  {
    prop: 'groupName',
    label: '分群名称',
    align: 'center',
    minWidth: 160
  },
  {
    prop: 'userNum',
    label: '符合人数',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'desc',
    label: '描述',
    align: 'center',
    minWidth: 200,
    showOverflowTooltip: true
  },
  {
    prop: 'refreshWay',
    label: '刷新机制',
    align: 'center',
    minWidth: 120,
    render: (h, dat) => h('el-tag', { props: { type: dat ? 'success' : '', effect: 'plain' }}, ['手动刷新', '自动刷新'][~~dat])
  },
  {
    prop: 'checked',
    label: '选中状态',
    minWidth: 100,
    align: 'center',
    fixed: 'right',
    action: true,
    name: 'tag',
    render: (h, dat) => h('el-tag', { props: { type: dat ? 'success' : 'info' }}, dat ? '已选中' : '未选中')
  },
  {
    prop: 'desc',
    label: '操作',
    minWidth: 100,
    align: 'center',
    fixed: 'right',
    action: true,
    name: 'action'
  }
]

export const userGroupAction = ({ handleUserGroupAction }) => {
  return {
    action: (dat, row, index) => {
      if (!row.checked) {
        return [
          {
            type: 'button',
            label: '选 中',
            click: () => handleUserGroupAction('check', row.id),
            attr: {
              plain: true
            }
          }
        ]
      } else {
        return [
          {
            type: 'button',
            label: '取消选中',
            click: () => handleUserGroupAction('uncheck', row.id),
            attr: {
              plain: true,
              type: 'danger'
            }
          }
        ]
      }
    }
  }
}
