/**
 * @author: Liwei
 * @description: 公告列表操作条配置
 * @date: 2020/1/6
 */
export default ({ optionManage, add }) => {
  return [
    {
      type: 'button',
      label: '新增',
      click: add,
      align: 'right',
      attr: {
        type: 'primary',
        plain: false,
        icon: 'el-icon-plus'
      }
    }
  ]
}
