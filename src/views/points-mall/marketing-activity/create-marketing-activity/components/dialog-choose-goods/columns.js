export default [
  {
    prop: 'goodsEpc',
    label: '商品ID',
    align: 'center'
  },
  {
    prop: 'goodsName',
    label: '商品名称',
    align: 'center'
  },
  {
    prop: 'surplus',
    label: '库存数量',
    align: 'center',
    minWidth: 80
  },
  {
    prop: 'price',
    label: '商品售价',
    align: 'center',
    minWidth: 80
  },
  {
    action: true,
    name: 'action',
    prop: 'action',
    width: 100,
    label: '操作',
    align: 'center'
  }
]

export const tableActions = ({ handleTableActions, goodsEpcs }) => {
  return {
    action: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '选择',
          click: () => handleTableActions('choice', row),
          attr: {
            // 虚拟商品列表才有type字段，且虚拟商品没有库存一说、均可选
            disabled: goodsEpcs.includes(row.goodsEpc),
            size: 'mini',
            icon: 'el-icon-check',
            type: 'primary'
          }
        }

      ]
    }
  }
}
