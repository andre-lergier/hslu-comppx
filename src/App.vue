<template>
  <div id="app">
    <DepthImage />
    <Canvas />
    <ImageUpload />
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue';
import ImageUpload from './components/ImageUpload.vue';
import DepthImage from './components/DepthImage.vue';

export default {
  name: 'app',
  components: {
    Canvas,
    ImageUpload,
    DepthImage,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;

  &::before, &::after{
    box-sizing: border-box;
  }
}

body {
  margin: 0;
}

#app {
  font-family: -apple-system, Arial, sans-serif;
}
</style>
