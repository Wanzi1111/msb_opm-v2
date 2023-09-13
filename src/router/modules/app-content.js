/**
 * App内容管理
 */

import Layout from '@/layout'

const AppContentRouter = {
  path: '/app-content',
  component: Layout,
  redirect: '/app-content/all-list',
  name: 'AppContent',
  alwaysShow: true,
  meta: {
    title: 'App内容管理',
    icon: 'phone'
  },
  index: 4,
  children: [
    {
      path: 'all-list',
      component: () => import('@/views/questionnaire/all-list/index'),
      name: 'QuestionnaireList',
      meta: {
        title: '问卷中心',
        noCache: true,
        activeMenu: '/app-content/all-list'
      }
    },
    {
      path: 'create', // 添加 - 问卷
      component: () => import('@/views/questionnaire/all-list/create'),
      name: 'CreateQuestionnaire',
      meta: {
        title: '创建问卷',
        noCache: true,
        activeMenu: '/questionnaire/all-list'
      },
      hidden: true
    },
    {
      path: 'statistical/:id', // 统计分析
      component: () => import('@/views/questionnaire/all-list/statistical'),
      name: 'StatQuestionnaire',
      meta: {
        title: '统计分析',
        noCache: true,
        activeMenu: '/questionnaire/all-list'
      },
      hidden: true
    },
    {
      path: 'article', // 美育天地
      component: () => import('@/views/notice/article/list'),
      name: 'Article',
      meta: { title: '美育天地', noCache: true }
    },
    {
      path: 'article/create', // 添加 - 美育天地文章
      component: () => import('@/views/notice/article/create'),
      name: 'CreateArticle',
      meta: { title: '添加文章', noCache: true, activeMenu: '/notice/article' },
      hidden: true
    },
    {
      path: 'article/edit/:id(\\d+)', // 修改 - 美育天地文章
      component: () => import('@/views/notice/article/edit'),
      name: 'EditArticle',
      meta: { title: '修改文章', noCache: true, activeMenu: '/notice/article' },
      hidden: true
    },
    {
      path: 'class-evaluate', // 课后评价统计
      component: () => import('@/views/operate/class-evaluate/index'),
      name: 'OperateClassEvaluate',
      meta: { title: '课后评价统计', noCache: true }
    },
    {
      path: 'service-satisfaction', // 服务满意度调查
      component: () => import('@/views/operate/service-satisfaction/index'),
      name: 'ServiceSatisfaction',
      meta: { title: '服务满意度调查', noCache: true }
    },
    {
      path: 'framing-admin', // APP裱框管理
      component: () => import('@/views/operate/framing-admin/list'),
      name: 'FramingAdmin',
      meta: { title: 'APP裱框管理', noCache: true }
    },
    {
      path: 'framing-class', // 裱框分类管理
      component: () => import('@/views/operate/framing-class/list'),
      name: 'APPFramingClass',
      meta: { title: 'APP裱框分类管理', noCache: true }
    },
    {
      path: 'poster', // 转介绍-海报管理
      component: () => import('@/views/operate/poster/index'),
      name: 'Poster',
      meta: { title: '转介绍海报管理' }
    },
    {
      path: 'poster-detail', // 新增 转介绍-海报管理
      component: () => import('@/views/operate/poster/details'),
      name: 'PosterDetail',
      meta: { title: '转介绍海报详情', noCache: true },
      hidden: true
    },
    {
      path: 'center',
      component: () => import('@/views/help/center/index'),
      name: 'helpCenter',
      meta: { title: '帮助中心', noCache: true }
    },
    {
      path: 'creat/:id',
      component: () => import('@/views/help/create/index'),
      name: 'helpCreate',
      meta: { title: '创建问题', noCache: true },
      hidden: true
    }
  ]
}

export default AppContentRouter

