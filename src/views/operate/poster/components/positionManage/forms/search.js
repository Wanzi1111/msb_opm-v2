export default [
  {
    prop: 'line',
    label: '业务线',
    type: 'select', // 输入框,
    layer: 'large',
    options: [
      { label: '美术宝1对1', value: '1' },
      { label: '小熊艺术', value: '2' },
      { label: '书画院', value: '3' },
      { label: '音乐宝陪练', value: '4' }
    ],
    attr: {
      placeholder: '请选择业务线'
    }
  },
  {
    prop: 'sub_line',
    label: '用户类型',
    type: 'select', // 输入框,
    layer: 'large',
    attr: {
      placeholder: '请选择用户类型'
    },
    options: []
  }
]
