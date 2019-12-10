<template>
  <div class="image-wrapper">
    <div class="canvasContainer" ref="canvasContainer" />
    <ImageUpload @imageChange="onImageChange" />
    <!-- (comes from this.$emit('imageChange', this.previewImage);) -->
    <div v-if="debug" class="controls">
      <label for="port">RunwayML HTTP Server http://localhost:</label>
      <input type="text" id="port" name="port" v-model="port" />
    </div>
    <div v-if="debug">
      <img ref="srcImage" />
      <img ref="depthImage" />
    </div>
  </div>
</template>

<script>
import ImageUpload from './ImageUpload.vue';
import ImageEffect from '../scripts/image-effect';

import { loadImage, dataUrlToImage } from '../scripts/utils/image-utils';

export default {
  components: {
    ImageUpload,
  },
  data: () => ({
    port: 8000, // default port
    displayImage: null,
    debug: false,
  }),
  computed: {
    postUrl() {
      return `http://localhost:${this.port}/query`;
    },
  },
  mounted() {
    this.displayImage = new ImageEffect(this.$refs.canvasContainer);

    if (this.debug) {
      Promise.all([
        loadImage('../test-img.png'),
        loadImage('../test-img-depth.png'),
      ]).then((img) => {
        this.displayImage.addTexture([img[0], img[1]]);
      });
    }
  },
  methods: {
    async onImageChange(imgUrl) {
      if (this.debug) {
        this.$refs.srcImage.src = imgUrl;
      }
      this.sendImage(this.postUrl, {
        image: imgUrl,
      });
    },
    async sendImage(url, data) {
      try {
        const response = await fetch(`${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const processedImg = await response.json();

        // show depth image
        if (this.debug) {
          this.$refs.depthImage.src = processedImg.depth_image;
        }

        // send images to webgl programm
        if (this.displayImage) {
          Promise.all([
            dataUrlToImage(data.image),
            dataUrlToImage(processedImg.depth_image),
          ]).then((img) => {
            this.displayImage.addTexture([img[0], img[1]]);
          });
        }
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('Please check RunwayML\'s GET port and make sure a workspace with \'DenseDepth\' is running.');
        // console.error(error);
      }
    },
  },
};
</script>

<style>
canvas {
  display: block;
}
input {
  border: 0;
  font-size: inherit;
  font-family: inherit;
  width: 4em;
}
img {
  width: 400px;
}

.controls {
  font-size: 1rem;
  font-family: monospace;
}
.canvasContainer {
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.image-wrapper{
  position: relative;
}
</style>
