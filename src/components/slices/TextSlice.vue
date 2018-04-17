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
                    const src = 'https://res.cloudinary.com/alnitak/image/fetch/w_1024,f_auto/' + element.url;
                    const srcSet = [
                        {
                            src: 'https://res.cloudinary.com/alnitak/image/fetch/w_2048,f_auto/' + element.url,
                            size: '2048w',
                        },
                        {
                            src: 'https://res.cloudinary.com/alnitak/image/fetch/w_1280,f_auto/' + element.url,
                            size: '1280w',
                        },
                        {
                            src: 'https://res.cloudinary.com/alnitak/image/fetch/w_768,f_auto/' + element.url,
                            size: '768w',
                        },
                    ].reduce((acc, cur) => {
                        // eslint-disable-next-line
                        acc = acc + cur.src + ' ' + cur.size + ',';
                        return acc;
                    }, '');

                    return '<img src="' + src + '" srcset="' + srcSet + '" sizes="(min-width: 1024px) 1024px, 100vw" alt="' + element.alt + '">';
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
