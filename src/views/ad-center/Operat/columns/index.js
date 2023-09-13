// import allEnum from '@/utils/enum';
const {
  baseDataMap: { user_area_map, user_state_map, user_type_map, given_type_map }
} = window

const columns = [
  {
    prop: 'picUrl',
    label: '图标',
    action: true,
    align: 'center',
    name: 'picUrl'
  },
  {
    prop: 'name',
    label: '标题',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'label',
    label: '副标题',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'allErt',
    label: 'CTR',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：${row.ert}`),
        h('div', {}, `pad端：${row.ertPad}`)
      ])
    }
  },
  {
    prop: 'clickCount',
    label: '点击数据',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：UV ${row.uvCount || 0} PV ${row.pvCount || 0}`),
        h(
          'div',
          {},
          `pad端：UV ${row.uvPadCount || 0} PV ${row.pvPadCount || 0}`
        )
      ])
    }
  },
  {
    prop: 'uvCount',
    label: '浏览数据',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h(
          'div',
          {},
          `手机端：UV ${row.uvExposureCount || 0} PV ${row.exposureCount || 0}`
        ),
        h(
          'div',
          {},
          `pad端：UV ${row.uvExposurePadCount || 0} PV ${
            row.exposurePadCount || 0
          }`
        )
      ])
    }
  },
  {
    prop: 'seatSort',
    slot: 'seatSort',
    label: '排序',
    minWidth: 80,
    sortable: true
  },
  {
    prop: 'userState',
    label: '用户状态',
    align: 'center',
    minWidth: 150,
    render: (h, dat) => {
      const data = dat.split(',')
      if (dat && data.length) {
        let str = ''
        data.forEach((v, i) => {
          str += `${user_state_map[v]}${i + 1 === data.length ? '' : '，'}`
        })
        return str
      }
      return ''
    }
  },
  {
    label: '操作',
    action: true,
    name: 'action',
    align: 'center',
    fixed: 'right',
    width: 170
  }
]

const columnsOne = [
  {
    prop: 'picUrl',
    label: '图标',
    action: true,
    name: 'picUrl'
  },
  {
    prop: 'name',
    label: '标题',
    minWidth: 120
  },
  {
    prop: 'label',
    label: '副标题',
    minWidth: 120
  },
  {
    prop: 'allErt',
    label: 'CTR',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：${row.ert}`),
        h('div', {}, `pad端：${row.ertPad}`)
      ])
    }
  },
  {
    prop: 'clickCount',
    label: '点击数据',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：UV ${row.uvCount || 0} PV ${row.pvCount || 0}`),
        h(
          'div',
          {},
          `pad端：UV ${row.uvPadCount || 0} PV ${row.pvPadCount || 0}`
        )
      ])
    }
  },
  {
    prop: 'uvCount',
    label: '浏览数据',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h(
          'div',
          {},
          `手机端：UV ${row.uvExposureCount || 0} PV ${row.exposureCount || 0}`
        ),
        h(
          'div',
          {},
          `pad端：UV ${row.uvExposurePadCount || 0} PV ${
            row.exposurePadCount || 0
          }`
        )
      ])
    }
  },
  {
    prop: 'sideType',
    label: '用户区域',
    align: 'center',
    minWidth: 150,
    render: (h, dat) => {
      const data = dat.split(',')
      if (dat && data.length) {
        let str = ''
        data.forEach((v, i) => {
          str += `${user_area_map[v]}${i + 1 === data.length ? '' : '，'}`
        })
        return str
      }
      return ''
    }
  },
  {
    prop: 'userType',
    label: '用户类型',
    align: 'center',
    minWidth: 150,
    render: (h, dat) => {
      const data = dat.split(',')
      if (dat && data.length) {
        let str = ''
        data.forEach((v, i) => {
          str += `${user_type_map[v]}${i + 1 === data.length ? '' : '，'}`
        })
        return str
      }
      return ''
    }
  },
  // {
  //   prop: 'userState',
  //   label: '用户状态',
  //   align: 'center',
  //   minWidth: 150,
  //   render: (h, dat) => {
  //     const data = dat.split(',')
  //     if (dat && data.length) {
  //       let str = ''
  //       data.forEach((v, i) => { str += `${user_state_1v1_map[v]}${i + 1 === data.length ? '' : '，'}` })
  //       return str
  //     }
  //     return ''
  //   }
  // },
  {
    prop: 'givenType',
    label: '赠课类型',
    align: 'center',
    minWidth: 150,
    render: (h, dat) => {
      const data = dat.split(',')
      if (dat && data.length) {
        let str = ''
        data.forEach((v, i) => {
          str += `${given_type_map[v]}${i + 1 === data.length ? '' : '，'}`
        })
        return str
      }
      return ''
    }
  },
  {
    label: '操作',
    action: true,
    name: 'action',
    align: 'center',
    fixed: 'right',
    width: 170
  }
]

export default (type) => {
  return type === '美术宝1对1' ? columnsOne : columns
}

export const tableActions = ({ editOpert, goDeletCard }) => ({
  picUrl: [
    {
      type: 'img'
    }
  ],
  action: (dat, row, index) => {
    return [
      {
        type: 'button',
        label: '修改',
        click: (_, row) => editOpert(row),
        attr: {
          size: 'mini',
          icon: 'el-icon-edit',
          type: 'primary',
          plain: true
        }
      },
      {
        type: 'button',
        label: '删除',
        click: (_, row) => goDeletCard(row),
        attr: {
          size: 'mini',
          icon: 'el-icon-delete',
          type: 'danger',
          plain: true
        }
      }
    ]
  }
})
