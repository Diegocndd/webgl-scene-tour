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
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // habilita canal alpha
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.DEPTH_TEST);
  // não renderiza a parte não vista do poligono (por trás)
  // gl.enable(gl.CULL_FACE);
}

export function createCamera(pos, target, up) {
  var zc = math.subtract(pos, target);
  zc = math.divide(zc, math.norm(zc));

  var yt = math.subtract(up, pos);
  yt = math.divide(yt, math.norm(yt));

  var xc = math.cross(yt, zc);
  xc = math.divide(xc, math.norm(xc));

  var yc = math.cross(zc, xc);
  yc = math.divide(yc, math.norm(yc));

  var mt = math.inv(math.transpose(math.matrix([xc, yc, zc])));

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

  var fy = 1 / math.tan(fovy / 2.0);
  var fx = fy / aspect;
  var B = (-2 * far * near) / (far - near);
  var A = -(far + near) / (far - near);

  var proj = math.matrix([
    [fx, 0.0, 0.0, 0.0],
    [0.0, fy, 0.0, 0.0],
    [0.0, 0.0, A, B],
    [0.0, 0.0, -1.0, 0.0],
  ]);

  return proj;
}
