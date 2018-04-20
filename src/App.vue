<template>
    <div id="app">
        <header>
            <nav class="centered">
                <router-link :to="{ name: 'BlogOverview' }">
                    <div class="title-name">My weblog</div>
                </router-link>

                <router-link :to="{ name: 'BlogSearch' }" class="search">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <path d="M31.715 28.953c0.381 0.381 0.381 0.999 0 1.381l-1.381 1.381c-0.382 0.381-1 0.381-1.381 0l-9.668-9.668c-0.105-0.105-0.175-0.229-0.222-0.361-1.983 1.449-4.418 2.314-7.063 2.314-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12 0 2.645-0.865 5.080-2.314 7.063 0.132 0.047 0.256 0.116 0.361 0.222l9.668 9.668zM12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8c0-4.418-3.582-8-8-8z"></path>
                    </svg>
                </router-link>
            </nav>

        </header>
        <main>
            <router-view/>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'App',
    };
</script>

<style lang="scss">
    @import 'prismjs/themes/prism.css';
    @import url('https://fonts.googleapis.com/css?family=Cantarell:400,400i,700|Fjalla+One');

    body {
        margin: 0;
        padding: 0;
        font-family: 'Cantarell', sans-serif;
    }

    h1 {
        font-family: 'Fjalla One', sans-serif;
    }

    .centered {
        max-width: 1024px;
        margin: 0 auto;
    }

    img {
        width: 100%;
    }
</style>
<style lang="scss" scoped>
    header {
        position: relative;

        a {
            text-decoration: none;
        }

        .title-name {
            display: inline-block;
            color: black;
            line-height: 60px;
            font-family: 'Fjalla One', sans-serif;
            text-transform: uppercase;
            font-size: 40px;
        }

        .search {
            float: right;
            margin-top: 12px;
        }

    }
</style>
