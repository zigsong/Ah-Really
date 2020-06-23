class Button {

  constructor(defaultImage, overImage, position, xSize, ySize) {
    this.defaultImage = defaultImage;
    this.overImage = overImage;
    this.position = position;
    this.xSize = xSize;
    this.ySize = ySize;

    this.showing = false;
  }

  display() {
    this.showing = true;
    if(!this.mouseOver()) {
      image(this.defaultImage, this.position.x, this.position.y, this.xSize, this.ySize);
    } else {
      image(this.overImage, this.position.x, this.position.y, this.xSize, this.ySize);
    }
  }

  mouseOver() {
    let xpos = this.position.x;
    let ypos = this.position.y;
    return (this.showing && xpos < mouseX && mouseX < xpos+this.xSize && ypos < mouseY && mouseY < ypos+this.ySize);
  }

  remove() {
    this.showing = false;
  }

  setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
  }
}
