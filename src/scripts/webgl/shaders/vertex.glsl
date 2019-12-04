// an attribute will receive data from a buffer
attribute vec2 positions;

// gl_Position is a special variable a vertex shader is responsible for setting
void main() {
  gl_Position = vec4( positions, 0, 1 );
}