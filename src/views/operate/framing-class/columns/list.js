export default () => {
  return [
    {
      prop: 'id',
      label: '序号',
      align: 'center',
      fixed: true
    },
    {
      prop: 'name',
      label: '裱框分类',
      align: 'center'
    },
    {
      prop: 'sort',
      label: '排序',
      align: 'center',
      render: (h, dat) => {
        return dat || '-'
      }
    },
    {
      action: true,
      name: 'action',
      prop: 'action',
      label: '操作',
      align: 'center',
      fixed: 'right'
    }
  ]
}
export const actions = ({ updateNotice, changeNotice }) => {
  return {
    action: (dat, row, index) => {
      let showBtn = {}
      if (!row.status) {
        showBtn = {
          label: '启用',
          attr: {
            size: 'mini',
            icon: 'el-icon-circle-check',
            type: 'success'
          }
        }
      } else {
        showBtn = {
          label: '禁用',
          attr: {
            size: 'mini',
            icon: 'el-icon-circle-close',
            type: 'danger'
          }
        }
      }
      return [
        {
          type: 'button',
          click: changeNotice,
          ...showBtn
        },
        {
          type: 'button',
          label: '修改',
          click: updateNotice,
          attr: {
            // disabled: !!row.status,
            size: 'mini',
            icon: 'el-icon-edit',
            type: 'primary'
          }
        }
      ]
    }
  }
}
