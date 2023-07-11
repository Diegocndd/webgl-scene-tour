import { buildSphere } from "./builds.js";
import { createSphere } from "./configScene.js";
import { sphereConfigs } from "./configs.js";
import {
  createCamera,
  createPerspective,
  initOpenGL,
  objects,
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

const getMatRotY = (x, y, z) => {
  // volta o objeto pra origem (0,0)
  const translationToOrigin = math.matrix([
    [1, 0, 0, -x],
    [0, 1, 0, -y],
    [0, 0, 1, -z],
    [0, 0, 0, 1],
  ]);

  // rotaciona em torno do eixo y
  const rotationMatrix = math.matrix([
    [Math.cos(angle), 0, -Math.sin(angle), 0],
    [0, 1, 0, 0],
    [Math.sin(angle), 0, Math.cos(angle), 0],
    [0, 0, 0, 1],
  ]);

  // retorna à posição certa
  const translationBack = math.matrix([
    [1, 0, 0, x],
    [0, 1, 0, y],
    [0, 0, 1, z],
    [0, 0, 0, 1],
  ]);

  return math.multiply(
    math.multiply(translationBack, rotationMatrix),
    translationToOrigin
  );
};

const imageUrls = [
  "assets/earth.jpg",
  "assets/moon.jpg",
  "assets/sun.png",
  "assets/mercury.jpg",
  "assets/venus.jpg",
  "assets/mars.jpg",
  "assets/jupiter.jpg",
  "assets/saturn.jpg",
  "assets/uranus.jpg",
  "assets/neptune.jpg",
];

const images = [];

async function allImagesLoaded() {
  const progs = [];
  const spheres = [];

  const promises = objects(images).map(async (obj) => {
    const prog = await buildSphere(gl);
    const sphere = sphereConfigs(
      obj.longitude,
      obj.latitude,
      obj.radius,
      obj.x,
      obj.y,
      obj.z
    );

    progs.push(prog);
    spheres.push(sphere);
  });

  await Promise.all(promises);

  let lastFrameTime = 0; // Variável para armazenar o tempo do último quadro

  function draw(currentTime) {
    initOpenGL(gl);
    const deltaTime = (currentTime - lastFrameTime) / 1000; // Converter para segundos

    objects(images).forEach((obj, index) => {
      const currProg = progs[index];
      const currSphere = spheres[index];

      let matrotY = getMatRotY(obj.x, obj.y, obj.z);

      const dx = obj.x - objects(images)[0].x;
      const dy = obj.y - objects(images)[0].y;
      const dz = obj.z - objects(images)[0].z;

      const mproj = createPerspective(
        30,
        gl.canvas.width / gl.canvas.height,
        1,
        50
      );
      const cam = createCamera([camX, camY, camZ], [look, 0, 0], [0, 300, 0]);

      createSphere(
        gl,
        currProg,
        currSphere.vertices,
        currSphere.indices,
        obj.texture
      );

      let transforma = math.multiply(cam, matrotY);
      transforma = math.multiply(mproj, transforma);
      transforma = math.flatten(math.transpose(transforma))._data;

      if (index === 0) gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(currProg);
      const transfPtr = gl.getUniformLocation(currProg, "transf");
      gl.uniformMatrix4fv(transfPtr, false, transforma);
      gl.drawElements(
        gl.TRIANGLES,
        currSphere.indices.length,
        gl.UNSIGNED_SHORT,
        0
      );
    });

    angle += 0.1;

    lastFrameTime = currentTime;

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
