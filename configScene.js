import { initOpenGL } from "./utils.js";

export function createPyramid(gl, prog, coords, indices) {
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

export function createCube(gl, prog, coords, indices) {
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

export function createSphere(gl, prog, vertices, indices, tex) {
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
    6 * 4,
    0
  );

  var texcoordPtr = gl.getAttribLocation(prog, "texCoord");
  gl.enableVertexAttribArray(texcoordPtr);
  gl.vertexAttribPointer(texcoordPtr, 2, gl.FLOAT, false, 6 * 4, 4 * 4);

  var tex0 = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex0);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex);

  // const colorAttributeLocation = gl.getAttribLocation(prog, "color");
  // gl.enableVertexAttribArray(colorAttributeLocation);
  // gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // gl.vertexAttribPointer(
  //   colorAttributeLocation,
  //   4,
  //   gl.FLOAT,
  //   false,
  //   8 * 4,
  //   4 * 4
  // );
}
