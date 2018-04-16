<template>
    <section class="text-slice">
        <div v-html="htmlTitle"></div>
        <div v-html="htmlContent"></div>
    </section>
</template>
<script>
    import * as PrismicDOM from 'prismic-dom';

    export default {
        props: ['content'],
        data() {
            return {
                htmlTitle: null,
                htmlContent: null,
            };
        },

        created() {
            const linkResolver = (document => '/' + document.type + '/' + document.uid);

            this.htmlTitle = PrismicDOM.RichText.asHtml(this.content.primary.title1);
            this.htmlContent = PrismicDOM.RichText.asHtml(this.content.primary.text, linkResolver);
        },
    };
</script>
