import Vue from "vue";
import App from "./App";
import plugin from "../src/vue-multi-drag";

Vue.use(plugin);

Vue.config.productionTip = false;

new Vue({
  // NOTE: if you need to inject as option, you can set here!
  // plugin,
  render: h => h(App)
}).$mount("#app");
