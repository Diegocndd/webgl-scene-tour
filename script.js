import { buildSphere, buildCube, buildPyramid } from "./builds.js";
import { createSphere, createCube, createPyramid } from "./configScene.js";
import { cubeConfigs, pyramidConfigs, sphereConfigs } from "./configs.js";
import {
  createCamera,
  createPerspective,
  createProgram,
  initOpenGL,
  loadGLSL,
} from "./utils.js";
let camX = 0;
let camY = 0;
let camZ = 5;

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

document.addEventListener("keydown", function (event) {
  var arrowKey = "";
  console.log(event.key);
  // Verifica se a tecla pressionada é uma das setas
  switch (event.key) {
    case "ArrowUp":
      camY += 0.1;
      break;
    case "ArrowDown":
      camY -= 0.1;
      break;
    case "a":
      camX += 0.1;
      arrowKey = "Seta para a esquerda";
      break;
    case "d":
      camX -= 0.1;
      arrowKey = "Seta para a direita";
      break;
    case "s":
      camZ += 0.1;
      break;
    case "w":
      camZ -= 0.1;
      break;

    default:
      // Se não for uma seta, não faz nada
      return;
  }
});

TEXTIMG = new Image();
TEXTIMG.crossOrigin = "anonymous";
TEXTIMG.src = "assets/earth.jpg";
TEXTIMG.onload = async function () {
  const prog1 = await buildSphere(gl);
  const sphere = sphereConfigs(25, 25, 0.5);

  console.log(sphere.vertices);
  function draw() {
    initOpenGL(gl);

    var mproj = createPerspective(
      30,
      gl.canvas.width / gl.canvas.height,
      1,
      50
    );
    var cam = createCamera([camX, camY, camZ], [camX, camY, 0], [0, 60, 0]);

    // var tz = math.matrix([
    //   [1.0, 0.0, 0.0, 0.0],
    //   [0.0, 1.0, 0.0, 0.0],
    //   [0.0, 0.0, 1.0, -5.0],
    //   [0.0, 0.0, 0.0, 1.0],
    // ]);

    // var matrotZ = math.matrix([
    //   [
    //     Math.cos((angle * Math.PI) / 180.0),
    //     -Math.sin((angle * Math.PI) / 180.0),
    //     0.0,
    //     0.0,
    //   ],
    //   [
    //     Math.sin((angle * Math.PI) / 180.0),
    //     Math.cos((angle * Math.PI) / 180.0),
    //     0.0,
    //     0.0,
    //   ],
    //   [0.0, 0.0, 1.0, 0.0],
    //   [0.0, 0.0, 0.0, 1.0],
    // ]);

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

    // var matrotX = math.matrix([
    //   [1.0, 0.0, 0.0, 0.0],
    //   [
    //     0.0,
    //     Math.cos((angle * Math.PI) / 180.0),
    //     -Math.sin((angle * Math.PI) / 180.0),
    //     0.0,
    //   ],
    //   [
    //     0.0,
    //     Math.sin((angle * Math.PI) / 180.0),
    //     Math.cos((angle * Math.PI) / 180.0),
    //     0.0,
    //   ],
    //   [0.0, 0.0, 0.0, 1.0],
    // ]);

    let transforma = math.multiply(cam, matrotY);
    transforma = math.multiply(mproj, transforma);

    // let transforma = cam;

    // transforma = math.multiply(matrotY, transforma);

    transforma = math.flatten(math.transpose(transforma))._data;
    // console.log(transforma);
    createSphere(gl, prog1, sphere.vertices, sphere.indices, TEXTIMG);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(prog1);
    const transfPtr = gl.getUniformLocation(prog1, "transf");
    gl.uniformMatrix4fv(transfPtr, false, transforma);
    gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0);

    angle += 2;
    // camX += 0.01;
    // camY -= 0.01;
    requestAnimationFrame(draw);
  }

  draw();
};
