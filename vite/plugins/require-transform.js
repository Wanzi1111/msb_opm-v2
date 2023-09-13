import vitePluginRequire from 'vite-plugin-require'

export default function createRequireTransform() {
  return vitePluginRequire({
    fileRegex: /.js$|.vue$/
  })
}
