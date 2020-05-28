const plugin = {
  install(Vue) {
    Vue.prototype.$addZero = z => (z < 10 ? `0${z}` : z)
  },
}

export default plugin
