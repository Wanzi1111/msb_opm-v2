/*
 * @Descripttion: 全部问卷列表 配置
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-11-27 15:25:27
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-11-27 16:55:19
 */
export default ({ add }) => {
  return [
    {
      type: 'button', // 按钮
      label: '保存问卷',
      click: add,
      attr: {
        type: 'primary',
        plain: false
      }
    }
  ]
}
