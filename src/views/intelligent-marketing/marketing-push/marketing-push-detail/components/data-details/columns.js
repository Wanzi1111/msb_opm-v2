import moment from 'moment'

export default [
  {
    prop: 'subPlanNo',
    label: '日期',
    align: 'center',
    minWidth: 150,
    render: (_, data) => moment(+data).format('YYYY-MM-DD')
  },
  {
    prop: 'audienceCount',
    label: '受众用户',
    align: 'center',
    sortable: 'custom',
    minWidth: 120,
    slotHeader: {
      type: 'info',
      text: '触达的用户数量'
    }
  },
  {
    prop: 'planCount',
    label: '计划触发量',
    align: 'center',
    sortable: 'custom',
    minWidth: 130,
    slotHeader: {
      type: 'info',
      text: '发送消息数量'
    }
  },
  {
    prop: 'successCount',
    label: '成功量',
    align: 'center',
    sortable: 'custom',
    minWidth: 120,
    slotHeader: {
      type: 'info',
      text: '如用户多个设备登陆，其中一个设备送达则为成功'
    }
  },
  {
    prop: 'processCount',
    label: '处理中量',
    sortable: 'custom',
    align: 'center',
    minWidth: 120,
    slotHeader: {
      type: 'info',
      text: '消息在服务端未下发或在离线请求中'
    }
  },
  {
    prop: 'failCount',
    label: '失败量',
    align: 'center',
    sortable: 'custom',
    minWidth: 100,
    slotHeader: {
      type: 'info',
      text: '到达离线时间仍未送达'
    }
  },
  {
    prop: 'uv',
    label: 'UV',
    align: 'center',
    sortable: 'custom',
    minWidth: 100,
    slotHeader: {
      type: 'info',
      text: '点击消息的用户数'
    }
  },
  {
    prop: 'pv',
    label: 'PV',
    align: 'center',
    sortable: 'custom',
    minWidth: 100,
    slotHeader: {
      type: 'info',
      text: '用户点击消息的次数'
    }
  },
  {
    prop: 'planSendRate',
    label: '计划到达率',
    align: 'center',
    sortable: 'custom',
    minWidth: 130,
    slotHeader: {
      type: 'info',
      text: '成功量/计划触发量'
    },
    render: (_, data) => `${data === 0 ? 0 : (data / 100).toFixed(2)}%`
  },
  {
    prop: 'clickRate',
    label: '点击率',
    align: 'center',
    sortable: 'custom',
    minWidth: 100,
    slotHeader: {
      type: 'info',
      text: 'UV/成功量'
    },
    render: (_, data) => `${data === 0 ? 0 : (data / 100).toFixed(2)}%`
  }
]
