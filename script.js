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
let camZ = 20;
let look = 0;

let angle = 0;

const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl", { alpha: true });
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

document.addEventListener("keydown", function (event) {
  var arrowKey = "";
  console.log(event.key);
  // Verifica se a tecla pressionada é uma das setas
  switch (event.key) {
    case "ArrowLeft":
      look += 0.1;
      break;
    case "ArrowRight":
      look -= 0.1;
      break;
    case "ArrowUp":
      camY += 0.1;
      break;
    case "ArrowDown":
      camY -= 0.1;
      break;
    case "a":
      look -= 0.1;
      // camX += 0.1;
      arrowKey = "Seta para a esquerda";
      break;
    case "d":
      look += 0.1;
      arrowKey = "Seta para a direita";
      break;
    case "s":
      let aux = Math.round((camZ + 0.1) * 100) / 100;
      if (aux > 0) {
        camZ = aux;
      }
      break;
    case "w":
      let aux2 = Math.round((camZ - 0.1) * 100) / 100;
      if (aux2 > 0) {
        camZ = aux2;
      }
      break;

    default:
      // Se não for uma seta, não faz nada
      return;
  }
  console.log(camZ);
});

const imageUrls = ["assets/earth.jpg", "assets/moon.jpg", "assets/sun.png"];
const images = [];

async function allImagesLoaded() {
  const prog1 = await buildSphere(gl);
  const sphere = sphereConfigs(25, 25, 0.5, 0, 0, 0);

  const prog2 = await buildSphere(gl);
  const moon = sphereConfigs(20, 20, 0.2, 1, 0, 0);

  const prog3 = await buildSphere(gl);
  const sun = sphereConfigs(20, 20, 1, -4, 0, 0);

  function draw() {
    initOpenGL(gl);

    const mproj = createPerspective(
      30,
      gl.canvas.width / gl.canvas.height,
      1,
      50
    );
    const cam = createCamera([camX, camY, camZ], [look, camY, 0], [0, 60, 0]);

    createSphere(gl, prog1, sphere.vertices, sphere.indices, images[0]);

    let transforma = math.multiply(mproj, cam);
    transforma = math.flatten(math.transpose(transforma))._data;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(prog1);
    const transfPtr = gl.getUniformLocation(prog1, "transf");
    gl.uniformMatrix4fv(transfPtr, false, transforma);
    gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0);

    /////////////

    createSphere(gl, prog2, moon.vertices, moon.indices, images[1]);

    gl.useProgram(prog2);
    let transforma2 = math.multiply(mproj, cam);
    transforma2 = math.flatten(math.transpose(transforma2))._data;
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const transfPtr2 = gl.getUniformLocation(prog2, "transf");
    gl.uniformMatrix4fv(transfPtr2, false, transforma2);
    gl.drawElements(gl.TRIANGLES, moon.indices.length, gl.UNSIGNED_SHORT, 0);

    /////////////

    createSphere(gl, prog3, sun.vertices, sun.indices, images[2]);

    gl.useProgram(prog3);
    let transforma3 = math.multiply(mproj, cam);
    transforma3 = math.flatten(math.transpose(transforma3))._data;

    const transfPtr3 = gl.getUniformLocation(prog3, "transf");
    gl.uniformMatrix4fv(transfPtr3, false, transforma3);
    gl.drawElements(gl.TRIANGLES, sun.indices.length, gl.UNSIGNED_SHORT, 0);

    // camX += 0.01;
    // camY -= 0.01;
    requestAnimationFrame(draw);
  }

  draw();
}

// Contador para rastrear o número de imagens carregadas
let loadedImagesCount = 0;

// Função para verificar se todas as imagens foram carregadas
function checkAllImagesLoaded() {
  loadedImagesCount++;
  if (loadedImagesCount === imageUrls.length) {
    allImagesLoaded();
  }
}

// Percorre todas as URLs das imagens
imageUrls.forEach((imageUrl) => {
  const img = new Image();
  img.onload = checkAllImagesLoaded;
  images.push(img);
  img.src = imageUrl;
});

// TEXTIMG = new Image();
// TEXTIMG.crossOrigin = "anonymous";
// TEXTIMG.src = "assets/earth.jpg";
// TEXTIMG.onload = async function () {

// };
