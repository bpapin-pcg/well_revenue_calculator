import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AccountPage from '../components/AccountPage.vue';


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
    }
]

const router = createRouter({
    history: createWebHistory((process.env.BASE_URL)),
    routes
})

export default router