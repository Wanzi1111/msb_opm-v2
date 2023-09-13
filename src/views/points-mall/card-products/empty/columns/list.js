export default [
  {
    prop: 'epc',
    label: '商品编码',
    minWidth: 80,
    align: 'center'
  },
  {
    action: true,
    name: 'img',
    prop: 'img',
    label: '商品图片',
    minWidth: 120,
    align: 'center'
  },
  // {
  //   prop: 'productName',
  //   label: '商品名称',
  //   minWidth: 120,
  //   align: 'center',
  //   render: (h, dat, row) => (
  //     <span>{row.productName > 9
  //       ? '123'.substr(0, 9) + '...'
  //       : row.productName}</span>
  //   )
  // },
  {
    prop: 'goodsName',
    label: '商品名称',
    align: 'center',
    slot: 'productName'
  },
  {
    prop: 'price',
    label: '售价',
    align: 'center',
    // width: 160,
    slot: 'price'
    // render(h, dat, row) {
    //   return row.price + '元'
    // }
  },
  // {
  //   // action: true,
  //   prop: 'surplus',
  //   label: '库存',
  //   minWidth: 80,
  //   align: 'center'
  // },
  {
    label: '库存',
    prop: 'surplus',
    // sortable: 'custom',
    align: 'center',
    slot: 'surplus'
  },
  {
    fixed: 'right',
    action: true,
    name: 'status',
    prop: 'status',
    // width: 300,
    label: '状态',
    align: 'center',
    width: 100
  },
  {
    fixed: 'right',
    action: true,
    name: 'edit',
    prop: 'action',
    // width: 300,
    label: '操作',
    align: 'center',
    width: 100
  }
]

export const actions = ({ edit, status }) => ({
  img: [
    {
      type: 'img'
    }
  ],
  status: (dat, row, index) => {
    const actionStatus = row.status === 'ENABLE' ? {
      label: '已启用',
      type: 'primary'
    } : {
      label: '已停用',
      type: 'info'
    }
    return [
      {
        type: 'button',
        label: actionStatus.label,
        click: status,
        attr: {
          size: 'mini',
          type: actionStatus.type,
          plain: true
        }
      }
    ]
  },
  edit: (dat, row, index) => [
    {
      type: 'button',
      label: '编辑',
      click: edit,
      attr: {
        size: 'mini',
        icon: 'el-icon-edit',
        type: 'primary'
      }
    }
  ]
})
