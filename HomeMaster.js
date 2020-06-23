class HomeMaster {
  constructor(image) {
    this.image = image;

    this.showing = true;
    this.pause = 3;
    this.saying = true;

    this.posX = random([300, 900]);
  }

  display() {
    if(this.showing) {
      imageMode(CENTER);
      image(this.image, this.posX, 200, 400, 400); // 등장 위치 랜덤으로 바꾸기
      imageMode(CORNER);
    }
  }

  requestPose(pose) {
    if(frameCount % 60 == 0 && this.pause > 0) {
      // this.saying == false;
      this.pause--;
    }
    if(this.pause == 0) this.saying = false;
    if(this.saying) {
      image(pose, this.posX-180, 20, 400, 150);  
    }
  }

  isSaying() {
    return this.saying;
  }

  disappear() {
    this.showing = false;
  }

  isShowing() {
    return this.showing;
  }

  setShowing(status) {
    this.showing = status;
  }

  getPosition() {
    return this.posX == 300 ? "left" : "right";
  }
 }
