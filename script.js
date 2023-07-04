import { buildSphere, buildCube, buildPyramid } from "./builds.js";
import { createSphere, createCube, createPyramid } from "./configScene.js";
import { cubeConfigs, pyramidConfigs, sphereConfigs } from "./configs.js";
import { createProgram, initOpenGL, loadGLSL } from "./utils.js";

let TEXTIMG;
let angleP = 0;
let angleC = 0;

const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl");

const getTransforma = (angle) => {
  var matrotZ = math.matrix([
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

  var matrotY = math.matrix([
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

  var matrotX = math.matrix([
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
TEXTIMG.src = "assets/gato.jpg";
TEXTIMG.onload = async function () {
  ///////////

  const prog1 = await buildPyramid(gl);
  const pyramid = pyramidConfigs(0.5, 1, 0, 0, 0);

  ///////////

  const prog2 = await buildCube(gl);
  const cube = cubeConfigs(0.4, 0, 0, 1);

  ///////////

  function draw() {
    initOpenGL(gl);

    const transformaP = getTransforma(angleP);
    const transformaC = getTransforma(angleC);

    createCube(gl, prog2, cube.vertices, cube.indices);

    gl.useProgram(prog2);
    const transfPtr2 = gl.getUniformLocation(prog2, "transf");
    gl.uniformMatrix4fv(transfPtr2, false, transformaC);
    gl.drawElements(gl.TRIANGLES, cube.indices.length, gl.UNSIGNED_SHORT, 0);

    createPyramid(gl, prog1, pyramid.vertices, pyramid.indices);

    gl.useProgram(prog1);
    const transfPtr = gl.getUniformLocation(prog1, "transf");
    gl.uniformMatrix4fv(transfPtr, false, transformaP);
    gl.drawElements(gl.TRIANGLES, pyramid.indices.length, gl.UNSIGNED_SHORT, 0);

    angleP += 1;
    angleC += 2;

    requestAnimationFrame(draw);
  }

  draw();
};
