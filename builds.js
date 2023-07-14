import { createProgram, createShader, loadGLSL } from "./utils.js";

export const buildSphere = async (gl) => {
  const { vertexCode, fragCode } = await loadGLSL("sphere");
  const vtxShader = createShader(gl, gl.VERTEX_SHADER, vertexCode);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragCode);
  const prog = createProgram(gl, vtxShader, fragShader);
  gl.useProgram(prog);

  return prog;
};
