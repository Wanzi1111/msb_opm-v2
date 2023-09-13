import moment from 'moment'
import store from '@/store'

export default [
  {
    prop: 'taskId',
    label: '任务id',
    align: 'center',
    width: 80
  },
  {
    prop: 'taskName',
    label: '任务名称',
    align: 'center',
    minWidth: 160,
    action: true,
    name: 'taskName'
  },
  {
    prop: 'startDate',
    label: '任务时间',
    align: 'center',
    minWidth: 200,
    render: (_, dat, row) => {
      return `${dat} ～ ${row.endDate}`
    }
  },
  {
    prop: 'taskStatus',
    label: '任务状态',
    align: 'center',
    minWidth: 120,
    action: true,
    name: 'taskStatus'
  },
  {
    prop: 'targetImportQuantity',
    label: '每次目标导入量',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'allImportQuantity',
    label: '总导入任务量',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'allCallQuantity',
    label: '总呼叫任务量',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'allConnectQuantity',
    label: '总接通任务量',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'supplier',
    label: '对接平台',
    align: 'center',
    minWidth: 120,
    render: (_, data) =>
      store?.state?.intelligentMarketing?.ivrDincMap?.supplierList_map?.[data]
  },
  {
    prop: 'jobId',
    label: '第三方任务ID',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'utime',
    label: '更新时间',
    align: 'center',
    minWidth: 200,
    render: (_, dat) => moment(+dat).format('YYYY-MM-DD HH:mm:ss')
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
    taskName: (data) => {
      return [
        {
          type: 'button',
          label: data,
          click: (_, row) => handleTableAction('detail', row),
          attr: {
            type: 'text'
          }
        }
      ]
    },
    taskStatus: (data) => {
      const colorMap = ['info', '', 'success', 'warning']
      return [
        {
          type: 'tag',
          label: store?.state?.intelligentMarketing?.ivrDincMap?.taskStatusList_map?.[data],
          attr: {
            type: colorMap[+data]
          }
        }
      ]
    },
    action: (_, row) => {
      const action = [
        {
          label: '停用',
          attr: {
            command: 'stop'
          }
        },
        {
          label: '刷新',
          attr: {
            command: 'refresh'
          }
        },
        {
          label: '编辑',
          attr: {
            command: 'edit'
          }
        },
        {
          label: '复用',
          attr: {
            command: 'copy'
          }
        }
      ]
      if (+row.taskStatus === 3) {
        action[0] = {
          label: '启用',
          attr: {
            command: 'enable'
          }
        }
      }
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
              trigger: 'click'
            },
            command: (type, _, row) => handleTableAction(type, row),
            item: action
          }
        }
      ]
    }
  }
}
