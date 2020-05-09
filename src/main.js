import Vue from 'vue'
import App from './App.vue'
import ElementsUI from 'element-ui';
import {Loading} from 'element-ui';
import {Notification} from 'element-ui';
import {MessageBox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementsUI, Loading, Notification, MessageBox);

Vue.config.productionTip = false

import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';

locale.use(lang);

new Vue({
  render: h => h(App),
}).$mount('#app')
