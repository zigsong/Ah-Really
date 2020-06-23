class Coordinate {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.r = 10;
  }

  setLocation(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    fill(120);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
  }
}
