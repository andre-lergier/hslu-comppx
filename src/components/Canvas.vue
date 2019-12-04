<template>
<section ref="canvasContainer"></section>
</template>

<script>
import drawScene from '../scripts/webgl/index';

export default {
  name: 'Canvas',
  mounted() {
    this.setupCanvas();
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    setupCanvas() {
      const container = this.$refs.canvasContainer;
      this.canvas = document.createElement('canvas');
      container.appendChild(this.canvas);
      const gl = this.canvas.getContext('webgl');

      this.resize();

      drawScene(gl);
      const primitiveType = gl.TRIANGLES;
      const offset = 0;
      const count = 6;
      gl.drawArrays(primitiveType, offset, count);
    },
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.style.width = `${window.innerWidth}px`;
      this.canvas.style.height = `${window.innerHeight}px`;
    },
  },
};
</script>
