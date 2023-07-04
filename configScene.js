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

export function createSphere(gl, prog, vertices, indices) {
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

  const positionAttributeLocation = gl.getAttribLocation(
    prog,
    "aVertexPosition"
  );
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(
    positionAttributeLocation,
    4,
    gl.FLOAT,
    false,
    8 * 4,
    0
  );

  const colorAttributeLocation = gl.getAttribLocation(prog, "color");
  gl.enableVertexAttribArray(colorAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(
    colorAttributeLocation,
    4,
    gl.FLOAT,
    false,
    8 * 4,
    4 * 4
  );
}
