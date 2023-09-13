export default [
  {
    action: true,
    name: 'img',
    prop: 'productPicture',
    label: '商品图片',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'productCode',
    label: '商品编码',
    minWidth: 80,
    align: 'center'
  },
  {
    prop: 'productName',
    label: '商品名称',
    align: 'center'
  },
  {
    prop: 'costPrice',
    label: '商品成本价',
    align: 'center'
  },
  {
    prop: 'stdPrice',
    label: '商品销售价',
    align: 'center'
  },
  {
    label: '商品库存',
    prop: 'orderStockNum',
    align: 'center'
  },
  {
    fixed: 'right',
    action: true,
    name: 'action',
    prop: 'action',
    label: '操作',
    align: 'center',
    width: 100
  }
]

export const actions = ({ status }) => ({
  img: [
    {
      type: 'img'
    }
  ],
  action: (dat, row, index) => {
    const { butStatus } = row
    return [
      {
        type: 'button',
        label: butStatus ? '已选' : '选择',
        click: status,
        attr: {
          disabled: butStatus,
          size: 'mini',
          type: butStatus ? 'info' : 'primary',
          plain: true
        }
      }
    ]
  }
})
