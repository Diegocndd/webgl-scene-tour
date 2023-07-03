precision mediump float;

// uniform sampler2D tex;

// varying vec2 v_textCoord;

// void main() {
//     gl_FragColor = texture2D(tex, v_textCoord);
// }

// precision mediump float;

// uniform sampler2D tex;

// varying vec2 v_textCoord;
varying vec4 v_color;

void main() {
    gl_FragColor = v_color;
}
