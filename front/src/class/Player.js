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
      this.direction = this.direction;
      this.selected = false;
      this.number = null;
      this.name = "";
    }

    setName(name) {
      this.name = name;
    }

    setNumber(number) {
      this.number = number;
    }
}
export default Player;