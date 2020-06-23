class Manager {
  constructor(leftImg, rightImg) {
    this.leftImg = leftImg;
    this.rightImg = rightImg;
    this.showing = false;

    let left = 0;
    let right = 880;
    this.direction = random([left, right]);
  }

  display() {
    if(this.direction == 0) image(this.leftImg, this.direction, 720*3/5, 400, 200);
    else image(this.rightImg, this.direction, 720*3/5, 400, 200);
  }

  disappear() {
    // this.showing = false;
    this.direction += 100000;
  }
}
