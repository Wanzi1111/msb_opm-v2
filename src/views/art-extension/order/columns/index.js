export default [
  {
    prop: 'outTradeNo',
    label: '订单号',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'uid',
    label: '用户id',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'course',
    label: '购买课程-支付金额',
    slot: 'course',
    minWidth: 130,
    align: 'center'
  },
  {
    prop: 'mony',
    label: '支付时间-退费时间',
    slot: 'mony',
    minWidth: 140,
    align: 'center'
  },
  {
    prop: 'spreadUserId',
    label: '推广大使',
    minWidth: 80,
    align: 'center'
  },
  {
    prop: 'pid',
    label: '上级推广大使',
    minWidth: 100,
    align: 'center'
  },
  {
    prop: 'profitAmount',
    label: '收益金额',
    minWidth: 160,
    align: 'center'
  },
  {
    prop: 'statusInfo',
    label: '提现状态',
    slot: 'status',
    minWidth: 130,
    align: 'center'
  }
]

export const tableAction = ({ handleTableAction }) => ({
  action: (dat, row, index) => {
    if (row.audit_status !== 0) return []
    return [
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
  }
})

