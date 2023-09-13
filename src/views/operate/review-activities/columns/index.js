export default [
  // {
  //   type: 'selection',
  //   width: 50,
  //   align: 'center'
  // },
  {
    fixed: true,
    prop: 'activity_name',
    label: '活动名称',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'activity_type',
    label: '活动类型',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'name',
    label: '用户信息',
    slot: 'name',
    minWidth: 130,
    align: 'center'
  },
  {
    prop: 'mobile',
    label: '手机号',
    minWidth: 140,
    align: 'center'
  },
  {
    prop: 'picture_url',
    label: '上传素材',
    minWidth: 80,
    name: 'img',
    action: true,
    align: 'center'
  },
  {
    prop: 'create_date',
    label: '上传时间',
    minWidth: 160,
    align: 'center'
  },
  {
    prop: 'audit_status',
    label: '审批状态',
    action: true,
    name: 'tag',
    minWidth: 90,
    align: 'center'
  },
  {
    prop: 'audit_date',
    label: '审批时间',
    minWidth: 160,
    align: 'center'
  },
  // {
  //   prop: 'videoUrl',
  //   label: '奖励类型',
  //   minWidth: 120,
  //   align: 'center'
  // },
  // {
  //   prop: 'videoUrl',
  //   label: '奖励内容',
  //   minWidth: 150,
  //   align: 'center'
  // },
  {
    prop: 'audit_comment',
    label: '备注',
    minWidth: 150,
    showOverflowTooltip: true,
    align: 'center'
  },
  {
    props: 'audit_status',
    action: true,
    name: 'action',
    label: '操作',
    minWidth: 120,
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
    const labelList = ['待审核', '审核通过', '审核驳回']
    return [
      {
        type: 'tag',
        label: labelList[dat],
        attr: {
          type: type[dat]
        }
      }
    ]
  },
  action: (dat, row, index) => {
    const payload = row.audit_status === 1 ? [{
      type: 'button',
      label: '驳回',
      click: (dat, row) => handleTableAction('reject', row),
      attr: {
        type: 'danger',
        size: 'mini'
      }
    }] : row.audit_status !== 0 ? [] : [
      {
        type: 'button',
        label: '通过',
        click: (dat, row) => handleTableAction('adopt', row),
        attr: {
          type: 'success',
          size: 'mini'
        }
      },
      {
        type: 'button',
        label: '驳回',
        click: (dat, row) => handleTableAction('reject', row),
        attr: {
          type: 'danger',
          size: 'mini'
        }
      }
    ]
    return payload
  }
})

