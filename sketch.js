let gameState = "intro"; // intro, howTo, playing
let state = "default"; // default, zoomPostit, itemSelection, poseCam
let stageNum = 0; // 1~5
let stageClear = false;
let turn = 0; // 각 스테이지별 미션 회차
let fanNames = []; // fan name shuffle
let fans = []; // fan instance shuffle
let randomFanNum = []; // 게임 시작할 때마다 fan 섞기
let stageTags = [];
let remainFans = 100;
let happyEnding;
let badEnding;
let fade = 255;

let howToPage = 0;
let howToImages = [];
let howToPrevImg;
let howToPrevBtn;
let howToNextImg;
let howToNextBtn;
let startButton;
let startBtnImg;
let startBtnOverImg;
let howToButton;
let howToBtnImg;
let howToBtnOverImg;
let backButton; // howToPlay에서 뒤로가기
let backBtnImg; // howToPlay에서 뒤로가기
let backBtnOverImg; // howToPlay에서 뒤로가기

let bg;
let introBg;
let fanCharImages = [];
let defaultFace;
let happyFace;
let angryFace;
let timerImg;
let timer;
let timerFont;
let statusBarImg;
let statusBar;
let stageAlarm = 0; // stage 번호 띄우려고 잠시 멈춤
let greetBubble = 0;
let greeting = false;
let greetTime = 2;
let timerStarted = false;
let timeDefined = false; // 타이머 시간을 계속 draw loop이 아니라 한번만 설정하기 위해서
let fanPause = 0; // 미션 성공 후 팬 잠시 멈췄다가(표정 변화 보여줄 목적) 떠나려고
let fanPending = 0; // 현재 팬 가고 다음 팬 오기 전에 잠깐 멈춤

let homeMasterImage;
let homeMaster;
let camCapture;

let fanStage1 = []; // stage1의 팬들
let fanStage2 = [];
let fanStage3 = [];
let fanStage4 = [];
let fanStage5 = [];
let homeMasters = []; // stage의 홈마스터들

let missionDone = ""; // temporary

// for stage1
let answerReally;
let answerCongrat;
let answerSorry;
let answerThanks;

// for stage3 (stop Manager)
let givingGift = false;
let handImgLeft;
let handImgRight;
let giftImg;
let giftBubble;
let mghands = [];
let mgstop = 0;

// 버튼 모음
let congratsD;
let congratsOver;
let ahreallyD;
let ahreallyOver;
let cheerD;
let cheerOver;
let thanksD;
let thanksOver;

//for postIt
let catcher;
let coordinates = [];
let check = [];
let points = [];
let start = false;
let drawScene;
let doingPostit = false;
let postitRequest;

let heartXplus = [0,30,-30,65,-65,110,-110,155,-155,185,-185,195,-195,185,-185,160,-160,130,-130,95,-95,50,-50,0];
let heartYplus = [-45,-90,-90,-122,-122,-130,-130,-115,-115,-80,-80,-30,-30,20,20,65,65,110,110,155,155,200,200,245];
let moonXplus = [115, 50, -20, -80, -125, -148, -145, -120, -75, -15, 50, 110, 160, 90, 40, 5, -5, 20, 65];
let moonYplus = [-100, -120, -110, -80, -30, 30, 90, 150, 195, 225, 230, 210, 180, 170, 140, 90, 30, -30, -75];
let bearXplus = [0,50,-50,130,-130,150,-150,155,-155,140,-140,110,-110,65,-65,0,75,-75,110,-110,137,-137,145,-145];
let bearYplus = [-67,-62,-62,0,0,45,45,95,95,145,145,190,190,220,220,235,-85,-85,-85,-85,-65,-65,-30,-30];
let starXplus = [0,30,-30,60,-60,127,-127,194,-194,96,-96,145,-145,0,120,-120,60,-60,107,-107];
let starYplus = [-150,-85,-85,-21,-21,-10,-10,1,1,100,100,50,50,175,240,240,205,205,170,170];

// 포스트잇 그림 좌표들
let dotPostion = [[heartXplus, heartYplus], [moonXplus, moonYplus], [bearXplus, bearYplus], [starXplus, starYplus]];
let dotN = [24, 19, 24, 20];
let indexForpostit = [0,1,2,3];

