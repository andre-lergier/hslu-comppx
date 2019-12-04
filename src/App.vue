<template>
  <div id="app">
    <Canvas />
    <ImageUpload />
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue';
import ImageUpload from './components/ImageUpload.vue';

export default {
  name: 'app',
  components: {
    Canvas,
    ImageUpload,
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
