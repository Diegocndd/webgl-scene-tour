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
  switch (event.key) {
    case "ArrowLeft":
      look -= 0.1;
      break;
    case "ArrowRight":
      look += 0.1;
      break;
    case "ArrowUp":
      camY += 0.1;
      break;
    case "ArrowDown":
      camY -= 0.1;
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
      return;
  }
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
      obj.z,
      angle
    );

    progs.push(prog);
    spheres.push(sphere);
  });

  await Promise.all(promises);

  function draw() {
    initOpenGL(gl);

    objects(images).forEach((obj, index) => {
      const currProg = progs[index];
      const currSphere = spheres[index];

      let matrotY = getMatRotY(obj.x, obj.y, obj.z);

      const mproj = createPerspective(
        30,
        gl.canvas.width / gl.canvas.height,
        1,
        50
      );
      const cam = createCamera([camX, camY, camZ], [look, 0, 0], [0, 300, 0]);

      gl.useProgram(currProg);

      // recalcula as normais com base no novo ângulo de rotação
      let new_sphere = sphereConfigs(
        obj.longitude,
        obj.latitude,
        obj.radius,
        obj.x,
        obj.y,
        obj.z,
        angle
      );

      createSphere(
        gl,
        currProg,
        currSphere.vertices,
        currSphere.indices,
        new_sphere.normals,
        obj.texture,
        obj.name === "sun",
        obj.name === "unknown"
      );

      let transformaproj = math.multiply(cam, matrotY);
      transformaproj = math.multiply(mproj, transformaproj);
      transformaproj = math.flatten(math.transpose(transformaproj))._data;

      const transfPtr = gl.getUniformLocation(currProg, "transfproj");
      gl.uniformMatrix4fv(transfPtr, false, transformaproj);

      if (index === 0) gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.drawElements(
        gl.TRIANGLES,
        currSphere.indices.length,
        gl.UNSIGNED_SHORT,
        0
      );
    });

    angle += 0.1;

    requestAnimationFrame(draw);
  }

  draw();
}

let loadedImagesCount = 0;

function checkAllImagesLoaded() {
  loadedImagesCount++;
  if (loadedImagesCount === imageUrls.length) {
    allImagesLoaded();
  }
}

imageUrls.forEach((imageUrl) => {
  const img = new Image();
  img.onload = checkAllImagesLoaded;
  images.push(img);
  img.src = imageUrl;
});
