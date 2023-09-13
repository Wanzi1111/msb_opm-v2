import moment from 'moment'
const { marketing_activity_line_map } = window.baseDataMap

export default [
  {
    prop: 'id',
    label: '序号',
    align: 'center',
    minWidth: 80
  },
  {
    prop: 'activityTitle',
    label: '活动名称',
    align: 'center',
    minWidth: 140
  },
  {
    prop: 'activityCtime',
    label: '活动时间',
    align: 'center',
    minWidth: 280,
    render: (h, data, { activityEtime }) => moment(+data).format('YYYY-MM-DD HH:mm:ss') + ' ~ ' + moment(+activityEtime).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    prop: 'statusStr',
    label: '状态',
    align: 'center',
    action: true,
    name: 'status',
    minWidth: 80
  },
  {
    prop: 'limitBusinessTypes',
    label: '展示业务线',
    align: 'center',
    minWidth: 140,
    render: (_, data) =>
      data
        .split(',')
        .map(v => marketing_activity_line_map[v])
        .toString()
  },
  {
    prop: 'userLimit',
    label: '活动每人限购',
    align: 'center',
    minWidth: 110
  },
  {
    action: true,
    name: 'action',
    width: 220,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    status: (statusStr) => {
      const statusMap = {
        '进行中': 'success',
        '未开始': 'info',
        '已下架': 'danger',
        '已结束': 'warning'
      }
      return [
        {
          type: 'tag',
          label: statusStr,
          // click: (_, row) => handleTableAction('status', row),
          attr: {
            type: statusMap[statusStr],
            effect: 'plain'
          }
        }
      ]
    },
    action: (_, row) => {
      const actions = [
        {
          type: 'button',
          label: '上架',
          click: (_, row) => handleTableAction('up', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-top',
            type: 'default'
          }
        },
        {
          type: 'button',
          label: '复用',
          click: (_, row) => handleTableAction('copy', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-plus',
            type: 'default'
          }
        },
        {
          type: 'button',
          label: '编辑',
          click: (_, row) => handleTableAction('edit', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-edit',
            type: 'default'
          }
        }
      ]
      if (row.activityStatus === 'ENABLED') {
        actions[0] = {
          type: 'button',
          label: '下架',
          click: (_, row) => handleTableAction('down', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-bottom',
            type: 'warning'
          }
        }
      }
      return actions
    }
  }
}
