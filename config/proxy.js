/*
 * @Author: ZhangYeLei
 * @Date: 2022-05-23 16:21:19
 * @LastEditTime: 2022-05-30 16:25:54
 * @LastEditors: ZhangYeLei
 */

module.exports = {
  dev: {
    '^/api': {
      target: 'https://javaapipc.meishubao.com',
      changeOrigin: true
    },
    '^/operation': {
      target: 'https://tmpapi.meishubao.com',
      changeOrigin: true
    },
    '/msb_api': {
      target: 'https://testapi.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/msb_api/, 'api')
    },
    // '/permissions': {
    //   target: 'https://user-center-dev.meishubao.com',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/permissions': '/'
    //   }
    // },
    '/xbk': {
      target: 'https://sdbackstageorg.meishubao.com',
      changeOrigin: true
    },
    '^/logistics': {
      target: 'https://logisticsdev-mp.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/logistics/, '')
    },
    '/ums_meixiu': {
      target: 'https://ums-dev-api.meixiu.mobi',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/ums_meixiu/, '')
    },
    '/k8s': {
      // 为使/k8s接口转发走nginx层、走ng配置
      target: 'https://opm-test.meishubao.com',
      // target: 'http://1v1k8s.meishubao.com/vip-app-dev',
      changeOrigin: true
      // pathRewrite: {
      //   '^/k8s': '/'
      // }
    },
    '/ai_api': {
      target: 'https://ai-app-dev.meixiu.mobi',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/ai_api/, '')
    },
    '/ass': {
      target: 'https://dapivip.meishubao.com/ass',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/ass/, '')
    },
    '^/big_data': {
      target: 'https://tsbiapi.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/big_data/, '')
    },
    '/sso': {
      target: 'https://resso-dev.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/sso/, '')
    }
  },
  test: {
    '^/api': {
      target: 'https://testpc.meishubao.com',
      changeOrigin: true
    },
    '^/operation': {
      target: 'https://tmpapi.meishubao.com',
      changeOrigin: true
    },
    // '/permissions': {
    //   target: 'https://user-center-test.meishubao.com',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/permissions': '/'
    //   }
    // },
    '/xbk': {
      target: 'https://sdbackstage.meishubao.com',
      changeOrigin: true
    },
    '/logistics': {
      target: 'https://logisticstest-mp.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/logistics/, '')
    },
    '/msb_api': {
      target: 'https://testapi.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/msb_api/, '/api')
    },
    '/ums_meixiu': {
      // target: 'https://ums-dev-api.meixiu.mobi',
      target: 'https://ums-auth-test-api.meixiu.mobi',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/ums_meixiu/, '')
    },
    '/k8s': {
      // 为使/k8s接口转发走nginx层、走ng配置
      target: 'https://opm-test.meishubao.com',
      // target: 'http://1v1k8s.meishubao.com/vip-app-dev',
      changeOrigin: true
      // pathRewrite: {
      //   '^/k8s': '/'
      // }
    },
    '/ai_api': {
      target: 'https://ai-app-dev.meixiu.mobi',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/ai_api/, '')
    },
    '^/ass': {
      target: 'https://tapivip.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/ass/, '')
    },
    '^/big_data': {
      target: 'https://tsbiapi.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/big_data/, '')
    },
    '/sso': {
      target: 'https://resso-test.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/sso/, '')
    }
  },
  staging: {
    '^/api': {
      target: 'https://prepc.meishubao.com',
      changeOrigin: true
    },
    '^/operation': {
      target: 'https://user-center-gray.meishubao.com',
      changeOrigin: true
    },
    // '/permissions': {
    //   target: 'https://user-center-gray.meishubao.com',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/permissions': '/'
    //   }
    // },
    '/xbk': {
      target: 'https://sdbackstagegray.meishubao.com',
      changeOrigin: true
    },
    '/logistics': {
      target: 'https://logisticsgray-mp.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/logistics/, '')
    },
    '/msb_api': {
      target: 'https://preapi.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/msb_api/, '/api')
    },
    '/ums_meixiu': {
      target: 'http://ums-prod-api.meixiu.mobi',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/ums_meixiu/, '')
    },
    '/k8s': {
      // 为使/k8s接口转发走nginx层、走ng配置
      target: 'https://opm-pre.meishubao.com',
      // target: 'http://1v1k8s.meishubao.com/vip-app-test',
      changeOrigin: true
      // pathRewrite: {
      //   '^/k8s': '/'
      // }
    },
    '/ai_api': {
      target: 'https://ai-app-prod.meixiu.mobi',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/ai_api/, '')
    },
    '/ass': {
      target: 'https://papivip.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/ass/, '')
    },
    '^/big_data': {
      target: 'https://tsbiapi.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/big_data/, '')
    },
    '/sso': {
      target: 'https://resso-prod.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/sso/, '')
    }
  },
  product: {
    '^/api': {
      target: 'https://onlinepc.meishubao.com',
      changeOrigin: true
    },
    '^/operation': {
      target: 'https://mpapi.meishubao.com',
      changeOrigin: true
    },
    // '/permissions': {
    //   target: 'https://user-center.meishubao.com',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/permissions': '/'
    //   }
    // },
    '/xbk': {
      target: 'https://banke.meishubao.com',
      changeOrigin: true
    },
    '/logistics': {
      target: 'https://logistics-mp.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/logistics/, '')
    },
    '/msb_api': {
      target: 'https://onlineapi.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/msb_api/, '/api')
    },
    '/ums_meixiu': {
      target: 'http://ums-live-api.meixiu.mobi',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/ums_meixiu/, '')
    },
    '/k8s': {
      // 为使/k8s接口转发走nginx层、走ng配置
      target: 'https://opm.meishubao.com',
      // target: 'http://msi.yiqimeishu.com/vip-app-live',
      changeOrigin: true
      // pathRewrite: {
      //   '^/k8s': '/'
      // }
    },
    '/ai_api': {
      target: 'https://ai-app-live.meixiu.mobi',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/ai_api/, '')
    },
    '/ass': {
      target: 'https://apivip.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/ass/, '')
    },
    '^/big_data': {
      target: 'https://sbiapi.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/big_data/, '')
    },
    '/sso': {
      target: 'https://resso.meishubao.com',
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/sso/, '')
    }
  }
}