// for stage2(poses)
let poseLeftBubbles = [];
let poseRightBubbles = [];
let poseLeftDict = {};
let poseRightDict = {};
let poseRand = ['Flower', 'V', 'Tilt', 'Heart'];
let currPose = "";
let poseSample = {};
let cam;
let camReady = false;
let poseNet;
let pose;
let brain;
let poseLabel = ""; // f: flower / h: v or hi / t: tilt / s: small heart
let targetLabel;

let questionImagelist = []; // 질문이미지들
let questionFormission = []; // 미션용 셔플 이미지

//for stage4(name text)
let submit;
let submitImage;
let nameInput;

let nickNames = ['니노막시무스', '김수한무거북이', '카렌람슈에링', '사비하차우더리','초코소라빵', '데보라폭스', '레인보우샤베트', '찹쌀떡콩떡'];
let nickNameimages=[];
let nickNameIndex=[0,1,2,3,4,5,6,7];

//for stage5(item quiz)
let itemBunnylist=[];
let itemFlowerlist=[];
let itemGlasseslist=[];
let itemHairbandlist=[]; //아이템 이미지 리스트
let itemDict = {};

let itemSelectBg;
let itemSelectBgOver; //아이템 박스 질문이미지들

let itemSelectbutton1;
let itemSelectbutton2;
let itemSelectbutton3; //아이템 선택 박스들

let giveItemimage; //아이템 줄 때 대사
let wearItem; //아이템 쓰라고 할 때 대사
let itemNumber=[];

// sounds
let camShotmp3;
let clearmp3;
let beepmp3;

function preload(){
  introBg = loadImage('assets/intro.jpg');
  bg = loadImage('assets/default_bg.jpg');
  timerImg = loadImage('assets/timer.png');
  timerFont = loadFont('assets/BalsamiqSans-Regular.ttf');
  statusBarImg = loadImage('assets/statusBar.png');
  startBtnImg = loadImage('assets/startButton.png');
  startBtnOverImg = loadImage('assets/startButtonOver.png');
  howToBtnImg = loadImage('assets/howToButton.png');
  howToBtnOverImg = loadImage('assets/howToButtonOver.png');
  backBtnImg = loadImage('assets/returnButton.png');
  backBtnOverImg = loadImage('assets/returnButtonOver.png');
  howToPrevImg = loadImage('assets/howTo/howtoPrev.png');
  howToNextImg = loadImage('assets/howTo/howtoNext.png');
  greetBubble = loadImage('assets/greet.png');

  congratsD = loadImage('assets/congratsD.png');
  congratsOver = loadImage('assets/congratsOver.png');
  cheerD = loadImage('assets/cheerD.png');
  cheerOver = loadImage('assets/cheerOver.png');
  ahreallyD = loadImage('assets/ahreallyD.png');
  ahreallyOver = loadImage('assets/ahreallyOver.png');
  thanksD = loadImage('assets/thanksD.png');
  thanksOver = loadImage('assets/thanksOver.png');

  nameRequest = loadImage('assets/nameRequest.png');
  submitImage = loadImage('assets/submitImage.png');
  nameInput = createInput();
  nameInput.size(0, 0);
  nameInput.position(0, 0);

  handImgLeft = loadImage('assets/manager/managerLeft.png');
  handImgRight = loadImage('assets/manager/managerRight.png');
  giftImg = loadImage('assets/manager/giftImg.png');
  giftBubble = loadImage('assets/manager/hereGift.png');

  itemSelectBg = loadImage('assets/itemStage/itemSelectBg.png');
  itemSelectBgOver = loadImage('assets/itemStage/itemSelectBgOver.png');
  giveItemimage = loadImage('assets/itemStage/present.png');
  wearItem = loadImage('assets/itemStage/wearItem.png');

  defaultFace = loadImage('assets/default_mood.png');
  happyFace = loadImage('assets/happy.png');
  angryFace = loadImage('assets/angry.png');
  homeMasterImage = loadImage('assets/homemaster.png');

  camShotmp3 = loadSound('assets/sounds/cameraShot.mp3');
  clearmp3 = loadSound('assets/sounds/missionClear.mp3');
  beepmp3 = loadSound('assets/sounds/missionFail_beep.mp3');
  camCapture = loadImage('assets/camCapture.png');

  // 포스트잇 그리는 화면
  drawScene = loadImage('assets/drawScene.jpg');
  postitRequest = loadImage('assets/postitRequest.png');

  happyEnding = loadImage('assets/HappyEnding.png');
  badEnding = loadImage('assets/BadEnding.png');
  for(let i=0; i<7; i++) howToImages[i] = loadImage(`assets/howTo/howtoStage${i}.png`);
  for(let i=0; i<13; i++) {
    fanCharImages[i] = loadImage(`assets/fan_${i+1}.png`);
    fans.push(new Fan(fanNames[i], fanCharImages[i], defaultFace, happyFace, angryFace,
       'default', 'bench', {'x': 0, 'y': 222}, 1, true));
  }

  for(let i=0; i<6; i++) stageTags[i] = loadImage(`assets/stageTags/stage${i+1}.png`);
  for(let i=0; i<8;i++) questionImagelist[i] = loadImage(`assets/fansBubble/question_${i+1}.png`);

  for(let i=0; i<3;i++) {
    itemBunnylist[i] = loadImage(`assets/items/item_bunny${i+1}.png`);
    itemFlowerlist[i] = loadImage(`assets/items/item_flower${i+1}.png`);
    itemGlasseslist[i] = loadImage(`assets/items/item_glasses${i+1}.png`);
    itemHairbandlist[i] = loadImage(`assets/items/item_hairband${i+1}.png`);
  }

  for(let i=0; i<=7;i++) nickNameimages[i] = loadImage(`assets/nickNames/Sname${i+1}.png`);

  for(let i=0; i<4; i++) {
    // 1: flower, 2: V, 3: tilt, 4: heart
    poseLeftBubbles[i] = loadImage(`assets/hm/hmL_${i+1}.png`)
    poseRightBubbles[i] = loadImage(`assets/hm/hmR_${i+1}.png`)
    poseSample[poseRand[i]] = loadImage(`assets/samplePoses/pose${poseRand[i]}.png`)
  }


}

