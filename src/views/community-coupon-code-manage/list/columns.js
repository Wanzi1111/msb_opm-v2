import $store from '@/store'
import moment from 'moment'

export default [
  {
    type: 'selection',
    width: 50,
    align: 'center'
  },
  {
    prop: 'businessTypeName',
    label: '业务线',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'groupName',
    label: '人群名称',
    align: 'center',
    action: true,
    name: 'groupName',
    width: 180
  },
  {
    prop: 'sendType',
    label: '发放方式',
    align: 'center',
    minWidth: 120,
    render: (h, data) =>
      h(
        'el-tag',
        {
          props: {
            type: ['warning', 'success', 'info', ''][+data],
            effect: 'plain'
          }
        },
        $store?.state?.communityCouponCodeManage?.baseDataMap.sendWay_map[+data]
      )
  },
  {
    prop: 'couponList',
    label: '券码信息',
    align: 'center',
    minWidth: 330,
    render: (h, data) =>
      h(
        'div',
        {},
        data?.length
          ? data.map(v =>
            h(
              'div',
              {},
              `ID：${v.couponCode}, 名称：${v.couponName}, 发${
                v.couponCount
              }张`
            )
          )
          : []
      )
  },
  {
    prop: 'yffCount',
    label: '已发放数量',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'ygqCount',
    label: '已过期数量',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'yhxCount',
    label: '已核销数量',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'disCount',
    label: '已失效数量',
    align: 'center',
    minWidth: 100,
    render: (_, dat) => {
      return dat || 0
    }
  },
  {
    prop: 'orderTotalAmount',
    label: '订单总金额',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'status',
    label: '券码状态',
    align: 'center',
    minWidth: 100,
    render: (h, data) =>
      h(
        'el-tag',
        { props: { type: ['warning', 'success', 'info'][+data] }},
        $store?.getters?.baseDataMap?.community_coupon_code_status_map[+data]
      )
  },
  {
    prop: 'operationName',
    label: '操作人',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'ctime',
    label: '创建时间',
    align: 'center',
    minWidth: 180,
    render: (_, data) =>
      data ? moment(+data).format('YYYY-MM-DD HH:mm:ss') : ''
  },
  {
    action: true,
    name: 'action',
    width: 120,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    groupName: (_, row) => [
      {
        type: 'button',
        label: `${row.groupId}-${row.groupName}`,
        click: (_, row) => handleTableAction('detail', row),
        attr: {
          type: 'text'
        }
      }
    ],
    action: (_, row) => {
      return !row.status
        ? [
          {
            type: 'button',
            label: '启用',
            click: (_, row) => handleTableAction('open', row),
            attr: {
              size: 'mini',
              type: 'default'
            }
          },
          {
            type: 'button',
            label: '编辑',
            click: (_, row) => handleTableAction('edit', row),
            attr: {
              size: 'mini',
              type: 'text'
            }
          }
        ]
        : [
          {
            type: 'button',
            label: '停用',
            click: (_, row) => handleTableAction('off', row),
            attr: {
              size: 'mini',
              type: 'warning'
            }
          },
          {
            type: 'button',
            label: '编辑',
            click: (_, row) => handleTableAction('edit', row),
            attr: {
              size: 'mini',
              type: 'text'
            }
          }
        ]
    }
  }
}
