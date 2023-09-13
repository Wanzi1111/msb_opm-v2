export default [
  {
    prop: 'groupCode',
    label: '人群ID',
    align: 'center',
    width: 100
  },
  {
    prop: 'groupName',
    label: '人群名称',
    align: 'center',
    minWidth: 160
  },
  {
    prop: 'classLevel1Name',
    label: '一级分类',
    align: 'center',
    minWidth: 160
  },
  {
    prop: 'classLevel2Name',
    label: '二级分类',
    align: 'center',
    minWidth: 160
  },
  {
    prop: 'classLevel3Name',
    label: '三级分类',
    align: 'center',
    minWidth: 160
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
    prop: 'status',
    label: '状态',
    align: 'center',
    action: true,
    name: 'status',
    minWidth: 120
  },
  {
    prop: 'userNum',
    label: '符合人数',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'cname',
    label: '创建人',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'ctime',
    label: '创建时间',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'utime',
    label: '数据更新时间',
    align: 'center',
    minWidth: 120
  },
  {
    action: true,
    name: 'action',
    width: 80,
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    status: (status, row) => {
      const labelList = ['待计算', '计算中', '已完成', '计算失败', '已停用']
      const typeList = ['', 'info', 'success', 'danger', 'warning']
      return [
        {
          type: 'tag',
          label: labelList[status] || '',
          attr: {
            type: typeList[status] || ''
          }
        }
      ]
    },
    action: (_, row) => {
      const actionList = [
        {
          type: 'button',
          label: '刷新',
          attr: {
            command: 'refresh'
          }
        },
        {
          type: 'button',
          label: '编辑',
          attr: {
            command: 'edit'
          }
        },
        {
          type: 'button',
          label: '停用',
          attr: {
            command: 'stop'
          }
        },
        {
          type: 'button',
          label: '启用',
          attr: {
            command: 'enable'
          }
        },
        {
          type: 'button',
          label: '删除',
          attr: {
            command: 'delete'
          }
        },
        {
          type: 'button',
          label: '日志',
          attr: {
            command: 'log'
          }
        },
        {
          type: 'button',
          label: '下载数据',
          attr: {
            command: 'dowload'
          }
        }
      ]
      // status参考👆
      const statusMap = [[4, 5], [4, 5], [0, 1, 2, 5, 6], [1, 4, 6], [1, 3, 4, 5, 6]]
      if (row.userNum) {
        statusMap[3] = [1, 6]
      }
      const currentActionList = statusMap[row.status].map(v => actionList[v])
      return [
        {
          type: 'button', // 按钮
          attr: {
            icon: 'el-icon-more',
            size: 'mini'
          },
          dropdown: true, // 设置了dropdown，组件本身的事件失效
          dropdownConfig: {
            attr: {
              trigger: 'hover'
            },
            command: (type, _, row) => handleTableAction(type, row),
            item: currentActionList
            // item: actionList
          }
        }
      ]
    }
  }
}
