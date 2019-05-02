import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Singup from './views/Singup.vue';
import Home from './views/Home.vue';
import ArticleDetail from './views/Article-detail.vue';
import CreateArticle from './views/Create-article.vue';

Vue.use(Router);

const router = new Router({
    routes: [{
        path: '/login',
        component: Login
    },{
        path: '/singup',
        component: Singup
    }, {
        path: '/home',
        component: Home
    }, {
        path: '/article/:id',
        component: ArticleDetail
    },{
        path: '/articles/create',
        component: CreateArticle
    },{
        path: '',
        redirect: '/login'
    }]
});

export default router;