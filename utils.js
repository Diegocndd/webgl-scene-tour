export const objects = (images) => {
  return [
    {
      name: "sun",
      longitude: 20,
      latitude: 20,
      radius: 2,
      x: -7,
      y: 0,
      z: 0,
      texture: images[2],
    },
    {
      name: "mercury",
      longitude: 20,
      latitude: 20,
      radius: 0.35,
      x: -1.5,
      y: 0.5,
      z: -5,
      texture: images[3],
    },
    {
      name: "venus",
      longitude: 20,
      latitude: 20,
      radius: 0.5,
      x: 0.2,
      y: -0.5,
      z: 4,
      texture: images[4],
    },
    {
      name: "earth",
      longitude: 25,
      latitude: 25,
      radius: 0.5,
      x: 2,
      y: 0,
      z: 1,
      texture: images[0],
    },
    {
      name: "moon",
      longitude: 20,
      latitude: 20,
      radius: 0.1,
      x: 2.8,
      y: 0,
      z: 1,
      texture: images[3],
    },
    {
      name: "mars",
      longitude: 20,
      latitude: 20,
      radius: 0.5,
      x: 4,
      y: 0.2,
      z: 0,
      texture: images[5],
    },
    {
      name: "jupiter",
      longitude: 20,
      latitude: 20,
      radius: 0.8,
      x: 6,
      y: 0,
      z: 0,
      texture: images[6],
    },
    {
      name: "saturn",
      longitude: 20,
      latitude: 20,
      radius: 0.6,
      x: 9,
      y: 0,
      z: 0,
      texture: images[7],
    },
    {
      name: "uranus",
      longitude: 20,
      latitude: 20,
      radius: 0.4,
      x: 12,
      y: 1,
      z: 0,
      texture: images[8],
    },
    {
      name: "neptune",
      longitude: 20,
      latitude: 20,
      radius: 0.4,
      x: 15,
      y: 0.7,
      z: 0,
      texture: images[9],
    },
    {
      name: "unknown",
      longitude: 20,
      latitude: 20,
      radius: 0.6,
      x: -2,
      y: -1.6,
      z: 0,
      texture: images[2],
    },
  ];
};

export async function loadGLSL(folder) {
  let vertexCode = "";
  let fragCode = "";

  await fetch(`shaders/${folder}/vertexShader.glsl`)
    .then((response) => response.text())
    .then((glslCode) => {
      vertexCode = glslCode;
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo GLSL:", error);
    });

  await fetch(`shaders/${folder}/fragmentShader.glsl`)
    .then((response) => response.text())
    .then((glslCode) => {
      fragCode = glslCode;
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo GLSL:", error);
    });

  return {
    vertexCode,
    fragCode,
  };
}

export function createShader(gl, shaderType, source) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

  console.log("ERRO DE COMPILAÇÃO: " + gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

export function createProgram(gl, vtxShader, fragShader) {
  const prog = gl.createProgram();
  gl.attachShader(prog, vtxShader);
  gl.attachShader(prog, fragShader);
  gl.linkProgram(prog);

  if (gl.getProgramParameter(prog, gl.LINK_STATUS)) return prog;

  console.log("ERRO DE LINKAGEM: " + gl.getProgramInfoLog(prog));
}

export function initOpenGL(gl) {
  // inicializa área de desenho
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // habilita canal alpha
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.DEPTH_TEST);
}

export function createCamera(pos, target, up) {
  let zc = math.subtract(pos, target);
  zc = math.divide(zc, math.norm(zc));

  let yt = math.subtract(up, pos);
  yt = math.divide(yt, math.norm(yt));

  let xc = math.cross(yt, zc);
  xc = math.divide(xc, math.norm(xc));

  let yc = math.cross(zc, xc);
  yc = math.divide(yc, math.norm(yc));

  let mt = math.inv(math.transpose(math.matrix([xc, yc, zc])));

  mt = math.resize(mt, [4, 4], 0);
  mt._data[3][3] = 1;

  const mov = math.matrix([
    [1, 0, 0, -pos[0]], // x
    [0, 1, 0, -pos[1]], // y
    [0, 0, 1, -pos[2]], // z
    [0, 0, 0, 1],
  ]);

  const cam = math.multiply(mt, mov);

  return cam;
}

export function createPerspective(fovy, aspect, near, far) {
  fovy = (fovy * Math.PI) / 180.0;

  let fy = 1 / math.tan(fovy / 2.0);
  let fx = fy / aspect;
  let B = (-2 * far * near) / (far - near);
  let A = -(far + near) / (far - near);

  let proj = math.matrix([
    [fx, 0.0, 0.0, 0.0],
    [0.0, fy, 0.0, 0.0],
    [0.0, 0.0, A, B],
    [0.0, 0.0, -1.0, 0.0],
  ]);

  return proj;
}
