uniform mat4 transf;
attribute vec4 aVertexPosition;
attribute vec2 texCoord;
varying vec2 v_texCoord;

void main() {
    v_texCoord = texCoord;
    gl_Position = transf * aVertexPosition;
}