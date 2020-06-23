class Timer {
  constructor() {
  }

  setTime(time) {
    this.time = time;
  }

  getTime() {
    return this.time;
  }

  display() {
    imageMode(CENTER);
    image(timerImg, 100, 80, 120, 120);
    imageMode(CORNER);
    fill(0);
    textFont(timerFont);
    textSize(60);
    textAlign(CENTER, CENTER);
    text(this.time, 102, 88);
  }

  start() {
    if(frameCount % 60 == 0 && this.time > 0) {
      this.time -= 1;
    }
  }
}