function setup() {
  createCanvas(1280, 720);
  startButton = new Button(startBtnImg, startBtnOverImg, {'x': 1280*0.7, 'y': 720*0.4}, 350, 130);
  howToButton = new Button(howToBtnImg, howToBtnOverImg, {'x': 1280*0.7, 'y': 720*0.6}, 350, 130);
  howToPrevBtn = new Button(howToPrevImg, howToPrevImg, {'x': 620, 'y': 10}, 120, 80)
  howToNextBtn = new Button(howToNextImg, howToNextImg, {'x': 620, 'y': 630}, 120, 80);
  backButton = new Button(backBtnImg, backBtnOverImg, {'x': 20, 'y': 20}, 230, 230);
  fanNames = shuffle(['민지', '유연', '지은', '민정', '승원', '종환', '진수', '준환', '화정', '아린', '승완', '수진', '다현']);

  for(let i=0; i<3; i++) homeMasters.push(new HomeMaster(homeMasterImage));

  poseLeftDict['Flower'] = poseLeftBubbles[0];
  poseLeftDict['V'] = poseLeftBubbles[1];
  poseLeftDict['Tilt'] = poseLeftBubbles[2];
  poseLeftDict['Heart'] = poseLeftBubbles[3];
  poseRightDict['Flower'] = poseRightBubbles[0];
  poseRightDict['V'] = poseRightBubbles[1];
  poseRightDict['Tilt'] = poseRightBubbles[2];
  poseRightDict['Heart'] = poseRightBubbles[3];

  timer = new Timer();
  statusBar = new StatusBar();

  answerReally = new Button(ahreallyD, ahreallyOver,{'x':240, 'y': 720*0.15}, 332, 168);
  answerCheer = new Button(cheerD, cheerOver,{'x':240, 'y': 720*0.28}, 332, 168);
  answerThanks = new Button(thanksD, thanksOver,{'x':240, 'y': 720*0.41}, 332, 168);
  answerCongrat = new Button(congratsD, congratsOver,{'x':240, 'y': 720*0.54}, 332, 168);

  //이름 제출 버튼
  submit = new Button(submitImage, submitImage, {'x': 760, 'y': 440}, 120, 80);

  //아이템 선택 박스
  itemSelectbutton1 = new Button(itemSelectBg, itemSelectBgOver,{'x': 220, 'y': 80}, 200, 200);
  itemSelectbutton2 = new Button(itemSelectBg, itemSelectBgOver,{'x': 440, 'y': 80}, 200, 200);
  itemSelectbutton3 = new Button(itemSelectBg, itemSelectBgOver,{'x': 660, 'y': 80}, 200, 200);
  itemDict = {'Bunny': itemBunnylist, 'Flower': itemFlowerlist, 'Glasses': itemGlasseslist, 'Hairband': itemHairbandlist }

  // 포즈 구별 인식 모델 로드
  let options = {
    inputs: 34, // num of skeleton key pairs
    outputs: 4,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
  }
  // for loading trained model
  brain.load(modelInfo, classifyPose());

  questionFormission = shuffle(questionImagelist);
  indexForpostit = shuffle(indexForpostit);
  poseRand = shuffle(poseRand);
  nickNameIndex = shuffle(nickNameIndex);
  for(let i=0; i<4; i++){
    append(itemNumber, int(random(0,3)));
  } // 아이템 선택용 리스트
  homeMasters = shuffle(homeMasters);
}

