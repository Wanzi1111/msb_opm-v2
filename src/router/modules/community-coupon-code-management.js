/**
 * 社群券码管理
 */

import Layout from '@/layout'

const SystemMessageRouter = {
  path: '/community-coupon-code-manage',
  component: Layout,
  redirect: '/community-coupon-code-manage/list',
  name: 'CommunityCouponCodeManage',
  // alwaysShow: true,
  meta: {
    title: '社群券码管理',
    icon: 'wechat'
  },
  index: 13,
  children: [
    {
      path: 'list',
      component: () => import('@/views/community-coupon-code-manage/list'),
      name: 'CommunityCouponCodeManageList',
      meta: { title: '社群券码管理' }
      // meta: { title: '社群券码列表' }
    },
    {
      path: 'detail',
      component: () => import('@/views/community-coupon-code-manage/detail'),
      name: 'CommunityCouponCodeManageDetail',
      hidden: true,
      meta: { title: '社群券码详情', noCache: true }
    }
  ]
}

export default SystemMessageRouter
