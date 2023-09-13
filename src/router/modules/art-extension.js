/**
 * lw APP升级配置
 */

import Layout from '@/layout'

const artExtensionRouter = {
  path: '/art-extension',
  component: Layout,
  redirect: '/app-extension',
  hidden: true, // 暂时隐藏
  name: 'ArtExtension',
  meta: {
    title: '小熊艺术推广大使',
    icon: 'guide'
  },
  index: 11,
  children: [
    // {
    //   path: 'promotion-ambassador', // 推广大使管理
    //   component: () => import('@/views/art-extension/promotion-ambassador/list'),
    //   name: 'Version',
    //   meta: { title: '推广大使管理', noCache: true }
    // },
    // {
    //   path: 'order', // 订单查询
    //   component: () => import('@/views/art-extension/order/list'),
    //   name: 'Upgrade',
    //   meta: { title: '订单查询', noCache: true }
    // }
  ]
}

export default artExtensionRouter
