<template>
  <div id="app">
    <Canvas />
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue';

export default {
  name: 'app',
  components: {
    Canvas,
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
