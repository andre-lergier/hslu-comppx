<template>
  <div id="app">
    <DepthImage />
  </div>
</template>

<script>
import DepthImage from './components/DepthImage.vue';

export default {
  name: 'app',
  components: {
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
