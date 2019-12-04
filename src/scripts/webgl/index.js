import initShaderProgram from './modules/shader';
import initBuffers from './modules/buffer';
import loadTexture from './modules/texture';
import drawScene from './modules/scene';

const render = async (gl) => {
  const shaderProgram = initShaderProgram(gl);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      uImage: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };

  const buffers = initBuffers(gl);

  const texture = await loadTexture(gl, '/emmenbrucke.jpg');

  drawScene(gl, programInfo, buffers, texture);
};

export default render;
