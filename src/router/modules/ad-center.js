/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-14 16:21:46
 * @LastEditTime: 2022-05-27 09:52:19
 * @LastEditors: ZhangYeLei
 */
/**
 * 广告中心路由配置
 */

import Layout from '@/layout'

const AdCenterRouter = {
  path: '/ad-center',
  component: Layout,
  redirect: '/ad-center/ad-position-new',
  name: 'AdCenter',
  alwaysShow: true,
  meta: {
    title: '广告中心',
    icon: 'ad'
  },
  index: 0,
  children: [
    {
      path: 'ad-position-new', // 广告位
      component: () => import('@/views/ad-center/ad-position/list'),
      name: 'AdPositionNew',
      meta: { title: '广告位置' }
    },
    {
      path: 'ad-put', // 投放
      component: () => import('@/views/ad-center/ad-put/list'),
      name: 'AdPut',
      meta: { title: '广告投放' }
    },
    {
      path: 'ad-put/add', // 新建投放
      component: () => import('@/views/ad-center/ad-put/newAdd'),
      name: 'AddPut',
      meta: { title: '新建投放', noCache: true, activeMenu: '/ad-center/ad-put' },
      hidden: true
    },
    {
      path: 'Operat', // 运营位
      component: () => import('@/views/ad-center/Operat/list'),
      name: 'Operat',
      meta: { title: '运营位管理', noCache: false }
    },
    {
      path: 'Operat/operationPosition', // 编辑/新增 运营位
      component: () => import('@/views/ad-center/Operat/operation-position'),
      name: 'OperationPosition',
      meta: { title: '新增运营位', noCache: true },
      hidden: true
    },
    {
      path: 'user-search', // 编辑/新增 运营位
      component: () => import('@/views/ad-center/user-search'),
      name: 'AdCenterUserSearch',
      meta: { title: '用户查询', noCache: true }
    }
  ]
}

export default AdCenterRouter
