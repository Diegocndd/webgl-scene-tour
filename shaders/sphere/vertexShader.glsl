attribute vec4 aVertexPosition;
attribute vec2 texCoord;

uniform mat4 transfproj;

varying vec2 v_texCoord;

attribute vec3 normal;
varying vec3 v_normal;

uniform vec3 lightpos;
varying vec3 pointToLight;

uniform vec3 campos;
varying vec3 pointToCam;

void main() {
    pointToLight = lightpos - aVertexPosition.xyz;
    pointToCam = campos - aVertexPosition.xyz;

    v_normal = normal;
    v_texCoord = texCoord;
    gl_Position = transfproj * aVertexPosition;
}