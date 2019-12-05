import { Uniform, Rect } from './utils/webgl-utils';

import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';

export default class ImageEffect {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.container.appendChild(this.canvas);
    this.gl = this.canvas.getContext('webgl');
    this.ratio = window.devicePixelRatio;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.mouseX = 0;
    this.mouseY = 0;

    this.mouseTargetX = 0;
    this.mouseTargetY = 0;

    this.vth = 35;
    this.hth = 15;

    this.startTime = new Date().getTime(); // Get start time for animating
    this.render = this.render.bind(this);

    this.createScene();
    this.addEventListeners();
  }

  createScene() {
    // create program
    this.program = this.gl.createProgram();
    // add shaders
    this.addShader(vertex, this.gl.VERTEX_SHADER);
    this.addShader(fragment, this.gl.FRAGMENT_SHADER);
    // link & use program
    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);

    // create fragment uniforms
    this.uResolution = new Uniform('resolution', '4f', this.program, this.gl);
    this.uMouse = new Uniform('mouse', '2f', this.program, this.gl);
    this.uTime = new Uniform('time', '1f', this.program, this.gl);
    this.uRatio = new Uniform('pixelRatio', '1f', this.program, this.gl);
    this.uThreshold = new Uniform('threshold', '2f', this.program, this.gl);

    // create position attrib
    this.rect = new Rect(this.gl);
    this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
  }

  addTexture(images) {
    this.start(images);
  }

  render() {
    const now = new Date().getTime();
    const currentTime = (now - this.startTime) / 1000;
    this.uTime.set(currentTime);
    // easing
    this.mouseX += (this.mouseTargetX - this.mouseX) * 0.05;
    this.mouseY += (this.mouseTargetY - this.mouseY) * 0.05;

    this.uMouse.set(this.mouseX, this.mouseY);

    // render
    this.rect.render(this.gl);
    requestAnimationFrame(this.render);
  }

  /*
  * uploads textures and initializes the programm
  * @params images as an array of image objects [originalImage, depthImage]
  */
  start(images) {
    const { gl } = this;

    const textures = [];
    // connect images
    this.imageAspect = images[0].naturalHeight / images[0].naturalWidth;
    for (let i = 0; i < images.length; i += 1) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Upload the image into the texture.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[i]);
      textures.push(texture);
    }

    // lookup the sampler locations.
    // eslint-disable-next-line camelcase
    const u_image0Location = this.gl.getUniformLocation(this.program, 'image0');
    // eslint-disable-next-line camelcase
    const u_image1Location = this.gl.getUniformLocation(this.program, 'image1');

    // set which texture units to render with.
    this.gl.uniform1i(u_image0Location, 0); // texture unit 0
    this.gl.uniform1i(u_image1Location, 1); // texture unit 1

    // Set each texture unit to use a particular texture.
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, textures[0]);
    this.gl.activeTexture(this.gl.TEXTURE1);
    this.gl.bindTexture(this.gl.TEXTURE_2D, textures[1]);

    // start application
    this.onResize();
    this.render();
  }

  addShader(source, type) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    const isCompiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (!isCompiled) {
      throw new Error(`Shader compile error: ${this.gl.getShaderInfoLog(shader)}`);
    }
    this.gl.attachShader(this.program, shader);
  }

  addEventListeners() {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onResize = this.onResize.bind(this);

    document.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.onResize);

    this.onResize(); // trigger resize on init
  }

  onMouseMove(e) {
    const halfX = this.windowWidth / 2;
    const halfY = this.windowHeight / 2;

    this.mouseTargetX = (halfX - e.clientX) / halfX;
    this.mouseTargetY = (halfY - e.clientY) / halfY;
  }

  onResize() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.canvas.width = this.width * this.ratio;
    this.canvas.height = this.height * this.ratio;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    let a1;
    let a2;
    if (this.height / this.width < this.imageAspect) {
      a1 = 1;
      a2 = (this.height / this.width) / this.imageAspect;
    } else {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    }
    this.uResolution.set(this.width, this.height, a1, a2);
    this.uRatio.set(1 / this.ratio);
    this.uThreshold.set(this.hth, this.vth);
    this.gl.viewport(0, 0, this.width * this.ratio, this.height * this.ratio);
  }
}
