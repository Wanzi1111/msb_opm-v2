/*
 * @Descripttion:
 * @version:
 * @Author: gaoleifang
 * @Date: 2020-08-26 15:31:45
 * @LastEditors: gaoleifang
 * @LastEditTime: 2020-09-21 21:25:43
 */
/**
 * @author: Liwei
 * @description:
 * @date: 2020/7/13
 */
export default ({ openDl, quickAtudit }) => {
  // let label = '快速审核视频'
  // switch (activeState) {
  //   case '-1':
  //     label = '快速审核视频'
  //     break
  //   case '1':
  //     label = '快速审核视频'
  //     break
  //   case '2':
  //     label = '审核通过视频'
  //     break
  //   case '4':
  //     label = '自动审核通过视频'
  //     break
  //   case '3':
  //     label = '已下线视频'
  //     break
  //   case '0':
  //     label = '审核驳回视频'
  //     break
  //   default:
  //     break
  // }
  return [
    // {
    //   type: 'button', // 按钮
    //   label: '上传视频',
    //   click: openDl,
    //   attr: {
    //     type: 'primary',
    //     plain: true,
    //     icon: 'el-icon-plus'
    //   }
    // },
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
