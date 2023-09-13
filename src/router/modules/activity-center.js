/**
 * 活动中心路由配置
 */

import Layout from '@/layout'

const ActivityCenterRouter = {
  path: '/activity-center',
  component: Layout,
  redirect: '/ad-center/activity',
  name: 'ActivityCenter',
  alwaysShow: true,
  meta: {
    title: '活动中心',
    icon: 'gift'
  },
  index: 1,
  children: [
    {
      path: 'activity', // 活动中心
      component: () => import('@/views/operate/activity'),
      name: 'Activity',
      meta: { title: '活动中心', noCache: true }
    },
    {
      path: 'activity-add', // 新建活动
      component: () => import('@/views/operate/activity/add'),
      name: 'ActivityAdd',
      meta: { title: '新建活动', noCache: true },
      hidden: true
    },
    {
      path: 'activityManage', // 转介绍-活动管理
      component: () => import('@/views/operate/manage/index'),
      name: 'TransferManage',
      meta: { title: '转介绍活动管理', noCache: true }
    },
    {
      path: 'manage-create', // 新增 转介绍-海报管理
      component: () => import('@/views/operate/manage/create'),
      name: 'ManageCreate',
      meta: { title: '新建配置', noCache: true },
      hidden: true
    },
    {
      path: 'manage-createZeroTeam', // 新建0元组队
      component: () => import('@/views/operate/manage/components/zeroTeam/create'),
      name: 'ManageCreateZeroTeam',
      meta: { title: '新建0元组队', noCache: true },
      hidden: true
    },
    {
      path: 'manage-zeroTeamLesson', // 0元组队课程管理
      component: () => import('@/views/operate/manage/components/zeroTeam/lessonManage'),
      name: 'ManageZeroTeamLessonManage',
      meta: { title: '0元组队课程管理', noCache: true },
      hidden: true
    },
    {
      path: 'manage-zeroTeamLessonCreate', // 新增 0元组队课程
      component: () => import('@/views/operate/manage/components/zeroTeam/createLesson'),
      name: 'ManageZeroTeamLessonCreate',
      meta: { title: '0元组队课程配置', noCache: true },
      hidden: true
    },
    {
      path: 'set', // 添加 - 公告文章
      component: () => import('@/views/prize/set/index'),
      name: 'PrizeSet',
      meta: { title: '活动奖品管理', noCache: true }
    },
    {
      path: 'awards',
      component: () => import('@/views/prize/awards/index'),
      name: 'PrizeAwards',
      meta: { title: '获奖信息', noCache: true }
    }
  ]
}

export default ActivityCenterRouter

