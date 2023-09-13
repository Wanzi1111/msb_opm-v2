export const columns = [
  {
    prop: 'sceneId',
    label: '场景ID/说明',
    align: 'center',
    minWidth: 150,
    render: (_, sceneId, { sceneName }) => `${sceneId} / ${sceneName}`
  },
  {
    prop: 'sceneType',
    label: '消息类型',
    align: 'center',
    minWidth: 80,
    render: (_, val) => +val === 0 ? '营销' : '通知'
  },
  {
    prop: 'closingRate',
    label: 'C端关闭数量/关闭率',
    align: 'center',
    minWidth: 100,
    render: (_, closingRate, { closeNum }) => `${closeNum} / ${(closingRate * 100).toFixed(2)}%`
  }
]

export const subGroupColumns = [
  {
    prop: 'groupName',
    label: '二级消息组名称',
    align: 'center',
    minWidth: 90
  },
  {
    prop: 'memo',
    label: '二级消息组说明',
    align: 'center',
    minWidth: 90
  },
  {
    prop: 'sceneList',
    label: '场景ID/说明',
    align: 'center',
    minWidth: 150,
    render: (h, data) => {
      const res = data.length
        ? data.map(v => h('div', {}, `${v.sceneId} / ${v.sceneName}`))
        : ''
      return h('div', {}, [...res])
    }
  },
  {
    prop: 'sceneList',
    label: '消息类型',
    align: 'center',
    minWidth: 80,
    render: (h, data) => {
      const res = data.length
        ? data.map(v => h('div', {}, +v.sceneType === 0 ? '营销' : '通知'))
        : ''
      return h('div', {}, [...res])
    }
  },
  {
    prop: 'sceneList',
    label: 'C端关闭数量/关闭率',
    align: 'center',
    minWidth: 90,
    render: (h, data) => {
      const res = data.length
        ? data.map(v => h('div', {}, `${v.closeNum} / ${(v.closingRate * 100).toFixed(2)}%`))
        : ''
      return h('div', {}, [...res])
    }
  }
]
