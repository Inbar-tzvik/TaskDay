import { createRouter, createWebHashHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue'
import home from '../views/home.vue';
// import about from '../views/about.vue'
import mainBoard from '../views/main-board.vue';
// import toyDetails from '../views/toy-details.vue'
// import toyEdit from '../views/toy-edit.vue'
// import userDetails from '../views/user-details.vue'

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'active',
    routes: [{
            path: '/',
            name: 'home',
            component: home,
        },
        // THIS WILL BE HOME PAGE!!!
        // {
        //     path: '/main',
        //     name: 'main-board',
        //     component: HOME PAGE!!!!!!!!!!!!!!!!!!!
        // },
        {
            path: '/main/:boardId',
            name: 'main-board',
            component: mainBoard,
        },
        // {
        //     path: '/fun',
        //     name: 'toy-app',
        //     component: funApp,
        // },
        // {
        //     path: '/about',
        //     name: 'about',
        //     component: about
        //         // route level code-splitting
        //         // this generates a separate chunk (About.[hash].js) for this route
        //         // which is lazy-loaded when the route is visited.
        //         // component: () => import('../views/AboutView.vue')
        // },
        // {
        //     path: '/user',
        //     component: userDetails
        // },
    ],
});

export default router;