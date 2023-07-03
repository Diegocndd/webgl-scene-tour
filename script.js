// import { x } from "./script2.js";

import { renderSphere, createSquare } from "./configScene.js";
import createSphere from "./createSphere.js";
import {
  createCamera,
  createPerspective,
  createProgram,
  createShader,
  initOpenGL,
  loadGLSL,
} from "./utils.js";

const { vertexCode, fragCode } = await loadGLSL();

let TEXTIMG;
let angle = 0;

const canvas = document.getElementById("glcanvas");

const gl = canvas.getContext("webgl");

const vtxShader = createShader(gl, gl.VERTEX_SHADER, vertexCode);
const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragCode);

const prog = createProgram(gl, vtxShader, fragShader);

gl.useProgram(prog);

// let { vertices, indices } = createSphere(50, 50, 0.5);
// console.log(vertices);
// renderSphere(gl, prog, vertices, indices);

TEXTIMG = new Image();
TEXTIMG.crossOrigin = "anonymous";
TEXTIMG.src = "assets/gato.jpg";
TEXTIMG.onload = function () {
  createSquare(
    gl,
    prog,
    TEXTIMG,
    new Float32Array([
      -0.5, 0.5, 0.0, 0.0, 0.0, -0.5, -0.5, 0.0, 0.0, 1.0, 0.5, -0.5, 0.0, 1.0,
      1.0, 0.5, 0.5, 0.0, 1.0, 0.0, -0.5, 0.5, 0.0, 0.0, 0.0,

      //Quad 2
      -0.5, -0.5, 0.0, 1.0, 1.0, -0.5, 0.5, 0.0, 1.0, 0.0, -0.5, 0.5, 1.0, 0.0,
      0.0, -0.5, -0.5, 1.0, 0.0, 1.0, -0.5, -0.5, 0.0, 1.0, 1.0,

      //Quad 3
      0.5, -0.5, 1.0, 1.0, 1.0, 0.5, -0.5, 0.0, 1.0, 0.0, -0.5, -0.5, 0.0, 0.0,
      0.0, -0.5, -0.5, 1.0, 0.0, 1.0, 0.5, -0.5, 1.0, 1.0, 1.0,
    ])
  );
  draw();
};

function draw() {
  initOpenGL(gl);

  const mproj = createPerspective(
    20,
    gl.canvas.width / gl.canvas.height,
    1,
    10
  );
  const cam = createCamera([5, 5, 5], [0, 0, 0], [5, 6, 5]);

  var matRotZ = math.matrix([
    [
      Math.cos((angle * Math.PI) / 180.0),
      -Math.sin((angle * Math.PI) / 180.0),
      0.0,
      0.0,
    ],
    [
      Math.sin((angle * Math.PI) / 180.0),
      Math.cos((angle * Math.PI) / 180.0),
      0.0,
      0.0,
    ],
    [0.0, 0.0, 1.0, 0.0],
    [0.0, 0.0, 0.0, 1.0],
  ]);

  var matRotY = math.matrix([
    [
      Math.cos((angle * Math.PI) / 180.0),
      0.0,
      -Math.sin((angle * Math.PI) / 180.0),
      0.0,
    ],
    [0.0, 1.0, 0.0, 0.0],
    [
      Math.sin((angle * Math.PI) / 180.0),
      0.0,
      Math.cos((angle * Math.PI) / 180.0),
      0.0,
    ],
    [0.0, 0.0, 0.0, 1.0],
  ]);

  var matRotX = math.matrix([
    [1.0, 0.0, 0.0, 0.0],
    [
      0.0,
      Math.cos((angle * Math.PI) / 180.0),
      -Math.sin((angle * Math.PI) / 180.0),
      0.0,
    ],
    [
      0.0,
      Math.sin((angle * Math.PI) / 180.0),
      Math.cos((angle * Math.PI) / 180.0),
      0.0,
    ],
    [0.0, 0.0, 0.0, 1.0],
  ]);

  let transforma = math.multiply(matRotY, matRotX);
  transforma = math.multiply(matRotZ, transforma);
  transforma = math.multiply(cam, transforma);
  transforma = math.multiply(mproj, transforma);

  transforma = math.flatten(math.transpose(transforma))._data;

  let transfPtr = gl.getUniformLocation(prog, "transf");
  gl.uniformMatrix4fv(transfPtr, false, transforma);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.drawArrays(gl.TRIANGLES, 2, 3);

  gl.drawArrays(gl.TRIANGLES, 5, 3);
  gl.drawArrays(gl.TRIANGLES, 7, 3);

  gl.drawArrays(gl.TRIANGLES, 10, 3);
  gl.drawArrays(gl.TRIANGLES, 12, 3);
  // angle += 1;

  requestAnimationFrame(draw);
}
