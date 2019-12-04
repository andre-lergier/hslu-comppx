<template>
  <canvas ref="fake3dCanvas" :width="width" :height="height"></canvas>
</template>

<script>
import loadImage from '../scripts/utils/image-loader';

export default {
  name: 'Canvas',
  data: () => ({
    width: Number,
    height: Number,
  }),
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.setupCanvas();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },

    async setupCanvas() {
      const canvas = this.$refs.fake3dCanvas;
      const ctx = canvas.getContext('2d');
      const img = await loadImage('/emmenbrucke.jpg');
      img.onload = () => {
        const imgWidth = img.naturalWidth ? img.naturalWidth : img.width;
        const imgHeight = img.naturalHeight ? img.naturalHeight : img.height;
        const scale = Math.max(this.width / img.width, this.height / img.height);
        const x = (this.width / 2) - (imgWidth / 2) * scale;
        const y = (this.height / 2) - (imgHeight / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      };
    },
  },
};
</script>

<style scoped lang="scss">
 canvas {
   display: block;
 }
</style>
