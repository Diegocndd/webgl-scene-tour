precision mediump float;
uniform sampler2D tex;
varying vec2 v_texCoord;

varying vec3 v_normal;
uniform vec3 lightDirection;
uniform vec3 lightColor;

uniform int isSun;

varying vec3 pointToLight;
varying vec3 pointToCam;

void main() {
    vec3 pToLight = normalize(pointToLight);
    vec3 pToCam = normalize(pointToCam);

    vec3 halfVec = normalize(pToCam + pToLight);

    vec3 v_normal_n = normalize(v_normal);
    vec3 lightDirection_n = normalize(-lightDirection);

    float lightd = dot(v_normal_n, lightDirection_n);
    float lightp = dot(v_normal_n, pToLight);
    float lighte = dot(v_normal_n, halfVec);

    vec3 texColor = texture2D(tex, v_texCoord).rgb;

    // o sol é uma fonte de luz, então não possui sombra
    if(isSun == 1) {
        gl_FragColor.rgb = 1.0 * texColor;
        gl_FragColor.a = texture2D(tex, v_texCoord).a;
    } else {
        if(lightd < 0.0)
            lightd = 0.0;
        if(lightp < 0.0)
            lightp = 0.0;
        if(lighte < 0.0)
            lighte = 0.0;

        gl_FragColor.rgb = 0.2 * lightColor * texColor;
        gl_FragColor.rgb += 0.2 * lightColor * lightd * texColor;
        gl_FragColor.rgb += 0.5 * lightColor * lightp * texColor;
        gl_FragColor.rgb += lightColor * pow(lighte, 500.0) * texColor;

        gl_FragColor.a = texture2D(tex, v_texCoord).a;
    }
}