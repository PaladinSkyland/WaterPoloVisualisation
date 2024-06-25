class Player {
    constructor(time, acquisitionTime, tag, x, y, z, precision, speed, direction) {
      this.time = time;
      this.acquisitionTime = acquisitionTime;
      this.tag = tag;
      this.x = x;
      this.y = y;
      this.z = z;
      this.precision = precision;
      this.speed = speed;
      this.direction = direction;
      this.selected = false;
    }
}
export default Player;