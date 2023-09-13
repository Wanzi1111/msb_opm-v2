import {
  createSvgIconsPlugin
} from 'vite-plugin-svg-icons'
import path from 'path-browserify'

export default function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild
  })
}
