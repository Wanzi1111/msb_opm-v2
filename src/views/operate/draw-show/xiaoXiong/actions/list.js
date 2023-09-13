export default ({ openDl, quickAtudit }) => {
  return [
    {
      type: 'button', // 按钮
      label: '批量审核视频',
      click: quickAtudit,
      attr: {
        type: 'primary',
        plain: true,
        icon: 'el-icon-d-arrow-right'
      }
    }
  ]
}
