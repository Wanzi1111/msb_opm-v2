import Vue from 'vue'
Vue.use({
  install: function(Vue) {
    // const requireComponent = require.context('./', true, /\.vue$/)
    const requireComponent = import.meta.globEager('./**/*.vue')
    // const requireComponent = import.meta.glob('./**/*.vue', { eager: true })
    let componentConfig = {}
    Object.keys(requireComponent).forEach(componentName => {
      componentConfig = requireComponent[componentName]
      Vue.component(
        componentConfig.default.name,
        componentConfig.default
      )
    })
  }
})
