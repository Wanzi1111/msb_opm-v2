// import vue from '@vitejs/plugin-vue'
import {
  createVuePlugin as vue
} from 'vite-plugin-vue2'

// import createAutoImport from './auto-import'
// import createSetupExtend from './setup-extend' // setup语法糖拓展
import createSvgIcon from './svg-icon' // svg处理
import createCompression from './compression' // 压缩文件
import createRequireTransform from './require-transform' // require转换
import createVisualizer from './visualizer' // 打包分析

export default function createVitePlugins(viteEnv, isBuild = false, mode) {
  const vitePlugins = [vue({
    jsx: true
  })]

  // vitePlugins.push(createAutoImport())
  // vitePlugins.push(createSetupExtend())
  vitePlugins.push(createRequireTransform())
  vitePlugins.push(createSvgIcon(isBuild))
  isBuild && vitePlugins.push(...createCompression(viteEnv === ''))
  isBuild && mode === 'visualizer' && vitePlugins.push(createVisualizer())
  return vitePlugins
}
