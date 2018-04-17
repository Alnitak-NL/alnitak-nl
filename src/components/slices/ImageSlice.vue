<template>
    <section class="image-slice">
        <div v-html="content"></div>
        <picture>
            <!--<source media="(min-width: 36em)"-->
                    <!--srcset="large.jpg  1024w,-->
                            <!--medium.jpg 640w,-->
                            <!--small.jpg  320w"-->
                    <!--sizes="33.3vw" />-->
            <!--<source srcset="cropped-large.jpg 2x,-->


                            <!--cropped-small.jpg 1x" />-->

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

            <img v-bind:src="images.image_desktop" v-bind:alt="images.alt"/>
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
                image_desktop: this.content.primary.image_desktop.url,
                image_tablet: this.content.primary.image_tablet.url,
                image_mobile: this.content.primary.image_mobile.url,
                alt: 'test',
            };
        },
    };
</script>
