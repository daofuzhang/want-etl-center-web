import Vue from "vue";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import JsonViewer from 'vue-json-viewer'
import 'vue-json-viewer/style.css'

import App from "./App.vue";
import router from "./router";

import pluginFilter from "@/plugins/filter";
import pluginAlert from "@/plugins/alert";

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(JsonViewer)
Object.keys(pluginFilter).map((key) => Vue.filter(key, pluginFilter[key]));
Vue.use(pluginFilter);
Vue.use(pluginAlert);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
