const initBuffer = (gl) => {
  // create buffer
  const positionBuffer = gl.createBuffer();
  // bind to bind point
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // define positions
  const positions = [
    -1, -1,
    -1, 1,
    1, -1,
    -1, 1,
    1, -1,
    1, 1,
  ];
  // bind positions to bind point
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return positionBuffer;
};

export default initBuffer;
