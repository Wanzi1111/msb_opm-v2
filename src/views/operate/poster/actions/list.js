/**
 * @author: Liwei
 * @description: 公告列表操作条配置
 * @date: 2020/1/6
 */
export default ({ optionManage, add }) => {
  return [
    {
      props: 'radio',
      slot: 'radio'
    },
    {
      type: 'button',
      label: '添加海报',
      click: add,
      align: 'right',
      attr: {
        type: 'primary',
        plain: false,
        icon: 'el-icon-shopping-cart-full'
      }
    },
    {
      type: 'button', // 按钮
      label: '位置管理',
      click: optionManage,
      align: 'right',
      attr: {
        type: 'primary',
        plain: true,
        icon: 'el-icon-s-data'
      }
    }
  ]
}
