import moment from 'moment'
import $store from '@/store'

const { getters: { baseDataMap: { marketing_week_list_map, marketing_intrigger_type_list_map }}} = $store

/**
 * 转化触发时间展示
 * @param {object} row 数据对象
 * @param {string} type LIST列表展示 DETAIL详情展示
 * @param {function} h 构造函数
 */
export const transferTriggerTime = (row, type, h) => {
  if (row.triggerType === 1) {
    return `${row.startDate} ${row.triggerTime}`
  } else if (row.triggerType === 2) {
    if (type === 'LIST') {
      return row.triggerDateTimes
        ? h('div', {}, row.triggerDateTimes
          .split(',')
          .map(v => h('div', {}, v)))
        : `${row.startDate} ${row.triggerTime}`
    } else {
      return row.triggerDateTimes || `${row.startDate} ${row.triggerTime}`
    }
  } else if (row.triggerType === 3) {
    return `${row.startDate} ~ ${row.endDate} ${row.triggerTime}`
  } else if (row.triggerType === 4 || row.triggerType === 5) {
    return `${row.startDate} ~ ${row.endDate}`
  }
}

export default [
  {
    prop: 'id',
    label: '计划ID',
    align: 'center',
    width: 80
  },
  {
    prop: 'name',
    label: '计划名称',
    align: 'center',
    minWidth: 150
  },
  {
    prop: 'oneType',
    label: '一级分类',
    align: 'center',
    minWidth: 130
  },
  {
    prop: 'twoType',
    label: '二级分类',
    align: 'center',
    minWidth: 130
  },
  {
    prop: 'triggerType',
    label: '触发时机',
    align: 'center',
    minWidth: 180,
    render: (h, data, { triggerDays, planEvents }) => {
      const statusMap = {
        1: 'success',
        2: 'success',
        3: '',
        4: 'info',
        5: 'warning'
      }
      const text = marketing_intrigger_type_list_map[data]
      if (data === 4 || data === 5) {
        return h('div', {}, [
          h('el-tag', { props: { type: statusMap[data], effect: 'plain' }}, text),
          h('el-tooltip', { props: { content: planEvents }}, [
            h('i', { class: 'el-icon-info', style: { 'margin-left': '5px' }}, '')
          ])
        ])
      } else {
        const text = [1, 2].includes(data)
          ? '单次'
          : triggerDays
            .split(',')
            .map(v => marketing_week_list_map[v])
            .toString()
        return h('el-tag', { props: { type: statusMap[data], effect: 'plain' }}, text)
      }
    }
  },
  {
    prop: 'startDate',
    label: '计划日期-结束日期',
    align: 'center',
    minWidth: 250,
    render: (h, data, row) => transferTriggerTime(row, 'LIST', h)
  },
  {
    prop: 'status',
    label: '状态',
    align: 'center',
    action: true,
    name: 'status',
    minWidth: 100
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
  },
  {
    prop: 'operationName',
    label: '创建人',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'ctime',
    label: '创建时间',
    align: 'center',
    minWidth: 180,
    render: (_, data) => moment(+data).format('YYYY-MM-DD HH:mm:ss')
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

export const tableActions = ({ handleTableAction }) => {
  return {
    status: (status, row) => {
      const labelList = ['已停用', '运行中', '已结束']
      const typeList = ['warning', '', 'success']
      return [
        {
          type: 'tag',
          label: labelList[status] || '',
          attr: {
            type: typeList[status] || ''
          }
        }
      ]
    },
    action: (_, row) => {
      const actionList = [
        {
          type: 'button',
          label: '启用',
          attr: {
            command: 'enable'
          }
        },
        {
          type: 'button',
          label: '详情',
          attr: {
            command: 'detail'
          }
        },
        {
          type: 'button',
          label: '复用',
          attr: {
            command: 'copy'
          }
        }
        // {
        //   type: 'button',
        //   label: '删除',
        //   attr: {
        //     command: 'delete'
        //   }
        // },
        // {
        //   type: 'button',
        //   label: '日志',
        //   attr: {
        //     command: 'log'
        //   }
        // }
      ]
      if (row.status === 1) {
        actionList[0] = {
          type: 'button',
          label: '停用',
          attr: {
            command: 'stop'
          }
        }
        actionList.push({
          type: 'button',
          label: '覆盖',
          attr: {
            command: 'cover'
          }
        })
      } else if (row.status === 2) {
        actionList.shift()
      }
      return [
        {
          type: 'button', // 按钮
          attr: {
            icon: 'el-icon-more',
            size: 'mini'
          },
          dropdown: true, // 设置了dropdown，组件本身的事件失效
          dropdownConfig: {
            attr: {
              trigger: 'hover'
            },
            command: (type, _, row) => handleTableAction(type, row),
            item: actionList
          }
        }
      ]
    }
  }
}
