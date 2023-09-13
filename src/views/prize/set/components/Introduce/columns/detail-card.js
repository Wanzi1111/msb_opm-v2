/**
 * @author: hzf
 * @description:
 * @date: 2020/9/7
 */
import moment from 'moment'

export default [
  {
    prop: 'cardNo',
    label: '卡号',
    align: 'center'
  },
  {
    prop: 'cardPassword',
    label: '密码',
    align: 'center'
  },
  {
    prop: 'cardStatus',
    label: '下发状态',
    align: 'center',
    render: (h, dat, row) => {
      return h('div', {
        style: {
          color: row.cardStatus === 3 ? '#ff4949' : ''
        }
      },
      ['', '未发放', '已下发', '待补发', '已过期'][dat])
    }
  },
  {
    prop: 'userId',
    label: '领取ID',
    align: 'center'
  },
  {
    prop: 'awardTime',
    label: '领取时间',
    align: 'center',
    width: '150',
    render: (h, dat, row) => {
      return h('div', dat !== '0' ? moment(Number(dat)).format('YYYY-MM-DD') : '-')
    }
  },
  {
    prop: 'ctime',
    label: '创建时间',
    align: 'center',
    width: '150',
    render: (h, dat, row) => {
      return h('div', dat !== '0' ? moment(Number(dat)).format('YYYY-MM-DD') : '-')
    }
  },
  {
    prop: 'startTime-endTime',
    label: '有效期',
    align: 'center',
    width: '200',
    render: (h, dat, row) => {
      return h('div', `${row.startTime === '0' ? '' : moment(Number(row.startTime)).format('YYYY-MM-DD')}-${row.endTime === '0' ? '' : moment(Number(row.endTime)).format('YYYY-MM-DD')}`)
    }
  },
  {
    prop: 'action',
    label: '操作',
    action: true,
    align: 'center',
    name: 'action',
    width: 100,
    fixed: 'right'
  }
]
export const actions = ({ handleDel, handleSupply }) => {
  return {
    action: (dat, row, index) => {
      return [
        {
          type: ['', 'button', 'label', 'button', 'label'][row.cardStatus],
          label: ['', '删除', '-', '补发', '-'][row.cardStatus], // === 3 ? '补发' : '删除',
          click: ['', handleDel, 'label', handleSupply, 'label'][row.cardStatus], // === 3 ? handleSupply : handleDel,
          attr: {
            size: 'mini',
            type: 'success'
          }
        }
      ]
    }
  }
}
