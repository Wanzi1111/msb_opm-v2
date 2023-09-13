export default ({ exportExcle, addPeople }) => {
  return [
    {
      type: 'button',
      label: '导出推广大使',
      click: exportExcle,
      align: 'right',
      attr: {
        type: 'primary',
        size: 'small',
        plain: false
      }
    },
    {
      type: 'button',
      label: '添加推广大使',
      click: addPeople,
      align: 'right',
      attr: {
        type: 'default',
        size: 'small',
        plain: false
      }
    }
  ]
}
