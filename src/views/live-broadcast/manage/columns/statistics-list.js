export default [
  {
    prop: 'name',
    label: '商品名称',
    align: 'center'
  },
  // {
  //   prop: '',
  //   label: '购买渠道',
  //   align: 'center'
  // },
  // {
  //   prop: 'buyNum',
  //   label: '商品点击量',
  //   slot: 'authorId',
  //   align: 'center',
  //   minWidth: 100
  // },
  {
    prop: 'orderNum',
    label: '购买量',
    align: 'center'
  },
  {
    prop: 'buyNum',
    label: '购买人数',
    align: 'center'
  },
  {
    prop: 'amount',
    label: '成交额',
    align: 'center'
    // render: (h, dat) => {
    //   return dat
    //     ? h('el-tag', { props: { type: 'success' }}, '已推荐')
    //     : h('el-tag', { props: { type: 'info' }}, '未推荐')
    // }
  }
]
