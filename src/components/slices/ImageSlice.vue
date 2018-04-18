<template>
    <section class="image-slice">
        <picture>
            <source
                    media="(min-width: 768px)"
                    v-bind:srcset="images.image_desktop"
            />

            <source
                    media="(min-width: 480px)"
                    v-bind:srcset="images.image_tablet"
            />

            <source
                    media="(max-width: 480px)"
                    v-bind:srcset="images.image_mobile"
            />

            <img v-bind:src="images.image_fallback" v-bind:alt="images.alt"/>
        </picture>
    </section>
</template>
<script>
    export default {
        props: ['content'],
        data() {
            return {
                htmlContent: null,
                images: null,
            };
        },

        created() {
            this.images = {
                image_desktop: this.cloudinaryImage(this.content.primary.image_desktop.url, 'w_1024,f_auto') + ', ' + this.cloudinaryImage(this.content.primary.image_desktop.url, 'w_2048,f_auto') + ' 2x',
                image_tablet: this.cloudinaryImage(this.content.primary.image_tablet.url, 'w_768,f_auto') + ', ' + this.cloudinaryImage(this.content.primary.image_tablet.url, 'w_1536,f_auto') + ' 2x',
                image_mobile: this.cloudinaryImage(this.content.primary.image_mobile.url, 'w_480,f_auto') + ', ' + this.cloudinaryImage(this.content.primary.image_mobile.url, 'w_960,f_auto') + ' 2x',
                image_fallback: this.cloudinaryImage(this.content.primary.image_desktop.url, 'w_1024,f_auto'),
                alt: this.content.primary.alt_text[0].text,
            };
        },
    };
</script>
