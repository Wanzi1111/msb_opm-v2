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
    prop: 'activityName',
    label: '活动类型',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'reward',
    label: '活动奖励',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'source',
    label: '渠道来源',
    minWidth: 140,
    align: 'center'
  },
  {
    prop: 'img',
    label: '上传素材',
    minWidth: 80,
    name: 'img',
    action: true,
    align: 'center'
  },
  {
    prop: 'uploadTime',
    label: '上传时间',
    minWidth: 160,
    align: 'center',
    render: (h, dat) => {
      return moment(Number(dat)).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'auditTime',
    label: '审批时间',
    minWidth: 160,
    align: 'center',
    render: (h, dat) => {
      return moment(Number(dat)).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'statusName',
    label: '审批状态',
    action: true,
    name: 'tag',
    minWidth: 90,
    align: 'center'
  },
  {
    prop: 'turndownMsg',
    label: '驳回原因',
    minWidth: 150,
    showOverflowTooltip: true,
    align: 'center'
  },
  {
    prop: 'checkAdminName',
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
    const type = ['info', 'success', 'danger']
    const labelList = ['待审核', '审核成功', '审核失败']
    return [
      {
        type: 'tag',
        label: dat,
        attr: {
          type: type[labelList.findIndex(item => item === dat)]
        }
      }
    ]
  },
  action: (dat, row, index) => {
    if (row.statusName === '审核成功') {
      return []
    } else if (row.statusName === '审核失败') {
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

