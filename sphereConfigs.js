export default function sphereConfigs() {
  // Vertices da esfera
  const vertices = [];
  const indices = [];
  const numLongitudes = 50;
  const numLatitudes = 50;
  const radius = 0.5;

  for (let lat = 0; lat <= numLatitudes; lat++) {
    const theta = (lat * Math.PI) / numLatitudes;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let lon = 0; lon <= numLongitudes; lon++) {
      const phi = (lon * 2 * Math.PI) / numLongitudes;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      const x = cosPhi * sinTheta;
      const y = cosTheta;
      const z = sinPhi * sinTheta;

      vertices.push(radius * x, radius * y, radius * z, 1.0);
      if (lon % 2 === 0) {
        vertices.push(1.0, 1.0, 0.0, 1.0);
      } else {
        vertices.push(1.0, 0.0, 1.0, 1.0);
      }
    }
  }

  // Criando os índices para renderizar a esfera como triângulos
  for (let lat = 0; lat < numLatitudes; lat++) {
    for (let lon = 0; lon < numLongitudes; lon++) {
      const first = lat * (numLongitudes + 1) + lon;
      const second = first + numLongitudes + 1;

      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  return { vertices, indices };
}
