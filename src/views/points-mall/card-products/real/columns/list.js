export default [
  {
    prop: 'productCode',
    label: '商品编码',
    minWidth: 80,
    align: 'center'
  },
  {
    action: true,
    name: 'img',
    prop: 'listImage',
    label: '商品图片',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'productName',
    label: '商品名称',
    align: 'center'
  },
  {
    prop: 'marketPrice',
    label: '售价',
    align: 'center',
    render(h, dat, row) {
      return `${dat}元`
    }
  },
  {
    label: '库存',
    prop: 'stockNum',
    align: 'center',
    render(h, dat, row) {
      return h('el-tag', { props: { type: dat ? '' : 'danger' }}, dat)
    }
  },
  {
    label: '对接平台',
    prop: 'goodsSupplier',
    align: 'center',
    render(h, dat, row) {
      return h('el-tag', { props: { type: '' }}, '经发鸿源')
    }
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
    const actionStatus = row.goodsCouponStatus === 'ENABLE' ? {
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
