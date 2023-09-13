/**
 * 审核后台
 */

import Layout from '@/layout'

const ExamineRouter = {
  path: '/examine',
  component: Layout,
  redirect: '/examine/screenshot-approval',
  name: 'Examine',
  alwaysShow: true,
  meta: {
    title: '审核后台',
    icon: 'form'
  },
  index: 4,
  children: [
    {
      path: 'screenshot-approval', // 转介绍截图审核
      component: () => import('@/views/operate/screenshot-approval'),
      name: 'ScreenshotApproval',
      meta: { title: '转介绍截图审核', noCache: true }
    },
    {
      path: 'nascentTask-approval', // 新生任务截图审核
      component: () => import('@/views/operate/nascentTask-approval'),
      name: 'NascentTaskApproval',
      meta: { title: '新生任务截图审核', noCache: true }
    },
    {
      path: 'draw-show', // 小画家作品秀
      component: () => import('@/views/operate/draw-show/index'),
      name: 'OperateDrawShow',
      meta: { title: '视频审核', noCache: true }
    },
    {
      path: 'review-activities', // 活动审核
      component: () => import('@/views/operate/review-activities/index'),
      name: 'ReviewActivities',
      meta: { title: '活动审核管理', noCache: true }
    },
    {
      path: 'square-examine', // 广场作品审核
      component: () => import('@/views/operate/square-examine/index'),
      name: 'SquareExamine',
      meta: { title: '广场作品审核', noCache: true }
    }
  ]
}

export default ExamineRouter

