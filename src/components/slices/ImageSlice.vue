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
        methods: {
            generateImageUrl(image, size, pixelDensity = null) {
                const imageUrl = 'https://res.cloudinary.com/alnitak/image/fetch/w_' + size + ',f_auto/' + image;
                return imageUrl + ((pixelDensity != null) ? ' ' + pixelDensity + 'x' : '');
            },
        },
        data() {
            return {
                htmlContent: null,
                images: null,
            };
        },

        created() {
            this.images = {
                image_desktop: this.generateImageUrl(this.content.primary.image_desktop.url, 1024) + ', ' + this.generateImageUrl(this.content.primary.image_desktop.url, 2048, 2),
                image_tablet: this.generateImageUrl(this.content.primary.image_tablet.url, 768) + ', ' + this.generateImageUrl(this.content.primary.image_tablet.url, 1536, 2),
                image_mobile: this.generateImageUrl(this.content.primary.image_mobile.url, 480) + ', ' + this.generateImageUrl(this.content.primary.image_mobile.url, 960, 2),
                image_fallback: this.generateImageUrl(this.content.primary.image_desktop.url, 1024),
                alt: this.content.primary.alt_text[0].text,
            };
        },
    };
</script>
