export default [
  {
    align: 'center',
    width: 60,
    type: 'selection',
    fixed: true,
    selectable: (row) => !row.stStatus
  },
  {
    prop: 'epc',
    label: '商品编码',
    align: 'center'
  },
  {
    prop: 'epcReferName',
    label: '商品标题',
    align: 'center',
    slot: 'goodslotname'
  },
  {
    label: '可售库存',
    prop: 'excessInventory',
    align: 'center',
    slot: 'excessInventory'
  },
  {
    action: true,
    name: 'action',
    prop: 'action',
    label: '',
    align: 'center',
    fixed: 'right'
  }
]

export const actions = () => {
  return {
    action: (dat, row, index) => {
      const { stStatus } = row
      return [
        {
          type: 'tag',
          label: stStatus ? '已添加' : '未添加',
          attr: {
            disabled: stStatus,
            size: 'mini',
            icon: stStatus ? '' : 'el-icon-check',
            type: stStatus ? 'info' : 'primary'
          }
        }
      ]
    }
  }
}
