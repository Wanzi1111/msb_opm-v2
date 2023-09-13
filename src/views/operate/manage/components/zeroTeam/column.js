import moment from 'moment'

export default [
  {
    prop: 'activityId',
    label: 'ID',
    width: 70,
    align: 'center',
    fixed: true
  },
  {
    prop: 'activityTitle',
    label: '活动名称',
    width: 156,
    align: 'center'
  },
  {
    label: '列表页图片',
    prop: 'img',
    type: 'imgList',
    align: 'center',
    action: true,
    name: 'imgList'
  },
  {
    prop: 'ctime',
    label: '创建时间',
    align: 'center',
    render: (_, data) => moment(+data).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    prop: 'del',
    label: '状态',
    align: 'center',
    action: true,
    name: 'del'
  },
  {
    prop: 'userOrigin',
    label: '排序',
    action: true,
    name: 'sort',
    align: 'center',
    width: 150
  },
  {
    prop: 'mobile',
    label: '操作',
    align: 'center',
    action: true,
    name: 'actions',
    width: 250
  }
]

export const lessonManageColumns = [
  {
    prop: 'id',
    label: 'ID',
    width: 70,
    align: 'center',
    fixed: true
  },
  {
    prop: 'name',
    label: '课名称',
    type: 'imgList',
    align: 'center',
    minWidth: 250
  },
  {
    prop: 'del',
    label: '状态',
    align: 'center',
    action: true,
    name: 'del',
    minWidth: 150
  },
  {
    prop: 'userOrigin',
    label: '排序',
    action: true,
    name: 'sort',
    align: 'center',
    minWidth: 150
  },
  {
    prop: 'mobile',
    label: '操作',
    align: 'center',
    action: true,
    name: 'actions',
    width: 250
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    imgList: (dat, row) => {
      return [{
        type: 'img'
      }]
    },
    del: (dat, row) => {
      if (row.del === '1') {
        return [{
          type: 'tag',
          label: '停用',
          attr: {
            type: 'info'
          }
        }]
      } else {
        return [{
          type: 'tag',
          label: '正常',
          attr: {
            type: ''
          }
        }]
      }
    },
    sort: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '上移',
          click: () => handleTableAction('sortUp', row),
          attr: {
            plain: true,
            size: 'mini',
            icon: 'el-icon-top',
            type: 'primary'
          }
        },
        {
          type: 'button',
          label: '下移',
          click: () => handleTableAction('sortDown', row),
          attr: {
            plain: true,
            size: 'mini',
            icon: 'el-icon-bottom',
            type: 'primary'
          }
        }
      ]
    },
    actions: (dat, row) => {
      const actionItem = row.del === '0'
        ? {
          type: 'button',
          label: '停用',
          click: (_, row) => handleTableAction('close', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-close',
            type: 'danger'
          }
        }
        : {
          type: 'button',
          label: '恢复',
          click: (_, row) => handleTableAction('open', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-check',
            type: 'success'
          }
        }
      return [
        {
          type: 'button',
          label: '编辑',
          click: (_, row) => handleTableAction('edit', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-edit'
            // type: 'danger'
          }
        },
        actionItem,
        {
          type: 'button',
          label: '课管理',
          click: (_, row) => handleTableAction('lessonManage', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-setting'
            // type: 'danger'
          }
        }
      ]
    }
  }
}

export const lessonManageTableActions = ({ handleTableAction }) => {
  return {
    imgList: (dat, row) => {
      return [{
        type: 'img'
      }]
    },
    del: (dat, row) => {
      if (row.del === '1') {
        return [{
          type: 'tag',
          label: '停用',
          attr: {
            type: 'info'
          }
        }]
      } else {
        return [{
          type: 'tag',
          label: '正常',
          attr: {
            type: ''
          }
        }]
      }
    },
    sort: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '上移',
          click: () => handleTableAction('sortUp', row),
          attr: {
            plain: true,
            size: 'mini',
            icon: 'el-icon-top',
            type: 'primary'
          }
        },
        {
          type: 'button',
          label: '下移',
          click: () => handleTableAction('sortDown', row),
          attr: {
            plain: true,
            size: 'mini',
            icon: 'el-icon-bottom',
            type: 'primary'
          }
        }
      ]
    },
    actions: (dat, row) => {
      const actionItem = row.del === '0'
        ? {
          type: 'button',
          label: '停用',
          click: (_, row) => handleTableAction('close', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-close',
            type: 'danger'
          }
        }
        : {
          type: 'button',
          label: '恢复',
          click: (_, row) => handleTableAction('open', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-check',
            type: 'success'
          }
        }
      return [
        {
          type: 'button',
          label: '编辑',
          click: (_, row) => handleTableAction('edit', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-edit'
            // type: 'danger'
          }
        },
        actionItem
      ]
    }
  }
}
