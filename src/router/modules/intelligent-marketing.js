/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-06 11:55:50
 * @LastEditTime: 2022-04-26 10:40:20
 * @LastEditors: ZhangYeLei
 */
import Layout from '@/layout'

export default {
  path: '/intelligent-marketing',
  component: Layout,
  redirect: '/intelligent-marketing/user-group',
  name: 'IntelligentMarketing',
  alwaysShow: true,
  meta: {
    title: '智能营销',
    icon: 'peoples'
  },
  index: 12,
  children: [
    {
      path: 'user-group',
      component: () => import('@/views/intelligent-marketing/user-group/index'),
      name: 'UserGroup',
      meta: { title: '用户分群', noCache: false }
    },
    {
      path: 'user-group-detail',
      component: () =>
        import('@/views/intelligent-marketing/user-group/user-group-detail/index'),
      name: 'UserGroupDetail',
      meta: { title: '用户分群详情', noCache: true },
      activeMenu: '/intelligent-marketing/user-group',
      hidden: true
    },
    {
      path: 'user-group-log',
      component: () =>
        import('@/views/intelligent-marketing/user-group/user-group-log/index'),
      name: 'UserGroupLog',
      meta: { title: '分群操作日志', noCache: true },
      activeMenu: '/intelligent-marketing/user-group',
      hidden: true
    },
    {
      path: 'marketing-push',
      component: () =>
        import('@/views/intelligent-marketing/marketing-push/index'),
      name: 'MarketingPush',
      meta: { title: '营销push' }
    },
    {
      path: 'marketing-push-detail',
      component: () =>
        import('@/views/intelligent-marketing/marketing-push/marketing-push-detail'),
      name: 'MarketingPushDetail',
      meta: { title: '营销push详情', noCache: true },
      hidden: true
    },
    {
      path: 'operation-plan',
      component: () =>
        import('@/views/intelligent-marketing/marketing-push/create-operation-plan/index'),
      name: 'OperationPlan',
      meta: { title: '运营计划', noCache: true },
      hidden: true
    },
    {
      path: 'marketing-call',
      component: () =>
        import('@/views/intelligent-marketing/marketing-call/index'),
      name: 'MarketingCall',
      meta: { title: '营销外呼', noCache: false }
    },
    {
      path: 'create-marketing-call-plan',
      component: () =>
        import('@/views/intelligent-marketing/marketing-call/create-plan/index'),
      name: 'CreateMarketingCallPlan',
      meta: { title: '创建任务', noCache: true },
      hidden: true
    },
    {
      path: 'marketing-call-task-detail',
      component: () =>
        import('@/views/intelligent-marketing/marketing-call/task-detail/index'),
      name: 'MarketingCallTaskDetail',
      meta: { title: '任务详情', noCache: true },
      hidden: true
    },
    {
      path: 'ivr-manage',
      component: () => import('@/views/intelligent-marketing/ivr-manage/index'),
      name: 'IvrManage',
      meta: { title: 'IVR管理', noCache: false }
    },
    {
      path: 'create-ivr-manage',
      component: () =>
        import('@/views/intelligent-marketing/ivr-manage/create-plan/index'),
      name: 'CreateIvrManagePlan',
      meta: { title: '创建任务', noCache: true },
      hidden: true
    },
    {
      path: 'ivr-manage-detail',
      component: () =>
        import('@/views/intelligent-marketing/ivr-manage/task-detail/index'),
      name: 'IvrManageDetail',
      meta: { title: '任务详情', noCache: true },
      hidden: true
    },
    {
      path: 'operation-process',
      component: () => import('@/views/intelligent-marketing/operation-process/index'),
      name: 'OperationProcess',
      meta: { title: '用户运营流程文件', noCache: false }
    }
  ]
}
