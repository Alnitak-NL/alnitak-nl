<template>
    <section>
        <article>
            <header v-bind:style="{ 'background-color': blog.color, 'background-image': 'url(' + blog.img + ')' }">
                <h1 class="centered">{{blog.title}}</h1>
            </header>
            <main class="centered">
                <template v-for="(content, index) in blog.content" v-if="content.component != null">
                    <component v-bind:is="content.component" v-bind:key="index" v-bind:content="content.data"></component>
                </template>
            </main>
        </article>
    </section>
</template>
<script>
    import * as Prismic from 'prismic-javascript';
    import TextSlice from './slices/TextSlice';
    import CodeSlice from './slices/CodeSlice';
    import ImageSlice from './slices/ImageSlice';

    export default {
        name: 'BlogDetail',
        components: {
            TextSlice,
            ImageSlice,
            CodeSlice,
        },
        methods: {
            cloudinaryUrlGenerator(url) {
                if (url != null) {
                    return 'https://res.cloudinary.com/alnitak/image/fetch/w_1900,h_500,c_fill,f_auto/' + url;
                }
                return url;
            },
        },
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                blog: {},
            };
        },

        created() {
            const apiEndPoint = 'https://alnitak-nl.prismic.io/api/v2';
            const sliceComponentMap = {
                text: TextSlice,
                code_snippet: CodeSlice,
                image: ImageSlice,
            };

            Prismic.getApi(apiEndPoint, {}).then(api => api.getByUID('blog', this.$route.params.uid),
            ).then((result) => {
                const blog = {
                    title: result.data.title[0].text,
                    color: (result.data.overview_color) ? result.data.overview_color : '#000',
                    img: this.cloudinaryUrlGenerator(result.data.header_image.url),
                    content: result.data.body.map((slice) => {
                        const block = {
                            component: (Object.prototype.hasOwnProperty.call(sliceComponentMap, slice.slice_type)) ? sliceComponentMap[slice.slice_type] : null,
                            data: slice,
                        };
                        return block;
                    }),
                };
                this.blog = blog;
            });
        },
    };
</script>
<style lang="scss" scoped>
    header {
        padding: 100px 20px;
        background-size: cover;
    }

    h1 {
        color: white;
        font-size: 100px;
        text-transform: uppercase;
    }
</style>
