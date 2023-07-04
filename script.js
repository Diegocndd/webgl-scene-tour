import { buildSphere, buildCube, buildPyramid } from "./builds.js";
import { createSphere, createCube, createPyramid } from "./configScene.js";
import { cubeConfigs, pyramidConfigs, sphereConfigs } from "./configs.js";
import { createProgram, initOpenGL, loadGLSL } from "./utils.js";

let TEXTIMG;
let angle = 0;

const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl");

const getTransforma = (angle) => {
  const matrotZ = math.matrix([
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

  const matrotY = math.matrix([
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

  const matrotX = math.matrix([
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

  var transforma = math.multiply(matrotY, matrotX);
  transforma = math.multiply(matrotZ, transforma);
  // transforma = math.multiply(cam, transforma);
  // transforma = math.multiply(mproj, transforma);

  transforma = math.flatten(math.transpose(transforma))._data;

  return transforma;
};

TEXTIMG = new Image();
TEXTIMG.crossOrigin = "anonymous";
TEXTIMG.src = "assets/earth.jpg";
TEXTIMG.onload = async function () {
  const prog1 = await buildSphere(gl);
  const sphere = sphereConfigs(25, 25, 0.5);

  console.log(sphere.vertices);
  function draw() {
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

    createSphere(gl, prog1, sphere.vertices, sphere.indices, TEXTIMG);

    gl.useProgram(prog1);
    const transfPtr = gl.getUniformLocation(prog1, "transf");
    gl.uniformMatrix4fv(transfPtr, false, matrotY);
    gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0);

    angle += 2;

    requestAnimationFrame(draw);
  }

  draw();
};
