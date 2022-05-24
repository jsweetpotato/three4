precision mediump float;
precision mediump int;

uniform sampler2D colorMap;

varying vec2 vUv;

void main(){
  gl_FragColor = texture2D(colorMap, vUv);
}