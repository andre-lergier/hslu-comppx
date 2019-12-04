import vertex from '../shaders/vertex.glsl';
import fragment from '../shaders/fragment.glsl';

const compileShader = (gl, shaderType, shaderSource) => {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    throw new Error(`could not compile shader: ${gl.getShaderInfoLog(shader)}`);
  }
  return shader;
};

const initShaderProgram = (gl) => {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertex);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragment);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    throw new Error(`program filed to link: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
};

export default initShaderProgram;
