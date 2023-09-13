/**
 * 系统消息
 */

import Layout from '@/layout'

const SystemMessageRouter = {
  path: '/system-message',
  component: Layout,
  redirect: '/system-message/message-manage',
  name: 'SystemMessage',
  alwaysShow: true,
  meta: {
    title: '系统消息',
    icon: 'message'
  },
  index: 13,
  children: [
    {
      path: 'message-manage',
      component: () => import('@/views/system-message/message-manage'),
      name: 'MessageManage',
      meta: { title: '消息管理' }
    },
    {
      path: 'create-message',
      component: () => import('@/views/system-message/message-manage/create-message'),
      name: 'CreateMessage',
      hidden: true,
      meta: { title: '创建消息', noCache: true }
    }
  ]
}

export default SystemMessageRouter
