import Vue from 'vue'

// eslint-disable-next-line import/prefer-default-export
export const bus = new Vue()
Vue.prototype.$bus = bus
