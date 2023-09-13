export default [
  {
    prop: 'resourceUrl',
    action: true,
    name: 'imgList',
    label: '海报图片',
    align: 'center',
    minWidth: 90
  },
  {
    prop: 'advertName',
    label: '广告位置',
    align: 'center',
    minWidth: 150
  },
  {
    prop: 'allErt',
    label: 'CTR',
    align: 'center',
    minWidth: 200,
    render: (h, dat, row, index) => {
      return h('div', {}, [
        h('div', {}, `手机端：${row.allErt || 0}`),
        h('div', {}, `pad端：${row.allErtPad || 0}`)
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
        h('div', {}, `手机端：UV ${row.uvCount || 0} PV ${row.clickCount || 0}`),
        h('div', {}, `pad端：UV ${row.uvPadCount || 0} PV ${row.clickPadCount || 0}`)
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
        h('div', {}, `手机端：UV ${row.uvExposureCount || 0} PV ${row.exposureCount || 0}`),
        h('div', {}, `pad端：UV ${row.uvExposurePadCount || 0} PV ${row.exposurePadCount || 0}`)
      ])
    }
  },
  {
    prop: 'enabled',
    label: '投放状态',
    align: 'center',
    render: (h, dat, row, index) => {
      return h('el-tag', { type: dat ? 'success' : 'danger' }, `${dat ? '已开启' : '已关闭'}`)
    }
  },
  {
    action: true,
    name: 'action',
    label: '操作',
    width: 140,
    align: 'center',
    fixed: 'right'
  }
]

export const actions = (handleTableActions) => ({
  imgList: (dat, row, index) => {
    const value = row.resourceUrl?.split(',')
    return [{
      type: 'imgList',
      value,
      attr: {}
      // style: {
      //   width: '80px',
      //   height: '80px'
      // }
    }]
  },
  action: (dat, row, index) => {
    const actionItem = row.enabled
      ? {
        type: 'button',
        label: '关闭',
        click: (_, row) => handleTableActions('close', row),
        attr: {
          size: 'mini',
          icon: 'el-icon-close',
          type: 'danger'
        }
      }
      : {
        type: 'button',
        label: '开启',
        click: (_, row) => handleTableActions('open', row),
        attr: {
          size: 'mini',
          icon: 'el-icon-check',
          type: 'success'
        }
      }
    return [
      actionItem,
      {
        type: 'button',
        label: '查看',
        click: (_, row) => handleTableActions('viewDetail', row),
        attr: {
          size: 'mini',
          icon: 'el-icon-view'
        }
      }
    ]
  }
})
