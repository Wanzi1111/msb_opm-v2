/**
 * @author: Liwei
 * @description:
 * @date: 2020/3/9
 */
export default ({ create, put, off }) => {
  return [
    {
      type: 'button', // 按钮
      label: '创建直播',
      click: create,
      attr: {
        type: 'primary',
        plain: true,
        icon: 'el-icon-plus'
      }
    }
    // {
    //   type: 'button', // 按钮
    //   label: '批量上架',
    //   click: put,
    //   attr: {
    //     icon: 'el-icon-upload2'
    //   }
    // },
    // {
    //   type: 'button', // 按钮
    //   label: '批量下架',
    //   click: off,
    //   attr: {
    //     icon: 'el-icon-download'
    //   }
    // }

  ]
}