function draw() {
  if(gameState == 'intro') {
    background(introBg);
    startButton.display();
    howToButton.display();
  } else if(gameState == 'howTo') {
    startButton.remove();
    howToButton.remove();
    background(howToImages[howToPage]);
    howToPrevBtn.display();
    howToNextBtn.display();
    if(howToPage == 6) {
      howToNextBtn.remove();
      startButton.setPosition(920, 600);
      startButton.display();
    }
  } else { // if game started
    startButton.remove();
    howToButton.remove();
    backButton.remove();
    howToPrevBtn.remove();
    howToNextBtn.remove();
    background(bg);
    timer.display();
    statusBar.display();

    if(greeting) image(greetBubble, 220, 400, 340, 150);
    if(givingGift) image(giftBubble, 640, 20, 300, 150);
    if(state == "poseCam") {
      if(!camReady) {
        camReady = true;
        cam = createCapture();
        cam.hide();
        poseNet = ml5.poseNet(cam, function() {
          console.log('poseNet ready');
        });
      }

      poseNet.on('pose', gotPoses);
      push();
      translate(cam.width, 0);
      scale(-1, 1);
      image(cam, -1280/4, 720/4);
      // 예시 포즈
      pop();
      image(poseSample[currPose], 600, 80, 100, 160);
      image(camCapture, 52, -18, 1120, 856);

      if(poseLabel == currPose) { // 포즈 랜덤으로 바꾸기
        missionDone = "success";
        camShotmp3.play();
        camReady = false;
        state = "default";
      }
    }

    if(stageNum == 0) {
      fans = shuffle(fans);
      fanStage1 = subset(fans, 0, 4);
      stageNum++;
      // remainFans = 40;
      // stageNum = 7;
    }

    if(stageNum == 1) {
      // 1: 질문에 맞는 대답(승원)
      if(turn < 3) {
        if(frameCount % 60 == 0 && stageAlarm < 2) stageAlarm++;
        if(stageAlarm < 2 && turn == 0) {
          imageMode(CENTER);
          image(stageTags[0], 1280/2, 200);
          imageMode(CORNER);
        }

        let currFan = fanStage1[turn];

        if(stageAlarm == 2) {
          currFan.display();
          if(currFan.coord.x < 1280/2) currFan.move(); // 가운데까지 팬 움직임
        }

        if(currFan.coord.x == 1280/2) { // 팬이 가운데 도착하면
          currFan.stop(); // 멈추고
          if(frameCount % 60 == 0 && greetTime > 0) {
            greeting = true; // 내가 인사함
            greetTime--;
          }
          if(greetTime == 0) { // 인사가 끝나면 타이머와 미션 시작
            greeting = false;
            timerStarted = true;
          }
          if(timerStarted) { // 타이머가 시작하면 미션도 시작
            if(!timeDefined) {
              timer.setTime(5); // 5초
              timeDefined = true;
            }
            timer.display();
            timer.start();

            currFan.askQuestion(questionFormission);
            selectAnswer();

            if(missionDone == "success") {
              currFan.moodChange('happy');
              clearmp3.play();
            } else if(timer.getTime() == 0 || missionDone == "fail") {
              currFan.moodChange('angry');
              gotFail();
            }
          }
        }
        if(missionDone != "") {
          if(frameCount % 60 == 0 && fanPause < 2) fanPause++;
          if(fanPause == 2) currFan.move();
          if(currFan.coord.x > 1280) {
            nextMission(currFan);
          }
        }
      } else {
        stageAlarm = 0;
        turn = 0;
        fans = shuffle(fans);
        fanStage2 = subset(fans, 0, 4)
        stageNum++;
      }
    } else if(stageNum == 2) {
      cursor('assets/pen.png');
      // 2: 포스트잇 (민지)
      if(turn < 3) {
        if(frameCount % 60 == 0 && stageAlarm < 2) stageAlarm++;
        if(stageAlarm < 2 && turn == 0) {
          imageMode(CENTER);
          image(stageTags[1], 1280/2, 200);
          imageMode(CORNER);
        }

        let currFan = fanStage2[turn];

        if(stageAlarm == 2) {
          currFan.display();
          if(currFan.coord.x < 1280/2) currFan.move();
        }

        if(currFan.coord.x == 1280/2) {
          currFan.stop();
          image(postitRequest, 460, 20, 360, 120);

          if(frameCount % 60 == 0 && greetTime > 0) {
            greeting = true;
            greetTime--;
          }
          if(greetTime == 1){
            readyFordraw();
            doingPostit = true;
          }
          if(greetTime == 0) {
            greeting = false;
            timerStarted = true;
          }

          if(timerStarted) {
            if(!timeDefined) {
              timer.setTime(12); // 12초
              timeDefined = true;
            }
            timer.display();
            timer.start();

            image(drawScene, 0,0, 1280, 720);
            drawPostit();

            if(missionDone == "success") {
              currFan.moodChange('happy');
              clearmp3.play();
            } else if(timer.getTime() == 0 || missionDone == "fail") {
              currFan.moodChange('angry');
              gotFail();
            }
          }
        }
        if(missionDone != "") {
          doingPostit = false;
          if(frameCount % 60 == 0 && fanPause < 2) fanPause++;
          if(fanPause == 2) currFan.move();
          if(currFan.coord.x > 1280) nextMission(currFan);
        }
      } else {
        stageAlarm = 0;
        turn = 0;
        fans = shuffle(fans);
        fanStage3 = subset(fans, 0, 4);
        cursor('default');
        stageNum++;
      }
    } else if(stageNum == 3) {
      // 3: 매니저 손 치우기(유연)
      if(turn < 3) {
        if(frameCount % 60 == 0 && stageAlarm < 2) stageAlarm++;
        if(stageAlarm < 2 && turn == 0) {
          imageMode(CENTER);
          image(stageTags[2], 1280/2, 200);
          imageMode(CORNER);
        }

        let currFan = fanStage3[turn];

        if(stageAlarm == 2) {
          currFan.display();
          if(currFan.coord.x < 1280/2) {
            currFan.move();
          }
        }

        if(currFan.coord.x == 1280/2) {
          currFan.stop();

          if(frameCount % 60 == 0 && greetTime > 0) {
            givingGift = true;
            greetTime--;
          }

          if(greetTime == 0) {
            givingGift = false;
            timerStarted = true;
          }

          if(timerStarted) {
            if(!timeDefined) {
              timer.setTime(7); // 7초
              timeDefined = true;
            }
            timer.display();
            timer.start();

            currFan.giveGift();
            stopManager();

            if (mgstop >= (5*(turn+1))) { // 각각 5번 손을 막으면 성공
              missionDone = "success"
            }

            if(missionDone == "success") {
              currFan.moodChange('happy');
              clearmp3.play();
            } else if(timer.getTime() == 0 || missionDone == "fail") {
              currFan.moodChange('angry');
              gotFail();
            }
          }
        }

        if(missionDone != "") {
          if(frameCount % 60 == 0 && fanPause < 2) fanPause++;
          if(fanPause == 2) currFan.move();
          if(currFan.coord.x > 1280) nextMission(currFan);
        }
      } else {
        stageAlarm = 0;
        turn = 0;
        fans = shuffle(fans);
        fanStage4 = subset(fans, 0, 4);
        stageNum++;
      }
    } else if(stageNum == 4) {
      // 4: 팬 이름 맞추기(승원)
      if(turn < 3) {
        if(frameCount % 60 == 0 && stageAlarm < 2) stageAlarm++;
        if(stageAlarm < 2 && turn == 0) {
          imageMode(CENTER);
          image(stageTags[3], 1280/2, 200);
          imageMode(CORNER);
        }

        let currFan = fanStage4[turn];
        currFan.name = nickNames[nickNameIndex[turn]];

        if(stageAlarm == 2) {
          currFan.display();
          if(currFan.coord.x < 1280/2) currFan.move();
        }

        if(currFan.coord.x == 1280/2) {
          currFan.stop();
          if(frameCount % 60 == 0 && greetTime > 0) {
            greeting = true;
            greetTime--;
          }

          if(greetTime == 1) {
            // nameInput = createInput();
            nameInput.size(240, 40);
            nameInput.position(520, 460);
          }
          if(greetTime == 0) {
            greeting = false;
            timerStarted = true;
          }

          if(timerStarted) {
            if(!timeDefined) {
              timer.setTime(7); // 5초..였지만..
              timeDefined = true;
            }
            timer.display();
            timer.start();

            image(nickNameimages[nickNameIndex[turn]], 760, 270, 280, 100);
            currFan.nameQuiz();
            rememberName();

            if(mouseIsPressed){
              if(submit.mouseOver()){
                if(nameInput.value() == currFan.name) missionDone='success';
                else missionDone='fail';
              }
            }

            if(missionDone == "success") { // 미션 성공
              currFan.moodChange('happy'); // 팬 기쁨
              clearmp3.play();
            } else if(timer.getTime() == 0 || missionDone == "fail") { // 시간 초과 or 미션 실패
              currFan.moodChange('angry'); // 팬 화남
              gotFail();
            }
          }
        }
        if(missionDone != "") { // 실패든 성공이든 미션 하나 지나가면
          if(frameCount % 60 == 0 && fanPause < 2) fanPause++;
          if(fanPause == 2) currFan.move();
          if(currFan.coord.x > 1280) nextMission(currFan);
        }
      } else {
        stageAlarm = 0;
        turn = 0;
        nameInput.remove();
        fans = shuffle(fans);
        fanStage5 = subset(fans, 0, 4)
        stageNum++;
      }
    } else if(stageNum == 5) {
      // 5: 아이템 맞추기(승원)
      if(turn < 4) {
        if(frameCount % 60 == 0 && stageAlarm < 2) stageAlarm++;
        if(stageAlarm < 2 && turn == 0) {
          imageMode(CENTER);
          image(stageTags[4], 1280/2, 200);
          imageMode(CORNER);
        }

        let currFan = fanStage5[turn];

        if(stageAlarm == 2) {
          currFan.display();
          if(currFan.coord.x < 1280/2) currFan.move();
        }

        if(currFan.coord.x == 1280/2) {
          currFan.stop();
          if(frameCount % 60 == 0 && greetTime > 0) {
            greeting = true;
            greetTime--;
          }
          if(greetTime == 0) {
            greeting = false;
            timerStarted = true;
          }
          if(timerStarted) {
            if(!timeDefined) {
              timer.setTime(3); // 3초
              timeDefined = true;
            }
            timer.display();
            timer.start();

            image(giveItemimage, 480, 20, 360, 120);
            image(itemSelectBg, 320, 180, 200, 200);
            if(turn == 0) image(itemBunnylist[itemNumber[0]], 320, 180, 200, 200);
            else if(turn == 1) image(itemFlowerlist[itemNumber[1]], 320, 180, 200, 200);
            else if(turn == 2) image(itemGlasseslist[itemNumber[2]], 320, 180, 200, 200);
            else if(turn == 3) image(itemHairbandlist[itemNumber[3]], 320, 180, 200, 200);

            missionDone = 'pass';
          }
        }

        if(missionDone != "") {
          if(frameCount % 60 == 0 && fanPause < 2) fanPause++;
          if(fanPause == 2) currFan.move();
          if(currFan.coord.x > 1280) nextMission(currFan);
        }
      } else if (4 <= turn && turn < 8){
        let currFan = fanStage5[turn%4];
        timerStarted = true;
        if(timerStarted) {
          currFan.displayForitem();
          image(wearItem, 1080, 120, 360, 120);
          if(!timeDefined) {
            timer.setTime(5); // 8초(너무 긴 듯)
            timeDefined = true;
          }
          timer.display();
          timer.start();

          itemSelectbutton1.display();
          itemSelectbutton2.display();
          itemSelectbutton3.display();

          if(turn==4) selectItem('Bunny');
          else if(turn==5) selectItem('Flower');
          else if(turn==6) selectItem('Glasses');
          else if(turn==7) selectItem('Hairband');

          if(missionDone == "success") {
            currFan.moodChange('happy');
            clearmp3.play();
          } else if(timer.getTime() == 0 || missionDone == "fail") {
            currFan.moodChange('angry');
            gotFail();
          }
        }
        if(missionDone != "") {
          if(frameCount % 60 == 0 && fanPause < 2) fanPause++;
          if(fanPause == 2) nextMission(currFan);
        }
      } else {
        stageAlarm = 0;
        turn = 0;
        stageNum++;
      }
    } else if(stageNum == 6) {
      // 6: 홈마 요구 포즈 취하기(지은)
      if(turn < 2) {
        if(frameCount % 60 == 0 && stageAlarm < 2) stageAlarm++;
        if(stageAlarm < 2 && turn == 0) {
          imageMode(CENTER);
          image(stageTags[5], 1280/2, 200);
          imageMode(CORNER);
        }

        let currHm = homeMasters[turn];
        if(stageAlarm == 2) {
          currHm.display();
          if(currHm.getPosition() == "left") currHm.requestPose(poseLeftDict[poseRand[turn]]);
          else currHm.requestPose(poseRightDict[poseRand[turn]]);
          currPose = poseRand[turn];
        }

        if(!currHm.isSaying()) { // 홈마가 말하기 멈추면
          timerStarted = true;
          if(timerStarted) { // poseNet ready 후 타이머가 세팅되면
            if(!timeDefined) {
              timer.setTime(7); // 7초
              timeDefined = true;
            }
            state = 'poseCam';
            if(poseNet) {
              timer.display();
              timer.start();
            }

            if(missionDone == "success") {
              camShotmp3.play();
              state = "default";
            } else if(timer.getTime() == 0 || missionDone == "fail") {
              gotFail();
              state = "default";
            }
          }
        }

        if(missionDone != "") {
          if(frameCount % 60 == 0 && fanPause < 2) fanPause++;
          if(fanPause < 2) currHm.disappear();
          if(!currHm.isShowing()) {
            greeting = false;
            greetTime = 2;
            timerStarted = false;
            timeDefined = false;
            missionDone = "";
            fanPause = 0;
            stageAlarm = 0;
            turn++;
          }
        }
      } else {
        stageAlarm = 0;
        turn = 0;
        cam.hide();
        stageNum++;
      }
    } else { // 스테이지 끝~!
      if(remainFans >= 60) background(happyEnding);
      else background(badEnding);
      background(0, 0, 0, fade);
      fade--;
    }
  }
}

