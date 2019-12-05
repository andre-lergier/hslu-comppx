/*
* Helper class to simplify the creation of Uniforms
*/
export class Uniform {
  constructor(name, suffix, program, gl) {
    this.name = name;
    this.suffix = suffix;
    this.gl = gl;
    this.program = program;
    this.location = gl.getUniformLocation(program, name);
  }

  set(...values) {
    const method = `uniform${this.suffix}`;
    const args = [this.location].concat(values);
    this.gl[method](...args);
  }
}

/*
* Helper class that creates a buffer to draw a rectangle in WebGL
*/
export class Rect {
  constructor(gl) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, Rect.verts, gl.STATIC_DRAW);
  }

  static get verts() {
    return new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]);
  }

  // eslint-disable-next-line class-methods-use-this
  render(gl) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

/*
* Clamps a number to the given lower and upper limits
*/
export const clamp = (number, lower, upper) => {
  let num = number;
  if (num === number) {
    if (upper !== undefined) {
      num = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      num = number >= lower ? number : lower;
    }
  }
  return num;
};
