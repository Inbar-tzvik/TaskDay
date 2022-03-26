import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import store from './store';

// Styles
import '../styles/styles.scss';

// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { faPhone } from '@fortawesome/free-solid-svg-icons';

// library.add(faCaretDown);
// // library.add(faUserSecret, faCaretDown)
// library.add(faPhone);

const app = createApp(App);

// app.component("font-awesome-icon", FontAwesomeIcon)
app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount('#app');
