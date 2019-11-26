<template>
<canvas :width="width" :height="height"></canvas>
</template>

<script>
export default {
  name: 'Canvas',
  data: () => ({
    width: Number,
    height: Number,
  }),
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
