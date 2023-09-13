export default ({ kind }) => {
  const arr = [
    {
      prop: 'id',
      label: 'ID',
      align: 'center',
      width: 60,
      fixed: true
    },
    {
      prop: 'name',
      label: '任务名称',
      align: 'center',
      minWidth: 110
    },
    {
      prop: 'taskTime',
      label: '任务时间',
      align: 'center',
      minWidth: 160
    },
    {
      prop: 'caozuoren',
      label: '操作人',
      align: 'center',
      minWidth: 110
    },
    {
      prop: 'utime',
      label: '最后更新时间',
      align: 'center',
      minWidth: 160
    },
    {
      prop: 'status',
      label: '任务状态',
      slot: 'status',
      align: 'center',
      minWidth: 110
    },
    {
      action: true,
      name: 'action',
      width: 220,
      prop: 'action',
      label: '操作',
      align: 'center',
      fixed: 'right'
    }
  ]
  const o = {
    week: arr.filter(a => a.prop !== 'caozuoren'),
    group: arr
  }
  return o[kind] || o['week']
}
export const actionEnd = ({ reuse, edit, detail }) => {
  return {
    action: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '复用',
          click: reuse,
          attr: {
            size: 'mini',
            icon: 'el-icon-plus',
            type: 'success',
            plain: true
          }
        },
        {
          type: 'button',
          label: '查看详情',
          click: detail,
          attr: {
            size: 'mini',
            icon: 'el-icon-view',
            plain: true
          }
        }
      ]
    }
  }
}
export const actionStart = ({ reset, edit, reuse }) => {
  return {
    action: (dat, row, index) => {
      const action = [
        {
          type: 'button',
          label: '修改',
          click: edit,
          attr: {
            size: 'mini',
            icon: 'el-icon-edit',
            type: 'primary',
            plain: true
          }
        },
        {
          type: 'button',
          label: '复用',
          click: reuse,
          attr: {
            size: 'mini',
            icon: 'el-icon-plus',
            type: 'success',
            plain: true
          }
        }
      ]
      if (row.status === 0) {
        action.unshift({
          type: 'button',
          label: '撤销',
          click: reset,
          attr: {
            size: 'mini',
            icon: 'el-icon-warning',
            type: 'danger',
            plain: true
          }
        })
      }
      return action
    }
  }
}
