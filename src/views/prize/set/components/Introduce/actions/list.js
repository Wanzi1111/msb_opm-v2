/**
 * @author: huzhifu
 * @description:
 * @date: 2020/5/11
 */
export default ({ handleExport, handleImport }) => {
  return [
    {
      type: 'button', // 按钮
      label: '导出',
      click: handleExport,
      align: 'right',
      attr: {
        type: 'primary',
        plain: true
      }
    },
    {
      type: 'button', // 按钮
      label: '导入',
      click: handleImport,
      align: 'right',
      attr: {
        type: 'primary',
        plain: true
      }
    }

  ]
}
