class StatusBar {
    constructor() {
      this.percent = 300;
    }

    display() {
      image(statusBarImg, 824, 10, 489, 130);
      fill(116, 179, 202);
      noStroke();
      rect(920, 53, this.percent, 47);
    }

    minus() {
      this.percent -= 0.3;
    }
}
