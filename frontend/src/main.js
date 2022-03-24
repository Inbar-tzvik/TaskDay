import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import store from './store';

// Styles
import '../styles/styles.scss';

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount('#app');