// which button clicked?
function mousePressed() {
  if(startButton.mouseOver()) gameState = 'playing';
  else if(howToButton.mouseOver()) gameState = 'howTo';
  else if(backButton.mouseOver()) gameState = 'intro';
  else if(howToPrevBtn.mouseOver()) howToPage--;
  else if(howToNextBtn.mouseOver()) howToPage++;

  if(doingPostit==true){
    start = true;
    points=[];
  }
}

function mouseReleased() {
  if(doingPostit==true) start = false;
}

// 무엇이든 섞기
function shuffle(arr) {
  for(let i=arr.length-1; i>0; i--) {
    let j = int(random(0, i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function nextMission(fan) {
  greeting = false;
  greetTime = 2;
  timerStarted = false;
  timeDefined = false;
  missionDone = "";
  fanPause = 0;
  stageAlarm = 0;
  fan.moodChange('default');
  fan.returnPosition();
  turn++;
}

function gotFail() {
  missionDone = 'fail'; // 미션 실패
  statusBar.minus();
  beepmp3.play();
  remainFans -= 5;
}

// 승원
function selectAnswer() {
  answerCheer.display();
  answerReally.display();
  answerCongrat.display();
  answerThanks.display();
  if(mouseIsPressed){
    if(answerReally.mouseOver()){
      if(subset(questionImagelist, 4, 2).includes(questionFormission[turn])) missionDone='success';
      else missionDone='fail';
    }
    if(answerThanks.mouseOver()){
      if(subset(questionImagelist, 6, 2).includes(questionFormission[turn])) missionDone='success';
      else missionDone='fail';
    }
    if(answerCheer.mouseOver()){
      if(subset(questionImagelist, 0, 2).includes(questionFormission[turn])) missionDone='success';
      else missionDone='fail';
    }
    if(answerCongrat.mouseOver()){
      if(subset(questionImagelist, 2, 2).includes(questionFormission[turn])) missionDone='success';
      else missionDone='fail';
    }
  }
}

function selectItem(item) {
  image(itemDict[item][0], 220, 80, 200, 200);
  image(itemDict[item][1], 440, 80, 200, 200);
  image(itemDict[item][2], 660, 80, 200, 200);
  if(mouseIsPressed){
    if(itemSelectbutton1.mouseOver()){
      if(itemNumber[turn-4]==0) missionDone='success';
      else missionDone='fail';
    }
    if(itemSelectbutton2.mouseOver()){
      if(itemNumber[turn-4]==1) missionDone='success';
      else missionDone='fail';
    }
    if(itemSelectbutton3.mouseOver()){
      if(itemNumber[turn-4]==2) missionDone='success';
      else missionDone='fail';
    }
  }
}

// 민지
function readyFordraw() {
  catcher = new Catcher(8);
  for (let i = 0; i < dotN[indexForpostit[turn]]; i++) {
    coordinates[i] = new Coordinate();
    check[i] = 0;
  }

  for (i = 0; i < dotN[indexForpostit[turn]]; i++) {
    coordinates[i].setLocation(1280 / 2 + dotPostion[indexForpostit[turn]][0][i],
      720 / 2 + dotPostion[indexForpostit[turn]][1][i]);
  }
}

function drawPostit(){
  catcher.setLocation(mouseX, mouseY);
  // catcher.display();

  for (let i = 0; i < dotN[indexForpostit[turn]]; i++) {
    coordinates[i].display();
  }

  if (start) {
    points.push(createVector(mouseX, mouseY));
    let check_sum = 0;
    for (let i = 0; i < dotN[indexForpostit[turn]]; i++) {
      if (catcher.intersect(coordinates[i])) check[i] = 1;
      check_sum += check[i];
    }
    if (check_sum > dotN[indexForpostit[turn]]-5) missionDone='success';
  }

  stroke(255);
  strokeWeight(10);
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    let x = points[i].x;
    let y = points[i].y;
    vertex(x, y);
  }
  endShape();
}

// 승원
function rememberName(fan) {
  submit.display();
}

// 지은(포즈 분리)
function classifyPose() {
  if(pose) {
    let inputs = [];
    for(let i=0; i<pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, poseResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

// 지은(포즈 인식)
function poseResult(error, results) {
  let label = results[0].label;
  if(label == 'f') poseLabel = "Flower";
  else if(label == 'h') poseLabel = "V";
  else if(label == 't') poseLabel = "Tilt";
  else if(label == 's') poseLabel = "Heart";
  classifyPose();
}

function gotPoses(poses) {
  if(poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton; // to draw lines bt'n points
    if(state == 'collecting') {
      let inputs = [];
      for(let i=0; i<pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        inputs.push(x);
        inputs.push(y);
      }
      let target = [targetLabel];
      brain.addData(inputs, target);
    }
  }
}

// 유연
function stopManager() {
  if (frameCount % 60 == 3) {
    mghands.push(new Manager(handImgLeft, handImgRight));
  }
  let left = 0;
  let right = 880;

  for (let mghand of mghands) {
    mghand.display();
    if (keyIsDown(LEFT_ARROW) && (mghand.direction == left)) {
      mghand.disappear();
      mgstop += 1;
    } else if (keyIsDown(RIGHT_ARROW) && (mghand.direction == right)) {
      mghand.disappear();
      mgstop += 1;
    } else if (keyIsDown(LEFT_ARROW) && (mghand.direction == right)) {
      mghand.disappear();
      mgstop += 0;
    } else if (keyIsDown(RIGHT_ARROW) && (mghand.direction == left)) {
      mghand.disappear();
      mgstop += 0;
    } else {
      mgstop += 0;
    }
  }
}
