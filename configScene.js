export function createSphere(
  gl,
  prog,
  vertices,
  indices,
  normals,
  tex,
  isSun,
  isSolid
) {
  const campos = [-10, 0, 4];

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
    3,
    gl.FLOAT,
    false,
    5 * 4,
    0
  );

  const texcoordPtr = gl.getAttribLocation(prog, "texCoord");
  gl.enableVertexAttribArray(texcoordPtr);
  gl.vertexAttribPointer(texcoordPtr, 2, gl.FLOAT, false, 5 * 4, 3 * 4);

  ////////////////////

  const bufnormalPtr = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufnormalPtr);
  gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

  const normalPtr = gl.getAttribLocation(prog, "normal");
  gl.enableVertexAttribArray(normalPtr);
  gl.vertexAttribPointer(normalPtr, 3, gl.FLOAT, false, 0, 0);

  const lightDirectionPtr = gl.getUniformLocation(prog, "lightDirection");
  gl.uniform3fv(lightDirectionPtr, /*[1, 1, -0.7]*/ [5, 0, 0]);

  const lightColorPtr = gl.getUniformLocation(prog, "lightColor");
  gl.uniform3fv(lightColorPtr, [1, 1, 1]);

  const sunPtr = gl.getUniformLocation(prog, "isSun");
  gl.uniform1i(sunPtr, isSun ? 1 : 0);

  var lightposPtr = gl.getUniformLocation(prog, "lightpos");
  gl.uniform3fv(lightposPtr, [0.25, 0.0, 0.5]);

  var camposPtr = gl.getUniformLocation(prog, "campos");
  gl.uniform3fv(camposPtr, campos);

  var isSolidPtr = gl.getUniformLocation(prog, "isSolid");
  gl.uniform1i(isSolidPtr, isSolid ? 1 : 0);

  ///////////////////

  const tex0 = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex0);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex);
}
