precision mediump float;
// varying vec4 v_color;
uniform sampler2D tex;
varying vec2 v_texCoord;

void main() {
    gl_FragColor = texture2D(tex, v_texCoord);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Cor branca para a esfera
    // gl_FragColor = v_color;
}