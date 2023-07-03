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

TEXTIMG = new Image();
TEXTIMG.crossOrigin = "anonymous";
TEXTIMG.src = "assets/gato.jpg";
TEXTIMG.onload = function () {
  createSquare(
    gl,
    prog,
    [
      0.25,
      0.25,
      0.25,
      1.0,
      1.0,
      0.0,
      0.0,
      1.0, // Vértice 0 (vermelho)
      0.75,
      0.25,
      0.25,
      1.0,
      0.0,
      1.0,
      0.0,
      1.0, // Vértice 1 (verde)
      0.75,
      0.75,
      0.25,
      1.0,
      0.0,
      0.0,
      1.0,
      1.0, // Vértice 2 (azul)
      0.25,
      0.75,
      0.25,
      1.0,
      1.0,
      1.0,
      0.0,
      1.0, // Vértice 3 (amarelo)

      // Face traseira
      0.25,
      0.25,
      -0.25,
      1.0,
      1.0,
      0.0,
      1.0,
      1.0, // Vértice 4 (magenta)
      0.75,
      0.25,
      -0.25,
      1.0,
      0.0,
      1.0,
      1.0,
      1.0, // Vértice 5 (ciano)
      0.75,
      0.75,
      -0.25,
      1.0,
      1.0,
      0.5,
      0.0,
      1.0, // Vértice 6 (laranja)
      0.25,
      0.75,
      -0.25,
      1.0,
      0.5,
      0.0,
      1.0,
      1.0, // Vértice 7 (roxo)

      // Face superior
      0.25,
      0.75,
      0.25,
      1.0,
      1.0,
      0.0,
      1.0,
      1.0, // Vértice 8 (magenta)
      0.75,
      0.75,
      0.25,
      1.0,
      0.5,
      1.0,
      0.0,
      1.0, // Vértice 9 (verde limão)
      0.75,
      0.75,
      -0.25,
      1.0,
      0.0,
      1.0,
      1.0,
      1.0, // Vértice 10 (ciano)
      0.25,
      0.75,
      -0.25,
      1.0,
      0.5,
      0.5,
      0.5,
      1.0, // Vértice 11 (cinza)

      // Face inferior
      0.25,
      0.25,
      0.25,
      1.0,
      1.0,
      0.5,
      0.5,
      1.0, // Vértice 12 (rosa)
      0.75,
      0.25,
      0.25,
      1.0,
      0.5,
      0.5,
      1.0,
      1.0, // Vértice 13 (azul claro)
      0.75,
      0.25,
      -0.25,
      1.0,
      0.0,
      1.0,
      0.5,
      1.0, // Vértice 14 (verde água)
      0.25,
      0.25,
      -0.25,
      1.0,
      0.5,
      1.0,
      0.5,
      1.0, // Vértice 15 (verde-azulado)

      // Face direita
      0.75,
      0.25,
      0.25,
      1.0,
      0.5,
      0.5,
      0.5,
      1.0, // Vértice 16 (cinza)
      0.75,
      0.75,
      0.25,
      1.0,
      0.5,
      1.0,
      0.0,
      1.0, // Vértice 17 (amarelo-limão)
      0.75,
      0.75,
      -0.25,
      1.0,
      0.0,
      0.5,
      1.0,
      1.0, // Vértice 18 (azul claro)
      0.75,
      0.25,
      -0.25,
      1.0,
      0.5,
      0.0,
      0.5,
      1.0, // Vértice 19 (roxo escuro)

      // Face esquerda
      0.25,
      0.25,
      0.25,
      1.0,
      0.0,
      0.5,
      0.5,
      1.0, // Vértice 20 (turquesa)
      0.25,
      0.75,
      0.25,
      1.0,
      1.0,
      0.5,
      0.0,
      1.0, // Vértice 21 (laranja)
      0.25,
      0.75,
      -0.25,
      1.0,
      0.0,
      0.0,
      0.5,
      1.0, // Vértice 22 (azul escuro)
      0.25,
      0.25,
      -0.25,
      1.0,
      0.5,
      0.0,
      0.0,
      1.0,
    ],
    [
      0,
      1,
      2,
      0,
      2,
      3, // Face frontal
      4,
      5,
      6,
      4,
      6,
      7, // Face traseira
      8,
      9,
      10,
      8,
      10,
      11, // Face superior
      12,
      13,
      14,
      12,
      14,
      15, // Face inferior
      16,
      17,
      18,
      16,
      18,
      19, // Face direita
      20,
      21,
      22,
      20,
      22,
      23, // Face esquerda
    ]
  );

  draw();
};

function draw() {
  initOpenGL(gl);

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

  transforma = math.flatten(math.transpose(transforma))._data;

  const transfPtr = gl.getUniformLocation(prog, "transf");
  gl.uniformMatrix4fv(transfPtr, false, transforma);

  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

  angle += 1;

  requestAnimationFrame(draw);
}
