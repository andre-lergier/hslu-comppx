// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;

uniform sampler2D uImage;

varying vec2 vTextureCoord;

void main(){
    // gl_FragColor is a special variable a fragment shader is responsible for setting
    gl_FragColor = texture2D(uImage, vTextureCoord);
}