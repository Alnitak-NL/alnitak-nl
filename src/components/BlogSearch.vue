<template>
    <article>
        <header class="centered">
            <div class="search">
                <input v-model="search" v-on:keyup.enter="searchArticles()" autofocus>
                <button @click="searchArticles()">Search</button>
            </div>
        </header>
        <main class="centered">
            <article v-for="blog in blogs" v-bind:key="blog.id" v-bind:title="blog.title">
                <router-link :to="{ name: 'BlogDetail', params: { 'uid': blog.uid }}">
                    <h2>{{blog.title}}</h2>
                </router-link>
                <main v-html="blog.intro"></main>
            </article>
        </main>
    </article>
</template>
<script>
    import * as Prismic from 'prismic-javascript';
    import * as PrismicDOM from 'prismic-dom';

    export default {
        name: 'BlogOverview',
        methods: {
            searchArticles() {
                const apiEndPoint = 'https://alnitak-nl.prismic.io/api/v2';

                Prismic.getApi(apiEndPoint, {}).then(api => api.query(
                    [
                        Prismic.Predicates.at('document.type', 'blog'),
                        Prismic.Predicates.fulltext('document', this.search),
                    ]),
                ).then((response) => {
                    this.blogs = response.results.map((result) => {
                        const intro = result.data.body.reduce((acc, cur) => {
                            if (acc === null && cur.slice_type === 'text') {
                                /* eslint-disable */
                                acc = cur;
                            }
                            return acc;
                        }, null);

                        const object = {
                            id: result.id,
                            uid: result.uid,
                            title: result.data.title[0].text,
                            intro: (intro) ? PrismicDOM.RichText.asHtml(intro.primary.text) : '',
                        };

                        return object;
                    });
                });
            },
        },

        data() {
            return {
                blogs: [],
                search: '',
            };
        },
    };
</script>
<style lang="scss" scoped>
    a {
        text-transform: uppercase;
        text-decoration: none;
        color: black;
    }

    .search {
        margin-top: 20px;
        display: flex;

        input {
            flex: 1;
            padding: 5px 17px;
            font-size: 30px;
        }

        button {
            width: 120px;
            margin-left: 10px;

            background-color: #000;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
        }

        input,
        button {
            &:focus {
                outline-width: 0;
            }
        }
    }
</style>
