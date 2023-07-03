import { initOpenGL } from "./utils.js";

export function createSquare(gl, prog, texture, coords) {
  // quad -> x, y, z, u, v
  // const coords = ;

  const buffPtr = gl.createBuffer();
  // cria o array buffer na GPU
  gl.bindBuffer(gl.ARRAY_BUFFER, buffPtr);
  // joga para o array da GPU as coordenadas do triângulo
  gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STATIC_DRAW);

  // pega o ponteiro do position do vertex shade
  const positionPtr = gl.getAttribLocation(prog, "position");
  gl.enableVertexAttribArray(positionPtr);
  // especifica como será a cópia para o position
  gl.vertexAttribPointer(positionPtr, 3, gl.FLOAT, false, 5 * 4, 0);

  const textCoordPtr = gl.getAttribLocation(prog, "textCoord");
  gl.enableVertexAttribArray(textCoordPtr);
  gl.vertexAttribPointer(textCoordPtr, 2, gl.FLOAT, false, 5 * 4, 3 * 4);

  // submeter texture para gpu
  const tex0 = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex0);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture);

  //   const dfPtr = gl.getUniformLocation(prog, "df");
  //   gl.uniform1f(dfPtr, df);
}

export function renderSphere(gl, prog, vertices, indices) {
  initOpenGL(gl);
  // const buffPtr = gl.createBuffer();
  // cria o array buffer na GPU

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  // Criando o buffer de normais
  // const normalBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

  const positionAttributeLocation = gl.getAttribLocation(
    prog,
    "aVertexPosition"
  );
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

  // Renderização da esfera
  const numIndices = indices.length;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.drawElements(gl.TRIANGLES, numIndices, gl.UNSIGNED_SHORT, 0);
}
