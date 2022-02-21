import { createApp } from 'vue';
import router from './route';
import store from '@/store';

import App from '@/App.vue';
// element plus
import installElementPlus from '@/plugins/element';
import '@/styles/index.scss';

// 初始化css 重置css默认样式
import 'normalize.css/normalize.css';
// svg icons
import initSvgIcon from '@/icons/index';

const app = createApp(App);



app
  .use(router)
  .use(store)
  .use(installElementPlus)
  .use(initSvgIcon)
  .mount('#app');
