import {
  defineConfig,
  loadEnv
} from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'
import proxy from './config/proxy'
import settings from './src/settings'

// https://vitejs.dev/config/
export default defineConfig(({
  mode,
  command
}) => {
  const env = loadEnv(mode, process.cwd())
  let buildConfig = {}

  const {
    VITE_APP_ENV,
    VITE_BASE_URL
  } = env

  console.log('mode: ', mode)
  console.log('env: ', env)
  if (command !== 'build') {
    console.log('proxy: ', proxy[VITE_APP_ENV])
  }

  if (mode === 'product') {
    buildConfig = {
      ...buildConfig,
      // 会使打包变慢20s左右
      minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
      terserOptions: { // 需 minify: 'terser'
        compress: {
          drop_console: true, // 生产环境去除console
          drop_debugger: true // 生产环境去除debugger
        },
        output: {
          comments: true // 去掉注释内容
        }
      }
    }
  }

  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_BASE_URL === '/' ? '/' : `${VITE_BASE_URL}${settings.version}/`,
    plugins: createVitePlugins(env, command === 'build', mode),
    define: {
      'process.env': process.env
    },
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src'),
        'vuedraggable': path.resolve(__dirname, './node_modules/vuedraggable/dist/vuedraggable.umd.js')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // vite 相关配置
    server: {
      port: 9527,
      host: true,
      open: true,
      proxy: proxy[VITE_APP_ENV]
      // {
      // https://cn.vitejs.dev/config/#server-proxy
      // '/dev-api': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      //   rewrite: (p) => p.replace(/^\/dev-api/, '')
      // }
      // }
    },
    // fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [{
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove()
              }
            }
          }
        }]
      }
    },
    build: {
      // commonjsOptions: {
      //   transformMixedEsModules: true // require可以使用 (不好使啊)
      // }
      rollupOptions: {
        output: {
          // 试了几种方案，这种是打包分析看板颜色最和谐的一个诶
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1]
                .split('/')[0].toString()
            }
          }
        }
      },
      // cssCodeSplit: true, //  如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      // sourcemap: true, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
      // target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
      // chunkSizeWarningLimit: 550, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
      // assetsInlineLimit: 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
      ...buildConfig
    }
  }
})
