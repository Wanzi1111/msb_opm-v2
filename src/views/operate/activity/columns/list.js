export default () => {
  return [
    {
      prop: 'activityCoverUrl',
      label: '图标',
      align: 'center',
      minWidth: 120,
      action: true,
      name: 'img',
      fixed: 'left'
    },
    {
      prop: 'activityName',
      label: '活动标题',
      align: 'center',
      minWidth: 240
    },
    {
      prop: 'jumpUrl',
      label: 'url链接地址',
      align: 'center'
    },
    {
      prop: 'pvNum',
      label: 'pv',
      align: 'center'
    },
    {
      prop: 'uvNum',
      label: 'uv',
      align: 'center'
    },
    {
      prop: 'sort',
      action: true,
      name: 'sort',
      label: '排序',
      width: 150,
      align: 'center'
    },
    {
      action: true,
      name: 'action',
      width: 230,
      label: '操作',
      align: 'center',
      fixed: 'right'
    }
  ]
}
export const actions = ({ handleDelete, handleEdit, handleSortUp, handleSortDown }) => {
  return {
    sort: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '上移',
          click: handleSortUp,
          attr: {
            size: 'mini',
            icon: 'el-icon-top',
            type: 'primary'
          }
        },
        {
          type: 'button',
          label: '下移',
          click: handleSortDown,
          attr: {
            size: 'mini',
            icon: 'el-icon-bottom',
            type: 'primary'
          }
        }
      ]
    },
    action: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '编辑',
          click: handleEdit,
          attr: {
            size: 'mini',
            icon: 'el-icon-edit',
            type: 'primary'
          }
        },
        {
          type: 'button',
          label: '删除',
          click: handleDelete,
          attr: {
            size: 'mini',
            icon: 'el-icon-view',
            type: 'info'
          }
        }
      ]
    },
    img: (dat, row, index) => {
      const showimg = {}
      showimg.type = 'img'
      if (!row.img) {
        row.img = require('@/assets/images/mall.png')
      }
      return [
        showimg
      ]
    }
  }
}
