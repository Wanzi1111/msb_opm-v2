const goods = [
  {
    prop: 'productName',
    label: '商品名称',
    type: 'input',
    attr: {
      clearable: true,
      placeholder: '请输入商品名称'
    }
  }
]

const realGoods = [
  {
    prop: 'productName',
    label: '商品名称',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入商品名称'
    }
  },
  {
    prop: 'productCode',
    label: '商品编码',
    type: 'input', // 输入框,
    attr: {
      placeholder: '请输入商品编码'
    }
  }
  // {
  //   prop: 'epcReferName',
  //   label: '名称/编码',
  //   type: 'input', // 输入框,
  //   attr: {
  //     placeholder: '请输入商品名称/或编码'
  //   }
  // }
]

export { realGoods, goods }
