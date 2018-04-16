<template>
    <section class="text-slice">
        <div v-html="htmlTitle"></div>
        <div v-html="htmlContent"></div>
    </section>
</template>
<script>
    import * as PrismicDOM from 'prismic-dom';

    const Elements = PrismicDOM.RichText.Elements;

    export default {
        props: ['content'],
        methods: {
            // eslint-disable-next-line
            htmlSerializer(type, element, content, children) {
                if (type === Elements.image) {
                    const url = 'https://res.cloudinary.com/alnitak/image/fetch/w_1024,f_auto/' + element.url;
                    return '<img src="' + url + '" alt="' + element.alt + '">';
                }

                return null;
            },
        },
        data() {
            return {
                htmlTitle: null,
                htmlContent: null,
            };
        },

        created() {
            const linkResolver = (document => '/' + document.type + '/' + document.uid);

            this.htmlTitle = PrismicDOM.RichText.asHtml(this.content.primary.title1);
            this.htmlContent = PrismicDOM.RichText.asHtml(this.content.primary.text, linkResolver, this.htmlSerializer);
        },
    };
</script>
