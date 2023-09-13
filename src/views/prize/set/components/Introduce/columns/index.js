/**
 * @author: hzf
 * @description:
 * @date: 2020/9/7
 */

export default [
  {
    prop: 'name',
    label: '卡券名称',
    align: 'center'
  },
  {
    prop: 'cardType',
    label: '卡券类型',
    align: 'center',
    render: (h, dat, row) => {
      return ['卡密', '卡密', '券码'][dat]
    }
  },
  {
    prop: 'a3',
    label: '发放数量/总数量',
    align: 'center',
    render: (h, dat, row) => {
      return h('div', {
        style: {
          color: row.takeCount < row.usedCount ? '#F56C6C' : ''
        }
      }, `${row.usedCount}/${row.takeCount}`)
    }
  },
  {
    prop: 'a4',
    label: '需要补发数量',
    align: 'center',
    render: (h, dat, row) => {
      return h('div', {
        style: {
          color: row.takeCount < row.usedCount ? '#F56C6C' : ''
        }
      }, `${row.takeCount < row.usedCount ? Math.abs(row.takeCount - row.usedCount) : 0}`)
    }
  },
  {
    prop: 'action',
    label: '操作',
    action: true,
    align: 'center',
    name: 'action',
    width: 225
  }
]
export const actions = ({ handleDetail }) => {
  return {
    action: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '查看详情',
          click: handleDetail,
          attr: {
            size: 'mini',
            icon: 'el-icon-view',
            type: 'success'
          }
        }
      ]
    }
  }
}
