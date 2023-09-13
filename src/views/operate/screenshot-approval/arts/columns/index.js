import moment from 'moment'

export default [
  {
    type: 'selection',
    width: 50,
    align: 'center'
  },
  {
    fixed: true,
    prop: 'userId',
    label: '用户信息',
    minWidth: 90,
    align: 'center'
  },
  {
    prop: 'title',
    label: '活动类型',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'rewardName',
    label: '活动奖励',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'uploadUrl',
    label: '上传素材',
    minWidth: 80,
    name: 'img',
    action: true,
    align: 'center'
  },
  {
    prop: 'ctime',
    label: '上传时间',
    minWidth: 160,
    align: 'center',
    render: (h, dat) => {
      return moment.unix(dat / 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'utime',
    label: '审批时间',
    minWidth: 160,
    align: 'center',
    render: (h, dat) => {
      return moment.unix(dat / 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'status',
    label: '审批状态',
    action: true,
    name: 'tag',
    minWidth: 90,
    align: 'center'
  },
  {
    prop: 'approvalRemark',
    label: '驳回原因',
    minWidth: 150,
    showOverflowTooltip: true,
    align: 'center'
  },
  {
    prop: 'approvalName',
    label: '审核人',
    minWidth: 150,
    showOverflowTooltip: true,
    align: 'center'
  },
  {
    prop: 'audit_status',
    action: true,
    name: 'action',
    label: '操作',
    minWidth: 200,
    align: 'center',
    fixed: 'right'
  }
]
export const tableAction = ({ handleTableAction }) => ({
  img: [
    {
      type: 'img'
    }
  ],
  tag: (dat, row, index) => {
    const code = ['PENDING', 'AIAUDIT', 'DECLINE', 'AIAUDITFAIL', 'COMPLETED']
    const labelList = ['待审核', '待审核', '审核驳回', '审核异常', '审核成功']
    const type = ['info', 'info', 'error', 'warning', 'success']
    return [
      {
        type: 'tag',
        label: labelList[code.findIndex(item => item === dat)],
        attr: {
          type: type[code.findIndex(item => item === dat)]
        }
      }
    ]
  },
  action: (dat, row, index) => {
    if (row.status === 'COMPLETED') {
      return []
    } else if (row.status === 'DECLINE' || row.status === 'AIAUDITFAIL') {
      return [
        {
          type: 'button',
          label: '通过',
          click: (dat, row) => handleTableAction('adopt', row),
          attr: {
            type: 'text',
            size: 'mini'
          }
        }
      ]
    }
    return [
      {
        type: 'button',
        label: '通过',
        click: (dat, row) => handleTableAction('adopt', row),
        attr: {
          type: 'text',
          size: 'mini'
        }
      },
      {
        type: 'button',
        label: '驳回',
        click: (dat, row) => handleTableAction('reject', row),
        attr: {
          type: 'text',
          size: 'mini'
        }
      }
    ]
  }
})

