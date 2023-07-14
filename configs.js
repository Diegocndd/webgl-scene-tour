export function sphereConfigs(
  longitudeSegments,
  latitudeSegments,
  radius,
  centerX,
  centerY,
  centerZ,
  rotationAngle
) {
  const vertices = [];
  const normals = [];
  const indices = [];

  for (let lat = 0; lat <= latitudeSegments; lat++) {
    const theta = (lat * Math.PI) / latitudeSegments;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let lon = 0; lon <= longitudeSegments; lon++) {
      const phi = (lon * 2 * Math.PI) / longitudeSegments;
      const sinPhi = Math.sin(phi + rotationAngle); // Adicionar a rotação aqui
      const cosPhi = Math.cos(phi + rotationAngle); // Adicionar a rotação aqui

      const x = centerX + radius * cosPhi * sinTheta;
      const y = centerY + radius * cosTheta;
      const z = centerZ + radius * sinPhi * sinTheta;
      const u = 1 - lon / longitudeSegments;
      const v = 1 - lat / latitudeSegments;

      vertices.push(x, y, z, u, v);

      const nx = sinTheta * cosPhi;
      const ny = cosTheta;
      const nz = sinTheta * sinPhi;

      normals.push(nx, ny, nz);
    }
  }

  for (let lat = 0; lat < latitudeSegments; lat++) {
    for (let lon = 0; lon < longitudeSegments; lon++) {
      const first = lat * (longitudeSegments + 1) + lon;
      const second = first + longitudeSegments + 1;

      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  return { vertices, normals: new Float32Array(normals), indices };
}
