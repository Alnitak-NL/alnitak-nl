// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import * as Prismic from 'prismic-javascript';
import Vue from 'vue';
import VuePrism from 'vue-prism';
import App from './App';
import router from './router/index';

Vue.config.productionTip = false;

Vue.mixin({
    methods: {
        cloudinaryImage(url, transformor) {
            if (url == null) {
                return url;
            }

            return 'https://res.cloudinary.com/alnitak/image/fetch/' + transformor + '/' + url;
        },

        getPrismicApi() {
            return Prismic.getApi('https://alnitak-nl.prismic.io/api/v2', {});
        },
    },
    created() {
        const myOption = this.$options.myOption;
        if (myOption) {
            console.log(myOption);
        }
    },
});

Vue.use(VuePrism);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});
