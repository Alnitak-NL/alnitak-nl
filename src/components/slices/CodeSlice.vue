<template>
    <section class="code-slice">
        <label v-html="filename"></label>
        <pre v-bind:class="highlightClass">
            <code>
{{code}}</code>
        </pre>
        <div v-html="description"></div>
    </section>
</template>
<script>
    import * as PrismicDOM from 'prismic-dom';

    export default {
        props: ['content'],

        data() {
            return {
                code: null,
                highlightClass: null,
                filename: null,
                description: null,
            };
        },

        created() {
            this.code = this.content.primary.code.reduce((acc, line) => {
                /* eslint-disable */
                acc += line.text + '\n';
                return acc;
            }, '');
            this.highlightClass = 'lang-' + this.content.primary.highlight;
            this.filename = PrismicDOM.RichText.asHtml(this.content.primary.file_name_type);
            this.description = PrismicDOM.RichText.asHtml(this.content.primary.code_description);
        },

    };
</script>
