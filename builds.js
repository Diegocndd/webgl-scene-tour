import { createProgram, createShader, loadGLSL } from "./utils.js";

export const buildPyramid = async (gl) => {
  const { vertexCode, fragCode } = await loadGLSL("pyramid");
  const vtxShader = createShader(gl, gl.VERTEX_SHADER, vertexCode);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragCode);
  const prog = createProgram(gl, vtxShader, fragShader);

  return prog;
};

export const buildCube = async (gl) => {
  const { vertexCode, fragCode } = await loadGLSL("cube");
  const vtxShader = createShader(gl, gl.VERTEX_SHADER, vertexCode);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragCode);
  const prog = createProgram(gl, vtxShader, fragShader);

  return prog;
};

export const buildSphere = async (gl) => {
  const { vertexCode, fragCode } = await loadGLSL("sphere");
  const vtxShader = createShader(gl, gl.VERTEX_SHADER, vertexCode);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragCode);
  const prog = createProgram(gl, vtxShader, fragShader);
  gl.useProgram(prog);

  return prog;
};
