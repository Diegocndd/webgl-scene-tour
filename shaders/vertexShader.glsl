// attribute vec4 position;
// attribute vec2 textCoord;
uniform mat4 transf;
// varying vec2 v_textCoord;
// uniform float df;

// void main() {
//     gl_Position = transf*position;
//     v_textCoord = textCoord;
// }

attribute vec4 position;
attribute vec4 color;

varying vec4 v_color;

void main() {
    v_color = color;
    gl_Position = transf * position;
}