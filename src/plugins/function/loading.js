const plugin = {
  install(Vue) {
    Vue.prototype.$loading = visible => Vue.prototype.$bus.$emit('loading', visible)
  },
}

export default plugin
