export default ({ success, reject }) => {
  if (!success && !reject) {
    return []
  }
  if (success && !reject) {
    return [
      {
        type: 'button', // 按钮
        label: '一键成功',
        click: success,
        attr: {
          type: 'success',
          plain: true
        }
      }
    ]
  }
  return [
    {
      type: 'button', // 按钮
      label: '一键成功',
      click: success,
      attr: {
        type: 'success',
        plain: true
      }
    },
    {
      type: 'button', // 按钮
      label: '一键驳回',
      click: reject,
      attr: {
        type: 'danger',
        plain: true
      }
    }
  ]
}
