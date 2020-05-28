import JSEncrypt from 'jsencrypt'

/**
 * RSA 加密
 */
const plugin = {
  install(Vue) {
    Vue.prototype.encrypt = value => {
      // 公鑰
      const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALxLKCfH/Hc/S/gyLO76EUJs2e+FYMM14lGcj+XsJb5Pl6dyRr1uf01NGQwjiIIp5nWfzAFI6P8o2KF4pABQnjkCAwEAAQ=='
      const encrypt = new JSEncrypt()

      encrypt.setPublicKey(publicKey)
      const encrypted = encrypt.encrypt(value)

      return encodeURI(encrypted)
    }
  },
}

export default plugin
