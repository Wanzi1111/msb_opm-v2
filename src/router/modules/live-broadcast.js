import Layout from '@/layout'

const liveBroadcastRouter = {
  path: '/live-broadcast',
  component: Layout,
  redirect: '/live-broadcast/manage',
  name: 'LiveBroadcast',
  meta: {
    title: '直播管理',
    icon: 'live'
  },
  index: 3,
  children: [
    {
      path: 'manage',
      component: () => import('@/views/live-broadcast/manage/list'),
      name: 'Manage',
      meta: { title: '直播管理', noCache: false }
    },
    {
      path: 'manage/create',
      component: () => import('@/views/live-broadcast/manage/create'),
      name: 'CreateLive',
      meta: { title: '创建直播', activeMenu: '/live-broadcast/manage', noCache: true },
      hidden: true
    },
    {
      path: 'manage/statistics-list',
      component: () => import('@/views/live-broadcast/manage/statistics-list'),
      name: 'StatisticsList',
      meta: { title: '查看数据详情', noCache: true },
      hidden: true
    }
  ]
}

export default liveBroadcastRouter
