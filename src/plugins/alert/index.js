import Alert from "@/components/common/BaseAlert";

const plugin = {
  install(Vue) {
    Vue.component("Alert", Alert);
  },
};

export default plugin;
