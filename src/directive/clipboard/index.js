import clipboard from './clipboard'

const install = function(Vue) {
  Vue.directive('Clipboard', clipboard)
}

if (window.Vue) {
  window.clipboard = clipboard
  Vue.use(install); // eslint-disable-line
}

clipboard.install = install
export default clipboard
