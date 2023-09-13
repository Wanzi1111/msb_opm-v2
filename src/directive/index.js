// import Clipboard from './clipboard'
// import onlyNumber from './onlyNumber'

// // 自定义指令
// const directives = {
//   Clipboard,
//   onlyNumber
// }

// export default {
//   install(Vue) {
//     Object.keys(directives).forEach((key) => {
//       // console.log(directives[key], 'directives[key]')
//       Vue.directive(key, directives[key])
//     })
//   }
// }

export default {
  install(Vue) {
    // const directive = require.context('./', true, /\.js$/)
    const directive = import.meta.globEager('./**/*.js')
    // const directive = import.meta.glob('./**/*.js', { eager: true })
    Object.keys(directive).reduce((filePath, fileName) => {
      const keyArr = fileName.split('/')
      const key = keyArr[1]
      if (!(key.includes('.js'))) {
        Vue.directive(key, directive[fileName].default)
      }
    }, {})
  }
}
