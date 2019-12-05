<template>
  <div>
    <ImageUpload @imageChange="onImageChange" />
    <div class="controls">
      <label for="port">RunwayML HTTP Server http://localhost:</label>
      <input type="text" id="port" name="port" v-model="port" />
      <!-- <button @click="submitImage">Process Image</button> -->
    </div>
    <img ref="srcImage" />
    <img ref="depthImage" />
  </div>
</template>

<script>
import ImageUpload from './ImageUpload.vue';

export default {
  components: {
    ImageUpload,
  },
  data: () => ({
    port: 8000, // default port
  }),
  computed: {
    postUrl() {
      return `http://localhost:${this.port}/query`;
    },
  },
  methods: {
    onImageChange(imgUrl) {
      this.$refs.srcImage.src = imgUrl;
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
