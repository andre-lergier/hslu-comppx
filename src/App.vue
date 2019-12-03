<template>
  <div id="app">
    <DepthImage />
    <Canvas />
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue';
import DepthImage from './components/DepthImage.vue';

export default {
  name: 'app',
  components: {
    Canvas,
    DepthImage,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: -apple-system, Arial, sans-serif;
}
</style>
