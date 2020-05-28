const plugin = {
  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$apiErrorLog = (resp) => {
      console.log('error log start *****************')
      console.log('url', resp.request.responseURL, '\n\nresponse = ', resp.request.response, '\n\naccountId = ', localStorage.getItem('accountId'), '\n\nJWT = ', resp.config.headers.CustomerAuthorization, '\n\nform data = {', resp.config.data.replace('&', ' \n'), '}')
      console.log('error log end *******************')
    }
  },
}

export default plugin
