uniform mat4 transf;
attribute vec4 aVertexPosition;
attribute vec4 color;

varying vec4 v_color;
void main() {
    v_color = color;
    gl_Position = transf * aVertexPosition;
}