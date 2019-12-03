<template>
  <div>
    <div class="controls">
      <label for="port">RunwayML HTTP Server http://localhost:</label>
      <input type="text" id="port" name="port" v-model="port" />
      <button @click="submitImage">Process Image</button>
    </div>
    <img ref="srcImage" />
    <img ref="depthImage" />
  </div>
</template>

<script>
import { loadImage, dataUrlFromImage } from '../scripts/utils/image-utils';

export default {
  data: () => ({
    port: 8000, // default port
  }),
  computed: {
    postUrl() {
      return `http://localhost:${this.port}/query`;
    },
  },
  methods: {
    async submitImage() {
      // const imageData = toDataURL(img);
      const img = await loadImage('/emmenbrucke.jpg');
      img.onload = () => {
        this.$refs.srcImage.src = img.src;
        this.sendImage(this.postUrl, {
          image: dataUrlFromImage(img),
        });
      };
    },
    // send image to runwayML to receive depthData
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
        this.$refs.depthImage.src = processedImg.depth_image;
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
</style>
