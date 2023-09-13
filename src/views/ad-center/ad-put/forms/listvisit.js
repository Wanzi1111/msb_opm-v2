export default (row) => {
  return [
    {
      prop: 'productName',
      label: '投放主题',
      type: 'input', // 输入框,
      attr: {
        disabled: 'disabled'
      }
    },
    {
      slot: 'productName',
      prop: 'tip',
      label: ' '
    },
    {
      render: (h, form) => {
        return h('div', [
          h('p', { style: { fontWeight: 'bold', color: '#555555', fontSize: '16px' }}, '通用规则')
        ])
      }
    }
  ]
}
