// const apiFile = require.context('./', true, /\.js$/)
const apiFile = import.meta.globEager('./**/*.js')
// const apiFile = import.meta.glob('./**/*.js', { eager: true }) // Vite4
let apiList = {}
const repeatNames = []

for (var modulePath in apiFile) {
  const api = apiFile[modulePath]
  for (var i in api) {
    if (api[i]) {
      const fcName = api[i].toString().match(/function\s*([^(]*)\(/)[1]
      if (fcName in apiList) {
        repeatNames.push(fcName)
        break
      }
    }
  }
  apiList = {
    ...apiList,
    ...api
  }
}

// apiFile.keys().reduce((modules, modulePath) => {
//   const api = apiFile(modulePath)
//   for (const i in api) {
//     if (api[i]) {
//       const fcName = api[i].toString().match(/function\s*([^(]*)\(/)[1]
//       if (fcName in apiList) {
//         repeatNames.push(fcName)
//         return
//       }
//     }
//   }
//   apiList = {
//     ...apiList,
//     ...api
//   }
// }, {})

if (repeatNames.length) {
  throw new Error(`Api名称重复设置，请重命名${repeatNames.join('、')} Api`)
}

export default apiList

