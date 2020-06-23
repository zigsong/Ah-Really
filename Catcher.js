class Catcher {
  constructor(r) {
    this.x = 0;
    this.y = 0;
    this.r = r;
  }

  setLocation(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    fill(120);
    noStroke();
    ellipse(this.x, this.y, this.r * 2, this.r * 2)
  }

  intersect(coordinate) {
    let distance = dist(this.x, this.y, coordinate.x, coordinate.y);
    return (distance < this.r + coordinate.r);
  }
}
