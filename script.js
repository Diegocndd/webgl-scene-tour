import { buildSphere, buildCube } from "./builds.js";
import { createSphere, createCube, createPyramid } from "./configScene.js";
import { cubeConfigs, pyramidConfigs, sphereConfigs } from "./configs.js";
import { createProgram, initOpenGL, loadGLSL } from "./utils.js";

let TEXTIMG;
let angle = 0;

const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl");

TEXTIMG = new Image();
TEXTIMG.crossOrigin = "anonymous";
TEXTIMG.src = "assets/gato.jpg";
TEXTIMG.onload = async function () {
  const prog = await buildCube(gl);
  const { vertices, indices } = pyramidConfigs(0.8, 1, 0, 0, 0);
  createPyramid(gl, prog, vertices, indices);
  draw(prog, indices.length);
};

function draw(prog, numIndices) {
  initOpenGL(gl);

  const matrotY = [
    Math.cos((angle * Math.PI) / 180.0),
    0.0,
    -Math.sin((angle * Math.PI) / 180.0),
    0.0,

    0.0,
    1.0,
    0.0,
    0.0,
    Math.sin((angle * Math.PI) / 180.0),
    0.0,
    Math.cos((angle * Math.PI) / 180.0),
    0.0,

    0.0,
    0.0,
    0.0,
    1.0,
  ];

  const transfPtr = gl.getUniformLocation(prog, "transf");
  gl.uniformMatrix4fv(transfPtr, false, matrotY);
  gl.drawElements(gl.TRIANGLES, numIndices, gl.UNSIGNED_SHORT, 0);

  angle += 1;

  requestAnimationFrame(() => draw(prog, numIndices));
}
