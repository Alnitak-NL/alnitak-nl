<template>
    <section>
        <article v-for="(blog, index) in blogs" v-bind:key="blog.id" v-bind:title="blog.title" :class="{ 'first': index === 0 }">
            <router-link :to="{ name: 'BlogDetail', params: { 'uid': blog.uid }}">
                <div v-bind:style="{ 'background-color': blog.color, 'background-image': 'url(' + blog.img + ')' }"><h1>{{ blog.title }}</h1></div>
            </router-link>
        </article>
    </section>
</template>
<script>
    import * as Prismic from 'prismic-javascript';

    export default {
        name: 'BlogOverview',
        methods: {
            cloudinaryUrlGenerator(url) {
                if (url != null) {
                    return 'https://res.cloudinary.com/alnitak/image/fetch/w_400,h_400,c_fill,f_auto/' + url;
                }
                return url;
            },
        },

        data() {
            return {
                blogs: [],
                search: '',
            };
        },

        beforeMount() {
            const apiEndPoint = 'https://alnitak-nl.prismic.io/api/v2';

            Prismic.getApi(apiEndPoint, {}).then(api => api.query(
                Prismic.Predicates.at('document.type', 'blog'),
                { orderings: '[my.blog.date desc]' }),
            ).then((response) => {
                this.blogs = response.results.map((result) => {
                    // console.log(result);
                    const object = {
                        id: result.id,
                        uid: result.uid,
                        title: result.data.title[0].text,
                        color: (result.data.overview_color) ? result.data.overview_color : '#000',
                        img: this.cloudinaryUrlGenerator(result.data.header_image.url),
                    };
                    return object;
                });
            });
        },
    };
</script>
<style lang="scss" scoped>
    section {
        max-width: 1024px;
        margin: 0 auto;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 1fr 1fr 1fr;

        .first {
            grid-column: 1 / 2;
            grid-row: 1;
        }
    }

    article {
        a {
            text-decoration: none;

            > div {
                min-height: 300px;
                display: block;
                background-size: cover;
            }
        }

        h1 {
            margin: 0;
            padding: 20px;
            color: white;
            font-size: 60px;
            text-transform: uppercase;
        }
    }
</style>
