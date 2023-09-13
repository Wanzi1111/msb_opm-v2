/**
 * 积分商城
 */
import Layout from '@/layout'
const pointsMall = {
  path: '/points-mall',
  component: Layout,
  redirect: '/points-mall/',
  name: 'PointsMall',
  meta: {
    title: '积分商城',
    icon: 'shopping'
  },
  index: 2,
  children: [
    {
      path: 'mall-admin', // 金币商城
      component: () => import('@/views/points-mall/mall-admin/index'),
      name: 'MallAdmin',
      meta: {
        title: '金币商城'
      }
    },
    {
      path: 'classified-admin', // 分类管理
      component: () => import('@/views/points-mall/classified-admin/index'),
      name: 'classifiedAdmin',
      meta: {
        title: '金币分类'
      }
    },
    {
      path: 'card-products', // 卡卷商品
      component: () => import('@/views/points-mall/card-products/index'),
      name: 'cardProducts',
      meta: { title: '商品库' }
    },
    {
      path: 'card-library', // 卡卷库
      component: () => import('@/views/points-mall/card-library/index'),
      name: 'cardLibrary',
      meta: {
        title: '卡券库'
      }
    },
    {
      path: 'create-good', // 新增商品
      component: () => import('@/views/points-mall/mall-admin/create'),
      name: 'createGood',
      meta: {
        title: '新增商品',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'card-products/edit',
      component: () =>
        import('@/views/points-mall/card-products/empty/edit/index'),
      name: 'EditCardProducts',
      meta: {
        title: '修改卡券商品',
        noCache: true,
        activeMenu: '/points-mall/card-products'
      },
      hidden: true
    },
    {
      path: 'card-library/detailCard',
      component: () => import('@/views/points-mall/card-library/detailCard'),
      name: 'libraryCardDetail',
      meta: {
        title: '详情页',
        noCache: true,
        activeMenu: '/points-mall/card-library'
      },
      hidden: true
    },
    {
      path: 'recommend', // 推荐管理
      component: () => import('@/views/points-mall/recommend/index'),
      name: 'Recommend',
      meta: {
        title: '推荐管理'
      }
    },
    {
      path: 'marketing-play', // 营销玩法
      component: () => import('@/views/points-mall/marketing-play'),
      name: 'MarketingPlay',
      meta: {
        title: '营销玩法',
        noCache: true
      }
    },
    {
      path: 'create-marketing', // 营销玩法 - 创建积分夺宝
      component: () => import('@/views/points-mall/marketing-play/loot/create'),
      name: 'CreateMarketingPlay',
      meta: {
        title: '创建积分夺宝',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'luck-draw', // 营销玩法 - 创建积分抽奖
      component: () =>
        import('@/views/points-mall/marketing-play/luck-draw/create'),
      name: 'CreateMarketing',
      meta: {
        title: '创建积分抽奖',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'marketing-activity', // 营销活动
      component: () => import('@/views/points-mall/marketing-activity/index'),
      name: 'MarketingActivity',
      meta: {
        title: '营销活动',
        noCache: true
      }
    },
    {
      path: 'create-marketing-activity', // 创建营销活动
      component: () =>
        import('@/views/points-mall/marketing-activity/create-marketing-activity/index'),
      name: 'CreateMarketingActivity',
      hidden: true,
      meta: {
        title: '创建营销活动',
        noCache: true
      }
    },
    {
      path: 'point-order', // 订单管理
      component: () => import('@/views/points-mall/point-order/index'),
      name: 'PointOrder',
      meta: {
        title: '订单管理'
      }
    },
    {
      path: 'order-detail', // 订单详情
      component: () => import('@/views/points-mall/point-order/order-detail'),
      name: 'OrderDetail',
      meta: {
        noCache: true,
        title: '订单详情'
      },
      hidden: true
    },
    {
      path: 'real-edit',
      component: () =>
        import('@/views/points-mall/card-products/real/edit/index'),
      name: 'EditReal',
      meta: {
        title: '实物商品',
        noCache: true,
        activeMenu: '/points-mall/card-products'
      },
      hidden: true
    },
    {
      path: 'logis-manage', // 物流单管理
      component: () => import('@/views/points-mall/logis-manage/index'),
      name: 'LogisManage',
      meta: {
        title: '物流单管理'
      }
    },
    {
      path: 'prize-setting', // 奖品设置
      component: () => import('@/views/points-mall/prize-setting/index'),
      name: 'PrizeSetting',
      meta: {
        title: '奖品设置'
      },
      hidden: true
    }
  ]
}
export default pointsMall
