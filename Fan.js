class Fan {
  constructor(name, fanChar, defaultFace, happyFace, angryFace, mood, position, coord, appearCount, showName) {
    this.name = name;
    this.fanChar = fanChar;
    this.defaultFace = defaultFace;
    this.happyFace = happyFace;
    this.angryFace = angryFace;
    this.mood = mood; // default, happy, angry
    this.position = position;
    this.coord = coord;
    this.appearCount = appearCount;
    this.showName = showName;
  }

  display() {
    imageMode(CENTER);
    image(this.fanChar, this.coord.x, this.coord.y, 450, 450);
    if(this.mood == 'default') {
      image(this.defaultFace, this.coord.x+2, this.coord.y+32, 340, 340);
    } else if(this.mood == 'happy') {
      image(this.happyFace, this.coord.x+2, this.coord.y+32, 340, 340);
    } else {
      image(this.angryFace, this.coord.x+2, this.coord.y+32, 340, 340);
    }
    imageMode(CORNER);
  }

  displayForitem(){
    imageMode(CENTER);
    image(this.fanChar, 1080, 180, 360, 360);
    if(this.mood == 'default') {
      image(this.defaultFace, 1080, 200, 280, 280);
    } else if(this.mood == 'happy') {
      image(this.happyFace, 1080, 200, 280, 280);
    } else {
      image(this.angryFace, 1080, 200, 280, 280);
    }
  }

  move() {
    this.coord.x += 10;
  }

  stop() {
    this.coord.x = this.coord.x;
  }

  // stage1: 팬이 묻는 말에 똑바로 답하기
  askQuestion(questionFormission) {
    image(questionFormission[turn], 460, 20, 360, 120);
  }

  // stage2: 포스트잇에 그림 요청하기
  requestPostIt(dottedImage) {
    //
  }

  // stage4: 이름 맞추기
  nameQuiz() {
    image(nameRequest, 460, 20, 360, 120);
  }

  // stage5: 매니저가 제지할(!) 선물 주기
  giveGift() {
    image(giftImg, 1280 / 2 - 130, 720 * 3 / 5, 260, 260);
  }

  moodChange(mood) {
    this.mood = mood;
  }

  setShowName(status) {
    this.showName = status;
  }

  returnPosition() {
    this.coord.x = 0;
    this.coord.y = 222;
  }
}
