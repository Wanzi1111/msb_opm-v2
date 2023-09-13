/**
 * 推广大使管理路由配置
 */
import Layout from '@/layout'

const PromotionAmbassadorRouter = {
  path: '/promotion',
  component: Layout,
  alwaysShow: true,
  redirect: '/promotion/promotion-ambassador',
  index: 6,
  name: 'Promotion',
  meta: { title: '推广大使', icon: 'manage' },
  children: [
    {
      path: 'promotion-ambassador',
      component: () => import('@/views/art-extension/promotion-ambassador/list'),
      name: 'PromotionAmbassador',
      meta: { title: '推广大使管理', noCache: true }
    },
    {
      path: 'order',
      component: () => import('@/views/art-extension/order/list'),
      name: 'ActivityOrder',
      meta: { title: '推广大使订单', noCache: true }
    },
    {
      path: 'qrcode-monitor',
      component: () => import('@/views/art-extension/qrcode-monitor/list'),
      name: 'qrcodeMonitor',
      meta: { title: '扫码购买监控', noCache: true }
    }
  ]
}

export default PromotionAmbassadorRouter
