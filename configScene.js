import { initOpenGL } from "./utils.js";

export function createSquare(gl, prog, coords, indices) {
  const buffPtr = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffPtr);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);

  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  const positionPtr = gl.getAttribLocation(prog, "position");
  gl.enableVertexAttribArray(positionPtr);
  gl.vertexAttribPointer(positionPtr, 4, gl.FLOAT, false, 8 * 4, 0);

  const colorPtr = gl.getAttribLocation(prog, "color");
  gl.enableVertexAttribArray(colorPtr);
  gl.vertexAttribPointer(colorPtr, 4, gl.FLOAT, false, 8 * 4, 4 * 4);
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
