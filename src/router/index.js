import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AccountPage from '../components/AccountPage.vue';
import PageNotFound from '../components/PageNotFound.vue'


const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/account/:id',
        name: 'AccountPage',
        component: AccountPage
    },
    {
        path: "/:catchAll(.*)",
        name: 'PageNotFound',
        component: PageNotFound
    }
]

const router = createRouter({
    history: createWebHistory((process.env.BASE_URL)),
    routes
})

export default router