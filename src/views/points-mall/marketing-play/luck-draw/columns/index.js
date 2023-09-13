export default () => {
  return [
    {
      prop: 'id',
      label: '序号',
      align: 'center',
      width: 120
    },
    {
      prop: 'name',
      label: '活动名称',
      align: 'center',
      minWidth: 140
    },
    {
      prop: 'headImg',
      label: '活动图片',
      align: 'center',
      action: true,
      name: 'img',
      minWidth: 140
    },
    {
      prop: 'startTimeInfo',
      label: '活动时间',
      align: 'center',
      minWidth: 280,
      render: (h, dat, row, index) => {
        return `${dat} ~ ${row.endTimeInfo} `
      }
    },
    {
      prop: 'status',
      label: '活动状态',
      align: 'center',
      width: 150,
      render: (h, dat) => {
        let tag
        switch (dat) {
          case 'NOTSTART':
            tag = h('el-tag', { props: { type: 'info' }}, '未开始')
            break
          case 'RUNNING':
            tag = h('el-tag', { props: { type: 'success' }}, '进行中')
            break
          case 'END':
            tag = h('el-tag', { props: { type: 'danger' }}, '活动已结束')
            break
          case 'DEL':
            tag = h('el-tag', { props: { type: 'error' }}, '已删除')
            break
          case 'INVALID':
            tag = h('el-tag', { props: { type: 'warning' }}, '失效')
            break
        }
        return tag
      }
    },
    {
      prop: 'authRange',
      label: '业务线',
      align: 'center',
      minWidth: 130,
      render: (h, dat, row, index) => {
        return `${dat}`
      }
    },
    {
      prop: 'amount',
      label: '门槛',
      align: 'center',
      minWidth: 130
    },
    {
      action: true,
      name: 'action',
      width: 80,
      prop: 'action',
      label: '操作',
      align: 'center',
      fixed: 'right'
    }
  ]
}
export const actions = (tableAction) => {
  return {
    img: [
      {
        type: 'img'
      }
    ],
    action: (dat, row, index) => {
      const action = [
        {
          label: '编辑',
          attr: {
            command: 'edit'
          }
        },
        // {
        //   label: row.enabled === 1 ? '上架' : '下架',
        //   attr: {
        //     command: 'operation'
        //   }
        // },
        {
          label: '奖品配置',
          attr: {
            command: 'prizeSetting'
          }
        }
      ]
      return [
        {
          type: 'button', // 按钮
          attr: {
            icon: 'el-icon-more',
            size: 'mini'
          },
          click: () => {},
          dropdown: true, // 设置了dropdown，组件本身的事件失效
          dropdownConfig: {
            attr: {
              trigger: 'hover'
            },
            command: (type, dat, row, index) =>
              tableAction(dat, row, index, type),
            item: action
          }
        }
      ]
    }
  }
}
