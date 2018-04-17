<template>
    <section class="image-slice">
        <picture>
            <source
                    media="(min-width: 768px)"
                    v-bind:srcset="images.image_desktop.small"
            />

            <source
                    media="(min-width: 480px)"
                    v-bind:srcset="images.image_tablet.small"
            />

            <source
                    media="(max-width: 480px)"
                    v-bind:srcset="images.image_mobile.small"
            />

            <img v-bind:src="images.image_desktop.small" v-bind:alt="images.alt"/>
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
                image_desktop: {
                    small: 'https://res.cloudinary.com/alnitak/image/fetch/w_1024,f_auto/' + this.content.primary.image_desktop.url,
                    large: 'https://res.cloudinary.com/alnitak/image/fetch/w_2048,f_auto/' + this.content.primary.image_desktop.url,
                },
                image_tablet: {
                    small: 'https://res.cloudinary.com/alnitak/image/fetch/w_768,f_auto/' + this.content.primary.image_tablet.url,
                    large: 'https://res.cloudinary.com/alnitak/image/fetch/w_1536,f_auto/' + this.content.primary.image_tablet.url,
                },
                image_mobile: {
                    small: 'https://res.cloudinary.com/alnitak/image/fetch/w_480,f_auto/' + this.content.primary.image_mobile.url,
                    large: 'https://res.cloudinary.com/alnitak/image/fetch/w_960,f_auto/' + this.content.primary.image_mobile.url,
                },
                alt: 'test',
            };
        },
    };
</script>
