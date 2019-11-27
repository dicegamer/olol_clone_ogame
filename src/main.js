import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "./theme/index.css";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/fr";

import devVars from "./dev/variables.js";
Vue.prototype.$devVars = devVars;

import VueSession from "vue-session";
import Axios from "axios";

Vue.prototype.$http = Axios;
Vue.use(VueSession);

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
