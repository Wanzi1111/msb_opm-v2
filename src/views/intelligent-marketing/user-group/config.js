/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-11 15:43:21
 * @LastEditTime: 2022-05-05 17:46:26
 * @LastEditors: ZhangYeLei
 */
import store from '@/store'

export const tabList = [
  ...store.state.intelligentMarketing.rootList
]

export const actions = ({ handleActions }) => ([
  {
    type: 'button', // 按钮
    label: '分类管理',
    click: () => handleActions('editUserGroupClassify'),
    attr: {
      type: 'info',
      plain: true,
      size: 'mini',
      icon: 'el-icon-edit'
    }
  },
  {
    type: 'button', // 按钮
    label: '新增画像人群',
    click: () => handleActions('addUserGroup'),
    attr: {
      type: 'info',
      plain: true,
      size: 'mini',
      icon: 'el-icon-plus'
    }
  }
])

