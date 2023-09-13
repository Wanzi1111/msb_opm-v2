export default ({ download }) => {
  return [
    {
      type: 'button', // 按钮
      label: '导出',
      click: download,
      attr: {
        type: 'primary'
      },
      align: 'right'
    }
  ]
}
