/**
 * @author: pengtaoqi
 * @description:
 * @date: 2020/12/16
 */

export default [
  {
    prop: 'id',
    label: '商品ID',
    align: 'center',
    slot: 'id'
  },
  {
    prop: 'productName',
    label: '商品名称',
    align: 'center'
  },
  {
    label: '库存数量',
    align: 'center',
    slot: 'total'
  },
  {
    action: true,
    name: 'action',
    prop: 'action',
    label: '操作',
    align: 'center'
  }
]

export const actions = ({ choice }) => {
  return {
    action: (dat, row, index) => {
      const { stStatus } = row
      return [
        {
          type: 'button',
          label: stStatus ? '已添加' : '选择',
          click: () => choice(row),
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
