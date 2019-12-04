import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';
import { compileShader, createProgram } from './modules/shader';
import initBuffer from './modules/buffer';

const drawScene = (gl) => {
  const vertexShader = compileShader(gl, vertex, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, fragment, gl.FRAGMENT_SHADER);
  // create program
  const program = createProgram(gl, vertexShader, fragmentShader);
  // look up location of attribute for the program
  const positionAttribLocation = gl.getAttribLocation(program, 'positions');
  // create buffer
  const positionBuffer = initBuffer(gl);
  // convert positions to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  // clear canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // tell webgl which shader program to execute
  gl.useProgram(program);
  // turn on attribute
  gl.enableVertexAttribArray(positionAttribLocation);
  // bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  const size = 2; // 2 components per iteration
  const type = gl.FLOAT; // the data is 32bit floats
  const normalize = false; // don't normalize the data
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  const offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttribLocation,
    size,
    type,
    normalize,
    stride,
    offset,
  );
};

export default drawScene;
