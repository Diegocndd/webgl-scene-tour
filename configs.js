export function pyramidConfigs(width, height, centerX, centerY, centerZ) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const vertices = [
    // Base
    centerX - halfWidth,
    centerY - halfHeight,
    centerZ - halfWidth,
    1.0,
    1.0,
    0.0,
    0.0,
    1.0, // V0
    centerX + halfWidth,
    centerY - halfHeight,
    centerZ - halfWidth,
    1.0,
    0.0,
    1.0,
    0.0,
    1.0, // V1
    centerX + halfWidth,
    centerY - halfHeight,
    centerZ + halfWidth,
    1.0,
    0.0,
    0.0,
    1.0,
    1.0, // V2
    centerX - halfWidth,
    centerY - halfHeight,
    centerZ + halfWidth,
    1.0,
    1.0,
    1.0,
    0.0,
    1.0, // V3

    // Topo
    centerX,
    centerY + halfHeight,
    centerZ,
    1.0,
    0.0,
    1.0,
    0.0,
    1.0, // V4
  ];

  const indices = [
    // Base
    0, 1, 2, 0, 2, 3,

    // Faces laterais
    0, 1, 4, 1, 2, 4, 2, 3, 4, 3, 0, 4,
  ];

  return {
    vertices,
    indices,
  };
}

export function cubeConfigs(width, centerX, centerY, centerZ) {
  const halfWidth = width / 2;

  const vertices = [
    // Frente
    centerX - halfWidth,
    centerY - halfWidth,
    centerZ + halfWidth,
    1.0,
    1.0,
    0.0,
    0.0,
    1.0, // V0
    centerX + halfWidth,
    centerY - halfWidth,
    centerZ + halfWidth,
    1.0,
    0.0,
    1.0,
    0.0,
    1.0, // V1
    centerX + halfWidth,
    centerY + halfWidth,
    centerZ + halfWidth,
    1.0,
    0.0,
    0.0,
    1.0,
    1.0, // V2
    centerX - halfWidth,
    centerY + halfWidth,
    centerZ + halfWidth,
    1.0,
    1.0,
    1.0,
    0.0,
    1.0, // V3

    // Trás
    centerX - halfWidth,
    centerY - halfWidth,
    centerZ - halfWidth,
    1.0,
    1.0,
    0.0,
    0.0,
    1.0, // V4
    centerX + halfWidth,
    centerY - halfWidth,
    centerZ - halfWidth,
    1.0,
    0.0,
    1.0,
    0.0,
    1.0, // V5
    centerX + halfWidth,
    centerY + halfWidth,
    centerZ - halfWidth,
    1.0,
    0.0,
    0.0,
    1.0,
    1.0, // V6
    centerX - halfWidth,
    centerY + halfWidth,
    centerZ - halfWidth,
    1.0,
    1.0,
    1.0,
    0.0,
    1.0, // V7

    // Topo
    centerX - halfWidth,
    centerY + halfWidth,
    centerZ + halfWidth,
    1.0,
    1.0,
    0.0,
    0.0,
    1.0, // V8
    centerX + halfWidth,
    centerY + halfWidth,
    centerZ + halfWidth,
    1.0,
    0.0,
    1.0,
    0.0,
    1.0, // V9
    centerX + halfWidth,
    centerY + halfWidth,
    centerZ - halfWidth,
    1.0,
    0.0,
    0.0,
    1.0,
    1.0, // V10
    centerX - halfWidth,
    centerY + halfWidth,
    centerZ - halfWidth,
    1.0,
    1.0,
    1.0,
    0.0,
    1.0, // V11

    // Base
    centerX - halfWidth,
    centerY - halfWidth,
    centerZ + halfWidth,
    1.0,
    1.0,
    0.0,
    0.0,
    1.0, // V12
    centerX + halfWidth,
    centerY - halfWidth,
    centerZ + halfWidth,
    1.0,
    0.0,
    1.0,
    0.0,
    1.0, // V13
    centerX + halfWidth,
    centerY - halfWidth,
    centerZ - halfWidth,
    1.0,
    0.0,
    0.0,
    1.0,
    1.0, // V14
    centerX - halfWidth,
    centerY - halfWidth,
    centerZ - halfWidth,
    1.0,
    1.0,
    1.0,
    0.0,
    1.0, // V15
  ];

  const indices = [
    // Frente
    0, 1, 2, 0, 2, 3,

    // Trás
    4, 5, 6, 4, 6, 7,

    // Topo
    8, 9, 10, 8, 10, 11,

    // Base
    12, 13, 14, 12, 14, 15,

    // Lados
    0, 1, 5, 0, 5, 4,

    1, 2, 6, 1, 6, 5,

    2, 3, 7, 2, 7, 6,

    3, 0, 4, 3, 4, 7,
  ];

  return {
    vertices,
    indices,
  };
}

function sphere2mapUV_Equirectangular(p) {
  return [Math.atan2(p[0], -p[2]) / (2 * Math.PI) + 0.5, p[1] * 0.5 + 0.5];
}

export function sphereConfigs(longitudeSegments, latitudeSegments, radius) {
  const vertices = [];
  const indices = [];

  for (let lat = 0; lat <= latitudeSegments; lat++) {
    const theta = (lat * Math.PI) / latitudeSegments;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let lon = 0; lon <= longitudeSegments; lon++) {
      const phi = (lon * 2 * Math.PI) / longitudeSegments;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      const x = cosPhi * sinTheta;
      const y = cosTheta;
      const z = sinPhi * sinTheta;
      const u = 1 - lon / longitudeSegments;
      const v = 1 - lat / latitudeSegments;

      vertices.push(radius * x, radius * y, radius * z, u, v);
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

  return { vertices, indices };
}

// export function sphereConfigs(longitudeSegments, latitudeSegments, radius) {
//   const vertices = [];
//   const indices = [];
//   const uvs = [];

//   for (let lat = 0; lat <= latitudeSegments; lat++) {
//     const theta = (lat * Math.PI) / latitudeSegments;
//     const sinTheta = Math.sin(theta);
//     const cosTheta = Math.cos(theta);

//     for (let lon = 0; lon <= longitudeSegments; lon++) {
//       const phi = (lon * 2 * Math.PI) / longitudeSegments;
//       const sinPhi = Math.sin(phi);
//       const cosPhi = Math.cos(phi);

//       const x = cosPhi * sinTheta;
//       const y = cosTheta;
//       const z = sinPhi * sinTheta;
//       const w = 1.0;

//       const u = 1 - lon / longitudeSegments;
//       const v = 1 - lat / latitudeSegments;

//       vertices.push(radius * x, radius * y, radius * z, w, u, v);
//     }
//   }

//   for (let lat = 0; lat < latitudeSegments; lat++) {
//     for (let lon = 0; lon < longitudeSegments; lon++) {
//       const first = lat * (longitudeSegments + 1) + lon;
//       const second = first + longitudeSegments + 1;

//       indices.push(first, second, first + 1);
//       indices.push(second, second + 1, first + 1);
//     }
//   }

//   return { vertices, indices };
// }
