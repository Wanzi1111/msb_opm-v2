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
    prop: 'title',
    label: '商品名称',
    align: 'center'
  },
  {
    label: '库存数量',
    align: 'center',
    prop: 'excessInventory'
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
      return [
        {
          type: 'button',
          label: '选择',
          click: () => choice(row),
          attr: {
            size: 'mini',
            icon: 'el-icon-check',
            type: 'primary'
          }
        }

      ]
    }
  }
}
