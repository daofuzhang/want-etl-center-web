const plugin = {
  install(Vue) {
    Vue.prototype.$clearLocalStorage = () => {
      localStorage.setItem('JWT', '')
    }
  },
}

export default plugin
