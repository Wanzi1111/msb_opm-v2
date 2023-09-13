/**
 * @author: Liwei
 * @description:
 * @date: 2020/1/2
 */

import moment from 'moment'
import { PRIZE_TYPE_ENUM, EXPRESS_STATUS_ENUM } from '../schema'

export default [
  {
    prop: 'userId',
    label: '用户ID',
    align: 'center',
    minWidth: 100,
    fixed: true
  },
  // {
  //   prop: 'nickName',
  //   label: '用户昵称',
  //   align: 'center',
  //   minWidth: 100
  // },
  // {
  //   prop: 'sex',
  //   label: '性别',
  //   align: 'center',
  //   render: (h, dat) => {
  //     return ['未知', '男', '女'][dat]
  //   }
  // },
  // {
  //   prop: 'teacher',
  //   label: '班主任',
  //   align: 'center'
  // },
  // {
  //   prop: 'groupName',
  //   label: '组别',
  //   align: 'center',
  //   minWidth: 60
  // },
  // {
  //   prop: 'region',
  //   label: '大区',
  //   align: 'center',
  //   minWidth: 100
  // },
  {
    prop: 'prizeType',
    label: '奖品类型',
    width: '150',
    align: 'center',
    render: (h, dat) => {
      const targetType = PRIZE_TYPE_ENUM.find(prizeType => prizeType.value === dat)
      return targetType ? targetType.label : '-'
    }
  },
  {
    prop: 'awardTime',
    label: '领奖时间',
    minWidth: 110,
    align: 'center',
    render: (h, dat) => {
      return dat && dat !== '0' ? moment(parseInt(dat)).format('YYYY-MM-DD') : ''
    }
  },
  {
    prop: 'prizeMonth',
    label: '获奖时间',
    align: 'center'
  },
  {
    prop: 'prizeName',
    label: '奖品名称',
    minWidth: 120,
    align: 'center'
  },
  // {
  //   prop: 'receiverName',
  //   label: '收货人姓名',
  //   minWidth: 120,
  //   align: 'center'
  // },
  // {
  //   prop: 'receiverMobile',
  //   label: '联系电话',
  //   align: 'center'
  // },
  // {
  //   prop: 'receiverProvince',
  //   label: '邮寄地址',
  //   showOverflowTooltip: true,
  //   align: 'center',
  //   minWidth: 180,
  //   render: (h, dat, row) => {
  //     return `${row.receiverProvince}${row.receiverCity}${row.receiverArea}${row.receiverAddress}`
  //   }
  // },
  // {
  //   prop: 'requestId',
  //   label: '订单号',
  //   align: 'center',
  //   minWidth: 180
  // },
  // {
  //   prop: 'expressCompany',
  //   label: '快递公司',
  //   align: 'center'
  // },
  // {
  //   prop: 'expressNumber',
  //   label: '快递单号',
  //   align: 'center'
  // },
  {
    prop: 'a1',
    label: '收货信息',
    width: '400',
    align: 'center',
    render: (h, dat, row) => {
      const { receiverName = '', receiverMobile = '', receiverProvince = '', receiverCity = '', receiverArea = '', receiverAddress = '' } = row
      return h('div', [
        h('span', {
          style: {
            marginRight: '10px'
          }
        }, `${receiverName}`),
        h('span', {
          style: {
          }
        }, `${receiverMobile}`),
        h('span', {
          style: {
            marginLeft: '10px'
            // color: '#ddd'
          }
        }, `${receiverProvince}${receiverCity}${receiverArea}${receiverAddress}`)
      ])
    }
  },
  {
    prop: 'expressStatus',
    label: '下单状态',
    align: 'center',
    render: (h, dat, row) => {
      return h('div', ['', ...EXPRESS_STATUS_ENUM.map(expressStatus => expressStatus.label)][dat])
    }
  },
  {
    prop: 'expressType',
    label: '发货渠道',
    width: '120',
    align: 'center',
    render: (h, dat, row) => {
      return h('div', ['', '中台发货', '渠道商发货'][dat])
    }
  },
  {
    prop: 'action',
    label: '操作',
    action: true,
    minWidth: 180,
    align: 'center',
    fixed: 'right',
    name: 'action'
  }
]

export const actions = ({ view, ship }) => {
  return {
    action: (dat, row, index) => {
      let actionArr = (row) => [
        {
          type: 'button',
          label: '详情',
          click: () => view(row.id),
          attr: {
            // type: 'primary',
            // plain: true,
            size: 'mini',
            icon: 'el-icon-view'
          }
        }
      ]
      if (row.expressStatus === 4) {
        actionArr = (row) => [
          {
            type: 'button',
            label: '详情',
            click: () => view(row.id),
            attr: {
              size: 'mini',
              icon: 'el-icon-view'
            }
          },
          {
            type: 'button',
            label: '提交发货',
            click: () => ship(row.id),
            attr: {
              type: 'primary',
              size: 'mini',
              icon: 'el-icon-view'
            }
          }
        ]
      }
      return actionArr(row)
    }
  }
}
