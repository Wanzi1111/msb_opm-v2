// const mixinFile = require.context('./', true, /\.js$/)
const mixinFile = import.meta.globEager('./**/*.js')
// const mixinFile = import.meta.glob('./**/*.js', { eager: true })
let mixinList = {}
Object.keys(mixinFile).reduce((modules, modulePath) => {
  if (Object.prototype.hasOwnProperty.call(mixinFile, modulePath)) {
    const mixin = mixinFile[modulePath]
    mixinList = {
      ...mixinList,
      [modulePath.slice(2, -3)]: mixin.default
    }
  }
}, {})

export default mixinList
