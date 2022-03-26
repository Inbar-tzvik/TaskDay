import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import store from './store';
import DropdownMenu from '@innologica/vue-dropdown-menu';

// Styles
import '../styles/styles.scss';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// library.add(faCaretDown);
// import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { dom } from '@fortawesome/fontawesome-svg-core';
dom.watch();
// library.add(faUserSecret, faCaretDown)
// library.add(faPhone);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(ElementPlus);
app.use(DropdownMenu);

app.use(router);
app.use(store);
app.mount('#app');
