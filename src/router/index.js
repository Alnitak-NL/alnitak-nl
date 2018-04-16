import Vue from 'vue';
import Router from 'vue-router';
import BlogOverview from '@/components/BlogOverview';
import BlogDetail from '@/components/BlogDetail';
import BlogSearch from '@/components/BlogSearch';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'BlogOverview',
            component: BlogOverview,
        },
        {
            path: '/blog/:uid',
            name: 'BlogDetail',
            component: BlogDetail,
        },
        {
            path: '/search',
            name: 'BlogSearch',
            component: BlogSearch,
        },
    ],
});
