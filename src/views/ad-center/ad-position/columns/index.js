import moment from 'moment'

export default ({ toOverview, toSort }) => [
  {
    prop: 'id',
    label: '广告位ID',
    align: 'center',
    width: 150,
    fixed: true
  },
  {
    prop: 'classificationName',
    label: '广告分类',
    align: 'center',
    width: 200
  },
  {
    prop: 'advertName',
    label: '广告位名称',
    align: 'center',
    minWidth: 260
  },
  {
    prop: 'newAdvertSize',
    label: '尺寸',
    align: 'center',
    width: 120,
    render: (h, dat, row, index) => {
      if (dat && dat !== 'undefined*undefined') {
        return dat
      }
      return '无'
    }
  },
  {
    prop: 'coverUrl',
    label: '预览',
    align: 'center',
    render: (h, dat, row, index) => {
      if (dat) {
        return h('div', {
          class: 'el-icon-search',
          style: { cursor: 'pointer', color: '#1890ff', fontSize: '18px' },
          on: {
            click: () => toOverview(dat)
          }
        })
      }
      return '无'
    }
  },
  {
    prop: 'usedCount',
    label: '广告数量',
    align: 'center',
    render: (h, dat, row, index) => {
      return h(
        'div',
        {
          style: { cursor: 'pointer', color: '#1890ff' },
          on: {
            click: () => toSort(row)
          }
        },
        `${dat}, 排序`
      )
    }
  },
  // {
  //   prop: 'bussinessName',
  //   label: '业务类型',
  //   align: 'center'
  // },
  {
    prop: 'createTime',
    label: '创建时间',
    align: 'center',
    width: 160,
    render: (h, dat, row, index) => {
      return moment(dat).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  // {
  //   prop: 'updateTime',
  //   label: '操作时间',
  //   align: 'center',
  //   width: 160,
  //   render: (h, dat, row, index) => {
  //     return moment(dat).format('YYYY-MM-DD HH:mm:ss')
  //   }
  // },
  // {
  //   prop: 'enabled',
  //   label: '当前状态',
  //   align: 'center',
  //   render: (h, dat, row, index) => {
  //     if (dat === 0) {
  //       return h('span', { style: { color: 'green' }}, '启用中')
  //     }
  //     return h('span', { style: { color: 'red' }}, '已关闭')
  //   }
  // },
  {
    prop: 'enabled',
    action: true,
    name: 'enabled',
    label: '操作',
    width: 80,
    align: 'center',
    fixed: 'right'
  }
]

export const actionsList = ({ tableAction }) => {
  return {
    enabled: (dat, row, index) => {
      const action = [
        {
          label: '编辑',
          attr: {
            command: 'edit'
          }
        },
        {
          label: row.enabled === 1 ? '启用' : '删除',
          attr: {
            command: 'able'
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
            command: (type, dat, row, index) => tableAction(dat, row, index, type),
            item: action
          }
        }
      ]
    }
  }
}
