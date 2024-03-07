function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Helvetica');
  for (i in Words) {
    let word1 = Words[i].toUpperCase();
    Words[i] = word1;
  }
}

// put hexcode colors here
const PresetColors = {
  main: "#0066ff",
  accent: "#003d99",
  popuptextbox: "#ffffff",
  grey: "#969696",
};

// textBox notifications - remember they all have to be able to take arrays and normal inputs so that unlimited funtions will work - they will last for an amount of seconds or forever until a button object on it is pressed
const PopupTextBox = function(x,y,w,h,text,time){
  this.x = x;
  this.y = y;
  this.w = w;
  // make the height determined by the amount of text
  this.h = h;
  // text should loop
  this.text = text;
  this.time = time;
  this.button = null;
  if (this.time == false){
    this.button = new Button();
    // reset to the bottom of the textbox
    //this.button.reset();
  }
}
PopupTextBox.prototype.display = function(color1,color2,color3){
  // display the text
  fill(color3);
  rect(this.x, this.y, this.w, this.h);
  fill(0);
  text(this.text, this.x+(this.w/2)-(this.text.length*3), this.y+this.h/2);
  // if the textbox has a button, display it
  if (this.button != null){
    this.button.display(color1,color2);
  }
}
PopupTextBox.prototype.Run = function(){
  if (typeof this.time == "number"){
    this.time--;
    if (this.time < 0){
      // remove the popup
      Popups.splice(Popups.indexOf(this),1);
    }
  }
  else {
    this.button.press(destroyPopup,Popups.indexOf(this));
  }


}

// an animation is for one value create multiple animations for one object
class Animation{
  // NumkeyFrames input(totalnumber of keyFrames) - int value of placement of keyFrame, value of keyFrame
  constructor(name, ...args){
    this.name = name;
    this.KeyFrames = [];
    // for (i in args){
    //   this.KeyFrames.push(args[i]);
    // }
    for (let i = 0; i < args.length; i++){
      this.KeyFrames.push(args[i]);
      //console.log(i);
    }
    this.Frames = [];
    this.currFrame = 0;
  }
  PopulateFrames(){
    //console.log("hello");

     for (let i = 0; i < this.KeyFrames.length; i+=2){
       //console.log(i+"populate frames");
       let currFrame;
       let currValue;
       let beforeKeyFrame;
       let beforeValue;
       let diffFrames;


       if (i == 0){
         diffFrames = this.KeyFrames[i];
         currValue = this.KeyFrames[i+1];
         for (let j = 0; j < diffFrames; j++){
           this.Frames.push(currValue/diffFrames);
           //console.log(currValue/diffFrames);
         }

       }
       else {
         beforeKeyFrame = this.KeyFrames[i-2];
         beforeValue = this.KeyFrames[i-1];
         currFrame = this.KeyFrames[i];
         currValue = this.KeyFrames[i+1];
         diffFrames = currFrame - beforeKeyFrame;
         for (let j = 0; j < diffFrames; j++){
           //  (beforeValue + currValue)/diffFrames
           //console.log(currValue/diffFrames);
           //console.log("("+currValue+" + "+beforeValue+")/"+diffFrames+" = "+(currValue - beforeValue)/diffFrames);
           this.Frames.push(currValue/diffFrames);
           //this.Frames.push((beforeValue + currValue)/diffFrames);
         }
       }

      }
    }
  RunAnimation(repeat){
    //console.log(this.currFrame+" CurrFrame : this.FramesLength "+this.Frames.length);
    if (this.currFrame < this.Frames.length){
      let addAmount = this.Frames[this.currFrame];
      this.currFrame ++;
      //console.log(addAmount+" Amount Added");
      return addAmount;
    }
    else if (repeat){
      this.currFrame = 0;
      //let addAmount = this.Frames[this.currFrame];
      //console.log(addAmount+" Amount added : Frame "+this.currFrame);
      //this.currFrame ++;
      //console.log(this.currFrame+" currFrame");
      
      return 0;
    }
  }
}

class Point{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

const Shark = function(x,y,string){
  this.x = x;
  this.y = y;
  this.w = 60;
  this.h = 40;
  this.word = new Word(string);
  this.alive = true;
  this.StartTailLength = 30;
  this.MidTailLength = 20;
  this.EndTailLength = 10;
  this.fin1X = 15;
  this.fin2X = 15;
  this.StartTailY = {
    Top: (this.h/2)-this.StartTailLength/10,
    Bottom: (this.h/2)-this.StartTailLength/10,
  };
  this.MidTailY = {
    Top: this.StartTailY.Top-this.MidTailLength/10,
    Bottom: this.StartTailY.Bottom-this.MidTailLength/10,
  };
  this.EndTailY = {
    Top: 30,
    Bottom: 25,
  };
  this.Animations = [  // name, placement, value
    // front Fin
    //new Animation("Forward and Backward",60,-10,120,10),
    new Animation("Forward and Backward",60,-10,120,10,180,10,240,-10),
    // start tail (x)    // one cicle = the tail going back and reseting once 60 frames 
    // wait 60 frames after ward
    new Animation("Back and forth",30,-15,60,15),
    new Animation("Back and forth",30,-15,60,15),
    // end Tail(x)
    new Animation("Back and forth",35,-8,40,8,60,0),

    new Animation("Shrink and so",30,-5,60,5,120,0),

    new Animation("Shrink and so",30,-5,60,5,120,0),

    new Animation("Shrink and so",30,-8,60,8,120,0),

    new Animation("Shrink and so",30,-8,60,8,120,0),// keyFrame number , keyFrame Value...

    new Animation("ChangeColorStartTail",30,-40,60,40,90,40,120,-40),
    new Animation("ChangeColorStartTail",30,-30,60,30,90,30,120,-30),
    new Animation("ChangeColorStartTail",30,-12,60,12,90,12,120,-12),

    new Animation("ChangeColorStartTail",30,-40,60,40,90,40,120,-40),
    new Animation("ChangeColorStartTail",30,-30,60,30,90,30,120,-30),
    new Animation("ChangeColorStartTail",30,-20,60,20,90,12,120,-12),

    new Animation("ChangeColorStartTail",30,-40,60,40,90,20,120,-20),
    new Animation("ChangeColorStartTail",30,-30,60,30,90,10,120,-10),
    new Animation("ChangeColorStartTail",30,-30,60,30,90,20,120,-20),
  ];
  this.colors = {
    StartTail: [133, 149, 222],
    //rgb(174, 184, 234)
    MidTail: [133, 149, 222],
    EndTail: [133, 149, 222],
  };
  for (i in this.Animations){
    this.Animations[i].PopulateFrames();
    //console.log(this.Animations[i]);
  }
  
}
Shark.prototype.display = function(){
  // this is a testing display function - replace with a real one that takes animation later
  //stroke(255,255,255);
  noStroke();

  
  // fill normal color
  fill(133, 149, 222);
  //head
  arc(this.x,this.y,this.w,this.h,HALF_PI,-HALF_PI);
  //body
  rect(this.x,this.y-(this.h/2),this.w,this.h);

  // eyes
  if (this.alive){
    fill(255,255,255);
    ellipse(this.x-18,this.y-5,10,10);
    fill(255,0,0);
    ellipse(this.x-19,this.y-5,7,7);
  }
  else {  // dead eyes
    fill(0);
    stroke(0);
    //line(this.x-18,this.y-5);
    line(this.x-23,this.y-10,this.x-3,this.y);
    line(this.x-23,this.y,this.x-3,this.y-10);
    noStroke();
    
  }
  
  fill(this.colors.StartTail[0],this.colors.StartTail[1],this.colors.StartTail[2]);
  let StartTailX = this.x+(this.w);
  let StartTailOtherX = StartTailX+this.StartTailLength;
  let StartTailYBase = this.h/2;
  // start tail
  quad(StartTailX,this.y-StartTailYBase,StartTailX,this.y+StartTailYBase,StartTailOtherX,this.y+this.StartTailY.Bottom,StartTailOtherX,this.y-this.StartTailY.Top);

  // mid tail
  fill(this.colors.MidTail[0],this.colors.MidTail[1],this.colors.MidTail[2]);
  let MidTailX = StartTailOtherX;
  let MidTailOtherX = MidTailX+this.MidTailLength;

  quad(MidTailX,this.y-this.StartTailY.Top,MidTailX,this.y+this.StartTailY.Bottom,MidTailOtherX,this.y+this.MidTailY.Bottom,MidTailOtherX,this.y-this.MidTailY.Top);

  // end tail
  fill(this.colors.EndTail[0],this.colors.EndTail[1],this.colors.EndTail[2]);
  let EndTailX = MidTailOtherX;
  let EndTailOtherX = EndTailX+this.EndTailLength;

  quad(EndTailX,this.y-this.MidTailY.Top,EndTailX,this.y+this.MidTailY.Bottom,EndTailOtherX,this.y+this.EndTailY.Bottom, EndTailOtherX,this.y-this.EndTailY.Top);
  
  fill(133, 149, 222);
  // fin on top
  triangle(this.x+20,this.y-this.h/2,this.x+43,this.y-this.h,this.x+50,this.y-this.h/2);

  // fins on bottom
  fill(93, 119, 180);
  triangle(this.fin1X+this.x,this.y+this.h/2,this.fin1X+20+this.x,this.y+this.h,this.fin1X+this.x+25,this.y+this.h/2);

  fill(133,149,222);
  triangle(this.fin2X+this.x,this.y+this.h/2,this.fin2X+20+this.x,this.y+this.h,this.fin2X+this.x+25,this.y+this.h/2);

  
  for (let i = 0; i < this.word.word.length; i++){
    if (this.word.lettersTyped[i] == true){
      fill(255,255,255);
      stroke(255,255,255);
    }
    else {
      fill(0);
      stroke(0);
    }
    let extraSpace = 0;
    if (this.word.word[i] == "I" )
    {
      extraSpace = 4;
    }
    text(this.word.word[i],this.x+(i*10)+extraSpace,this.y);
  }
  
  //console.log(this.word.word);
  //text(this.word.word,this.x,this.y);
  //text(this.word.lettersTyped,this.x,this.y+30);

}
Shark.prototype.move = function(){
  if (checkArrayValueAll(this.word.lettersTyped,true)){
    this.alive = false;
    this.StartTailLength = 20;
    this.MidTailLength = 10,
    this.EndTailLength = 5,
    this.StartTailY = {
      Top: 0,
      Bottom: 30,
    };
    this.MidTailY = {
      Top: -30,
      Bottom: 50,
    };
    this.EndTailY = {
      Top: -10,
      Bottom: 70,
    };
  }
  if (this.alive){
    this.x-=sharkSpeed;
  }
  else {
    this.y-=1.5;
  }
}
Shark.prototype.animate = function(){
  if (this.alive){
    this.fin1X += this.Animations[0].RunAnimation(true);  // var = amt of change this frame based on animation object
    this.fin2X -= this.Animations[0].RunAnimation(true);
    this.StartTailLength += this.Animations[1].RunAnimation(true);
    this.MidTailLength += this.Animations[2].RunAnimation(true);
    this.EndTailLength += this.Animations[3].RunAnimation(true);
    this.StartTailY.Top += this.Animations[4].RunAnimation(true);
    this.StartTailY.Bottom += this.Animations[5].RunAnimation(true);
    this.MidTailY.Top += this.Animations[6].RunAnimation(true);
    this.MidTailY.Bottom += this.Animations[7].RunAnimation(true);
    this.colors.StartTail[0] += this.Animations[8].RunAnimation(true);
    this.colors.StartTail[1] += this.Animations[9].RunAnimation(true);
    this.colors.StartTail[2] += this.Animations[10].RunAnimation(true);
  
    this.colors.MidTail[0] += this.Animations[11].RunAnimation(true);
    this.colors.MidTail[1] += this.Animations[12].RunAnimation(true);
    this.colors.MidTail[2] += this.Animations[13].RunAnimation(true);
  
    this.colors.EndTail[0] += this.Animations[14].RunAnimation(true);
    this.colors.EndTail[1] += this.Animations[15].RunAnimation(true);
    this.colors.EndTail[2] += this.Animations[16].RunAnimation(true);
  }
  
}

const Slider = function(){
  this.x;
  this.y;
  this.w;
  this.h;
  this.min;
  this.max;
  this.diff;
  this.sectionLength;
  this.position;
  this.border;
}
Slider.prototype.reset = function(x,y,w,h,min,max,position,border){
  if (this.x != x && this.y != y && this.w != w && this.h != h && this.w != w && this.position != position){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.min = min;
    this.max = max;
    this.diff = this.max-this.min;
    this.border = border;
    this.sectionLength = (this.w-2*border)/this.diff;
    this.position = position;
  }
}
Slider.prototype.display = function(BC1,BC2,BC3,string){

  fill(BC1);
  rect(this.x,this.y,this.w,this.h*2,3);
  noStroke();
  fill(BC2);
  rect(this.x+this.border,this.y+this.border,this.w-(2*this.border),this.h-(2*this.border));
  fill(255,255,255);
  stroke(255,255,255);
  for (let i = 0; i < this.diff; i++){
    line(this.x+this.border+(i*this.sectionLength),this.y+this.border,this.x+this.border+(i*this.sectionLength),this.y+this.h-this.border);
  }
  stroke(0);
  textSize(20);
  text(string+": "+this.position,this.x+this.w/2-(string.length+3)*3,this.y+this.h+this.h/2);
  textSize(13);
  
  noStroke();
  fill(BC3);
  // make border a property and set it in reset we don't want the slider
  let insidePosition = (this.position-this.min)*this.sectionLength;
  rect(this.x+this.border+insidePosition-5+(this.sectionLength/2),this.y-this.border,10,this.h+2*this.border);

  
  
}
Slider.prototype.Slide = function(){
  if (mouseX > this.x+this.border && mouseX < this.x+this.w-this.border){
    if (mouseY > this.y && mouseY < this.y+this.h && mouseIsPressed){
      let Position = floor((mouseX-this.x-this.border)/this.sectionLength+this.min);
      console.log(Position);
      this.position = Position;
    }
  }
}

class Bubble{
  constructor(x,y,r,v){
    this.x = x;
    this.y = y;
    this.r = r;
    this.v = v;
  }
  display(){
    stroke(255,255,255);
    noFill();
    ellipse(this.x,this.y,this.r,this.r);
    arc(this.x,this.y,this.r-10,this.r-10,0,PI);
  }
  float_reset(PORY,limitY,PORX){
    this.y -= this.v;
    if (this.y < limitY){
      this.y = PORY;
      this.x = PORX;
    }
  }
}

// put other random var here
let Sharks = [];
const Popups = [];
let screen = "home";
let Buttons = [
  new Button(),
  new Button(),
  new Button(),
  new Button(),
  new TextBox(),
  new Button(),
];
let Sliders = [
  new Slider(),
  new Slider(),
  new Slider(),
  new Slider(),
  new Slider(),
];
const Bubbles = [];

// hangman var
let HangmanWord = "nothing";
let HangManAmtWrong = [];
let wordPosition = new Point(0,0);
let framePosition = new Point(0,0);

let ButtonXDefault = null;
let BUttonWidthDefault = null;
let ButtonHeightDefault = null;
let ButtonYDefault = null;
let ButtonYSpacingDefault = null;
let ScreenWidth = null;
let ScreenHeight = null;
let pastScreenWidth = null;

// for typing with sharks
let SharksLibrary = [];
let WordLengthMin = 3;
let WordLengthMax = 5;
let sharkSpeed = 1;
let score = 0;
let callWaveEvery = 30;
let Depth = -35*20;
const maxDepth = 2000;
let callWave = false;
let wavePresent = false;
let TypingRecovery = {
  time: 15,
  RecovTime: 0,
};
let minWaveSize = 1;
let maxWaveSize = 5;
let SelectedShark = "none";
let Pause = false;
let EndGame = false;
let onlyHomeRow = false;

let newWords = [];
let saveId = "savedwords";
let alreadySaved = "none";

// functions for buttons here - remember they all have to be able to take arrays and normal inputs so that unlimited funtions will work
function siftWordLength(){
  if (SharksLibrary.length < 1){  
    for (i in Words){
      if (Words[i].length >= WordLengthMin && Words[i].length <= WordLengthMax){
        SharksLibrary.push(Words[i]);
      }
    }
  }
}

function siftHomeRow(array){
  let newArray = [];
  let ok = false;
  for (i in array){  //check every word
    ok = true;
    for (j in array[i]){  // check every letter in the word
      let letter = array[i][j];
      if (letter == "Q" || letter == "W" || letter == "E" || letter == "R"){
        ok = false;
      }
    }
    if (ok){
      newArray.push(array[i]);
    }
  }
  return newArray;
}  // returns words with home row keys  
function switchScreen(switchTo) {
  if (Array.isArray(switchTo)) {
    screen = switchTo[0];
  } else {
    screen = switchTo;
  }
}
function setHangmanWord(setTo){
  if (Array.isArray(setTo)){
    HangmanWord = new Word(setTo[0]);
  }
  else {
  HangmanWord = new Word(setTo);
  }
}
function selectRandomWord() {
  let randoms = floor(random(1, Words.length + 1));
  HangmanWord = new Word(Words[randoms]);
}
function returnRandomWord(List){
  let randoms = floor(random(1,SharksLibrary.length));
  randomWord = SharksLibrary[randoms];
  return (randomWord);
}
function updateSharksLibrary(){
  let max = floor(WordLengthMax);
  SharksLibrary = [];
  siftWordLength();
  
}
// x,y,w,h,string,time
function createPopupTextBox(...args){
  let popup;
  if (Array.isArray(args)){
    popup = new PopupTextBox(args[0],args[1],args[2],args[3],args[4],args[5]);
  }
  else {
    popup = new PopupTextBox(args);
  }
   
  Popups.push(popup);
}
function destroyPopup(index){
  Popups.splice(index,1);
}
function RunAllPopups(BC1,BC2,BC3){
  //console.log(Popups);
  if (Popups.length >= 1){
    for (i in Popups){
      Popups[i].display(BC1,BC2,BC3);
      Popups[i].Run();
    }
  }
}
function PauseGame(pause){
  if (Array.isArray(pause)){
    Pause = pause[0];
  }
  else {
    Pause = pause;
  }
}
function addValueToArray(value){
  if (Array.isArray(value)){
    newWords.push(value[0]);
  }
  else {
    newWords.push(value);
  }
}
function clearText(TextBox){
  if (Array.isArray(TextBox)){
    TextBox[0].textInBox = "";
  }
  else {
    TextBox.textInBox = "";
  }
} 
function setStringToArray(String){
  let newWordsArray = [];
  let countIndex = 0;
  let wordAdded = null;
  let previousIndexComma = null;
  let string = String;
  if (Array.isArray(string)){
    string = String[0];
  }
  //else {
      for (i in string){
        if (string[i] == ","){ // once your find a comma
          // loop until that point 
          countIndex = i+1;
          if (previousIndexComma == null){
            wordAdded = "";
            for (let j = 0; j < countIndex; j++){
              wordAdded += string[j]
            }
            newWordsArray.push(wordAdded);
          }
          else {
            wordAdded = "";
            for (let j = previousIndexComma; i < countIndex; i++){
              wordAdded += string[j]
            }
            newWordsArray.push(wordAdded);
          }
          previousIndexComma = i;
          // if there is a comma then add just the word to the array
        }
      }
  //}
  return(newWordsArray);
}
// for typing with sharks
function CallWave(number){
  console.log(number+" wave size max");
  // let portionSize = windowHeight;
  // if (num < windowHeight/90){
  //   portionSize = windowHeight/num;
  // }
  // else  {
  //   portionSize = 90;
  // }
  let num = floor(number);
  console.log(num+" number of sharks there should be");
  let rowSpacing = 150;
  let rows = 0;
  let RowLimit = (windowHeight-20)/200;  // max per row
  let SpacingOther = windowHeight/RowLimit;
  let currRowNum = 0;  // position of the next one
  
  for (let i = 0; i < num; i++){
    console.log(i+" this is the nd shark");
    // y = RowLimit-currRowNum
    // if y >= 0 then place according to rows
    // else then increase rows and and place via
    // shark(x,y)
    currRowNum++;
    if (currRowNum > RowLimit){
      currRowNum = 0;
      rows++;
    }
    console.log(rows*rowSpacing+" x position "+currRowNum*SpacingOther+" y position");
    Sharks.push(new Shark(windowWidth+(rows*rowSpacing),currRowNum*SpacingOther+45,returnRandomWord()));
    
    //Sharks.push(new Shark(windowWidth-50,i*portionSize+45,returnRandomWord()));
  }
  console.log(Sharks+" Sharks");
  keyCode = 16;
}
function displayAllSharks(){
  if (Sharks.length > 0){
    // display all sharks
    for (i in Sharks){
      Sharks[i].display();
      Sharks[i].animate();
    }
  }
}
function moveAllSharks(){
  if (Sharks.length > 0){  
    for (i in Sharks){
      Sharks[i].move();
      
    }
  }
}
function checkArrayValueAll(array,value){
  //console.log(array);
  if (array.length > 0){
    for (i in array){
      if (array[i] == value){
        if (i == array.length-1){
          return true;
        }
      }
      else {
        return false;
      }
    }
  }
}
function checkAllSharks(){
  for (i in Sharks){
    if (checkArrayValueAll(Sharks[i].word.lettersTyped,true)){
      continue
    }
    else{
      return false;
    }
  }
  return true;
}
function clear_ZapSharks(value,zap){
      let newLettersTyped;
      for (let j = 0; j < Sharks[value].word.lettersTyped; j++){
        newLettersTyped.push(zap);
      }
      return newLettersTyped;
    
}
function assignValuetoAllSharks(value){
  for (i in Sharks){
    clear_ZapSharks(i);
  }
}
function spawnBubbles(number,topX,bottomX,ySpawn){
  let num = floor(number);

  for (let i = 0; i < num; i++){
    Bubbles.push(new Bubble(random(bottomX,topX),ySpawn,random(5,10),random(-5,-0.2)));
  }
}

// for hangman specifically
function checkWordDone(wordObj){
  for (i in wordObj.lettersTyped){
    if (wordObj.word[i] == " "){
      continue;
    }
    else if (wordObj.lettersTyped[i] == false){
      return false;
    }
  }
  return true;
}
function HangManDisplay(array,point){
  let num = array.length;
  // frame
  let length = 100;
  fill(0);
  stroke(0);
  strokeWeight(6);
  // bottom line - floot
  line(point.x-length,point.y,point.x+length,point.y);
  // tower piece
  let lineHeight = point.y-length*1.5;
  let otherX = point.x-length/2;
  line(otherX,point.y,otherX,lineHeight);
  // top horizontal line
  line (otherX,lineHeight,otherX+length/1.5,lineHeight);
  // connection to head
  line(otherX+length/1.5,lineHeight,otherX+length/1.5,lineHeight+10);

  // head
  if (array.length >= 1){
    noFill();
    ellipse(otherX+length/1.5,lineHeight+30,40,40);
  }
  // body
  if (num >= 2){
    line(otherX+length/1.5,lineHeight+50,otherX+length/1.5,point.y-50);
  }
  // left leg
  if (num >= 3){
    line(otherX+length/1.5,point.y-50,(otherX+length/1.5)-20,point.y-10);
  }
  // right leg
  if (num >= 4){
    line(otherX+length/1.5,point.y-50,(otherX+length/1.5)+20,point.y-10);
  }
  // left arm
  if (num >= 5){
    line((otherX+length/1.5),lineHeight+70,(otherX+length/1.5)-40,lineHeight+40);
  }
  // right arm
  if (num >= 6){
    line((otherX+length/1.5),lineHeight+70,(otherX+length/1.5)+40,lineHeight+40);
  }
    strokeWeight(3);
    textSize(30);
    text("Incorrect Guesses: ",point.x+length+10,point.y-40);
    text(array,point.x+length+10,point.y);
    textSize(12);
  
  strokeWeight(1);
}
function keyCode_Equal(num){
  console.log(num+" num to change to ");
  if (Array.isArray(num)){
    keyCode = num[0];
    key = " ";
  }
  else {
    keyCode = num;
    key = " ";
  }
}
function checkWordObjforLetter(wordObj,letter){
  for (i in wordObj.word){
    if (wordObj.word[i] == letter){
      return true;
    }
  }
  return false;

}
function checkArraySame(array,value){
  for (i in array){
    if (array[i] == value){
      return true;
    }
  }
  return false;
}
function resetHangman(){
  HangManAmtWrong = [];
}

// this returns a corrected array
function sortSharks(array){
  console.log(array);
  let newArray = [];
  for (i in array){
    /*
    if (newArray.length > 0){
      if (array[i].y < newArray[0].y && array[i].x <= newArray[0].x){
        newArray.unshift(array[i]);
      }
      else if (array[i].y >= newArray[newArray.length-1].y && array[i].x >= newArray[newArray.length-1].x){
        newArray.push(array[i]);
      }
      else{
        // go through the array and find the place where it should go
        //for (j in newArrray){
        for (let j = 0; j < newArray.length; j++){
          if (array[i].x >= newArray[j].x && array[i].y < newArray[j].y){
            splice(j,0,array[i]);
            //newArray.splice(j,0,array[i]);
          }
          else if (array[i].x >= newArray[j].x && array[i].y > newArray[j].y){
            newArray.push(array[i]);
          }
        }
      }
    }
    else {
      newArray.push(array[i]);
    }
    */

    // place the first shark
    if (newArray.length > 0){
      // place a shark at the beginning of the array if and only if its y is greater than the shark that is there and its x is less than or equal to it as well
      if (array[i].y < newArray[0].y && array[i].x <= newArray[0].x){
        // add it to the beginning of the array
        newArray.unshift(array[i]);
        continue;
      }
      else {
        for (j in newArray){
          // check if this current shark has either a greater x or a greater y
          if (array[i].y < newArray[j].y && array[i].x <= newArray[j].x){
            // place in front of shark[j]
            splice(newArray,array[i],j-1);
            break;
          }
          else if (array[i].x > newArray[j].x){
            // place afterward
            //splice(j,0,array[i]);
            splice(newArray,array[i],j);
            break;
          }
          
        }
      }
      
      // place a shark in the middle of the array by looping through newArray and checking whats there
      
    }
    else {
      newArray.push(array[i]);
    }

    
  }
  console.log(newArray);
  return (newArray);
}

// functions for screens here
let BackgroundColor = "#ccffff";

// adding words to the library
function NewWordsScreen (BC1,BC2,BC3){
  background(BackgroundColor);

  Buttons[0].reset(ButtonXDefault, 30, ButtonWidthDefault, 50, 'Press to add "'+Buttons[4].textInBox+'" to the library');
  Buttons[0].display(BC1,BC2);
  Buttons[0].press(UnlimitedFunctions,
                3,
                   addValueToArray,
                   1,
                   Buttons[4].textInBox,
                   clearText,
                   1,
                   Buttons[4],
                   localSave,
                   2,
                   Buttons[4].textInBox,
                   saveId,
                  );

  Buttons[1].reset(ButtonXDefault, 150, ButtonWidthDefault, 50,"Save and go Home");
  Buttons[1].display(BC1,BC2);
  //Buttons[1].press(switchScreen,"home");  // commented out temperarily for testing
  Buttons[1].press(localFetch,saveId);
  // get all data from local storage and add the new words
  //localSave(value,id)
  //localFetch(id)
  //newWords
  // the id will be on let saveId = "savedwords"
  if (alreadySaved == "none"){
    //alreadySaved = localFetch(saveId);
  }
  //console.log(alreadySaved);
  //console.log(setStringToArray(alreadySaved));
  Buttons[4].reset(ButtonXDefault, 90, ButtonWidthDefault, 50,"Type a word");
  Buttons[4].display(BC1,BC2);
  Buttons[4].press();

  fill(0);
  stroke(0);
  // make this more official later
  text(newWords+" these are the new words",windowWidth/2-(newWords.length*10-20),250);
  
}
function HomeScreen(BC1, BC2) {
  background(BackgroundColor);
  Buttons[0].reset(ButtonXDefault, 30, ButtonWidthDefault, 50, "How");
  Buttons[0].display(BC1, BC2);
  Buttons[0].press(switchScreen, "how");

  Buttons[1].reset(ButtonXDefault, 90, ButtonWidthDefault, 50, "Hangman");
  Buttons[1].display(BC1, BC2);
  Buttons[1].press(switchScreen, "hangmanselect");

  Buttons[2].reset(ButtonXDefault, 150, ButtonWidthDefault, 50, "Typing with sharks");
  Buttons[2].display(BC1, BC2);
  Buttons[2].press(switchScreen, "typingwithsharksselect");

  //Buttons[3].reset(ButtonXDefault, 210, ButtonWidthDefault, 50, "Settings");
  //Buttons[3].display(BC1,BC2);
  //Buttons[3].press(switchScreen,"about"):

  //Buttons[5].reset(ButtonXDefault, 270, ButtonWidthDefault, 50, "Add New Words to Library");
  //Buttons[5].display(BC1,BC2);
  //Buttons[5].press(switchScreen, "addword");
}
function HowScreen(BC1, BC2) {
  background(BackgroundColor);
  Buttons[0].reset(ButtonXDefault, windowHeight - 180, windowWidth - 50,120, "Home");
  Buttons[0].display(BC1, BC2);
  Buttons[0].press(switchScreen, "home");

  textAlign(CENTER);
  textSize(15);
  fill(0);
  stroke(0);
  text("There are two options to play oon this game, Hangman and Typing with Sharks",0,20,windowWidth,20);
  text("Hangman is a game where a word is chosen and you have six wrong attempts to guess letters in the word",0,60,windowWidth,20);
  text("Typing with Sharks is a game where waves sharks are coming toward you. If you don't",0,90,windowWidth,20);
  text("finish typing all of the sharks before they reach the end of the screen, you lose. This game goes on until you lose ",0,110,windowWidth,20);
  text("getting sharks and surviving scores points",0,130,windowWidth,20);
}
function HangManSelect(BC1, BC2) {
  background(BackgroundColor);
  Buttons[0].reset(ButtonXDefault, windowHeight - 80, windowWidth - 60, 50, "Home");
  Buttons[0].display(BC1, BC2);
  Buttons[0].press(switchScreen, "home");

  Buttons[1].reset(ButtonXDefault, 30, windowWidth - 60, 50, "Random Word");
  Buttons[1].display(BC1, BC2);
  //Buttons[1].press(switchScreen,"hangman");
  Buttons[1].press(
    UnlimitedFunctions,
    3,
    switchScreen,
    1,
    "hangman",
    selectRandomWord,
    0,
    keyCode_Equal,
    1,
    16,
  );

  Buttons[2].reset(
    ButtonXDefault,
    windowHeight / 2 - 25,
    windowWidth - 60,
    50,
    "Custom Word"
  );
  Buttons[2].display(BC1, BC2);
  Buttons[2].press(switchScreen, "hangmancustomword");
}
function HangMan(BC1, BC2, BC3) {
  background(BackgroundColor);

  framePosition = {
    x: windowWidth/2,
    y: windowHeight/3
  };
  fill(0, 0, 0);
  // for testing purposes only
  // text(HangmanWord.word, 100, 100);
  //text(HangManAmtWrong,100,120);
  //text(HangManAmtWrong.length,100,140);
  //console.log(HangManAmtWrong);
  // text(HangmanWord.lettersTyped, 100, 120);
  // text(key.toUpperCase(), 100, 140);
  // text(checkWordDone(HangmanWord),100,160);
  HangManDisplay(HangManAmtWrong,framePosition);
  
  // display of spaces for letters
  //wordPosition.x and .y = windowWidth/2

  // option button
  Buttons[0].reset(10,10,100,50,"Pause");
  Buttons[0].display(BC1,BC2);
  Buttons[0].press(PauseGame,true);

  stroke(0);
  fill(0);

  
  let newTextSize = 20;
  let letterSpacing = newTextSize;
  let yOffSet = 0;
  
  wordPosition.y = windowHeight/2 + yOffSet;
  wordPosition.x = windowWidth/2 - (HangmanWord.word.length * newTextSize);
  
  textSize(newTextSize);
  for (let i = 0; i < HangmanWord.word.length; i++){
    let extraSpace = 0;
    if (HangmanWord.word[i] == "I"){
      extraSpace = newTextSize*.2;
    }
    if (HangmanWord.word[i] != " "){
      if (HangmanWord.lettersTyped[i] == true){
        text(HangmanWord.word[i], wordPosition.x+letterSpacing*i+extraSpace-1, wordPosition.y);
      }
      text("_",wordPosition.x+letterSpacing*i,wordPosition.y);
    }
  }
  textSize(12);
  
  wordType(HangmanWord, false);
  let RealKey = key.toUpperCase();
  if (RealKey != "BACKSPACE" && RealKey != "SHIFT" && key != " "){
    if (!checkWordObjforLetter(HangmanWord,RealKey)){
      if (!checkArraySame(HangManAmtWrong,RealKey)){
        HangManAmtWrong.push(RealKey);
      }
      keyCode = 16;
    }
  }
  //console.log(checkArrayValueAll(HangmanWord.lettersTyped,true));
  if (HangManAmtWrong.length >= 6 || checkArrayValueAll(HangmanWord.lettersTyped,true)) {
    endGame(BC1,BC2,BC3);
  }
}
function HangManCustomWord(BC1, BC2,BC3) {
  background(BackgroundColor);
  Buttons[0].reset(ButtonXDefault, windowHeight - 80, windowWidth - 60, 50, "Home");
  Buttons[0].display(BC1, BC2);
  Buttons[0].press(switchScreen, "home");

  Buttons[1].reset(ButtonXDefault,200,windowWidth-60,100,'Play with "'+Buttons[4].textInBox+'"');
  Buttons[1].display(BC1,BC2);
  if (Buttons[4].textInBox.length > 0){
    Buttons[1].press(
      UnlimitedFunctions,
      3,
      switchScreen,
      1,
      "hangman",
      setHangmanWord,
      1,
      Buttons[4].textInBox,
      keyCode_Equal,
      1,
      16,
      
    );
  }
  else {
    Buttons[1].press(
      createPopupTextBox,
      20,
      400,
      windowWidth-40,
      100,
      "You have to enter a word to start with!",
      100,
    );
  }
  
  
    
  Buttons[4].reset(ButtonXDefault, 100, windowWidth - 60, 50, "Insert a word here");
  Buttons[4].display(BC1,BC2);
  //console.log(Buttons[4]);
  //console.log(Buttons[4].press());
  Buttons[4].press();

  //RunAllPopups(BC1,BC2,BC3);
}
function TypingWithSharksSelect(BC1, BC2,BC3) {
  background(BackgroundColor);

  // button for the home screen
  Buttons[0].reset(ButtonXDefault, windowHeight - 80, windowWidth - 60, 50, "Home");
  Buttons[0].display(BC1, BC2);
  Buttons[0].press(switchScreen, "home");

  Buttons[1].reset(ButtonXDefault,20,windowWidth-60,50,"Play");
  Buttons[1].display(BC1,BC2);
  //Buttons[1].press(switchScreen,"typingwithsharks");
  Buttons[1].press(UnlimitedFunctions,2,switchScreen,1,"typingwithsharks",siftWordLength,0);
  
  Sliders[0].reset(ButtonXDefault,80,windowWidth-60,50,3,11,3,10);
  Sliders[0].display(BC1,BC2,BC3,"The min length of the words");
  Sliders[0].Slide();

  Sliders[1].reset(ButtonXDefault,200,windowWidth-60,50,4,12,5,10);
  Sliders[1].display(BC1,BC2,BC3,"The max length of the words");
  Sliders[1].Slide();

  // slider for min wave size
  Sliders[2].reset(ButtonXDefault,320,windowWidth-60,50,1,10,3,10);
  Sliders[2].display(BC1,BC2,BC3,"The min amount of sharks per wave");
  Sliders[2].Slide();

  Sliders[3].reset(ButtonXDefault,440,windowWidth-60,50,2,26,5,10);
  Sliders[3].display(BC1,BC2,BC3,"The max amount of sharks per wave");
  Sliders[3].Slide();

  minWaveSize = Sliders[2].position;
  maxWaveSize = Sliders[3].position;
  
  WordLengthMin = Sliders[0].position;
  WordLengthMax = Sliders[1].position;
  
  // the min cannot be greater than the max
  if (Sliders[0].position >= Sliders[1].position){
    Sliders[1].position = Sliders[0].position+1;
  }

  if (Sliders[2].position >= Sliders[3].position){
    Sliders[3].position = Sliders[2].position+1;
  }

  
  // button to start the game

  // options include 
  // difficulty - word length
  // time between waves
  // max size of wave
  

  
}
function TypingWithSharks(BC1,BC2,BC3){
  background(18, 61, 161);
  translate(0,-Depth);

  fill(BackgroundColor)
  rect(0,Depth-10,windowWidth,-Depth);
  // depth marker
  for (let i = 0; i < maxDepth; i+=5){
    if (i*20 > Depth-90){
      fill(255,255,255);
      stroke(255,255,255);
      text(i,10,i*20);
      strokeWeight(2);
      line(5,i*20-10,5,i*20+90);
      line(5,i*20-5,7,i*20-5);
      strokeWeight(1);
    }
  }
  translate(0,Depth);

  if (Bubbles.length < 1){
    spawnBubbles(35,windowWidth-10,10,windowHeight);
  }
  else if (Bubbles.length > 1){
    for (i in Bubbles){
      Bubbles[i].display();
      //Bubbles[i].float_reset(windowHeight,0,random(10,windowWidth-10));
      Bubbles[i].y += Bubbles[i].v;
      if (Bubbles[i].y < 0){
        Bubbles[i].y = windowHeight;
      }
    }
  }
  
  fill(0);  // text data for calling waves
  //text(Depth/20,100,120);
  //text(Depth % callWaveEvery,100,100);
  stroke(0);
  textSize(20);
  text("Score: "+score,100,60);
  textSize(12);


  Buttons[0].reset(40,20,50,50,"Pause");
  Buttons[0].display(BC1,BC2);
  Buttons[0].press(PauseGame,!Pause);

  /*
  if (keyCode == 80){
    Depth += 19;
    keyCode = 16;
  }
  */

  // zapper display

  // space to deselect shark
  /*
  if (keyCode == 32 && SelectedShark != "none"){
    //assignValuetoAllSharks(false);
    Sharks[SelectedShark].word.lettersTyped = clear_ZapSharks(SelectedShark,false);
    SelectedShark = "none";
  }
  */
    // move and display all sharks that have been created
  displayAllSharks();

  if (!Pause && !EndGame){
    moveAllSharks();
  
    // logic for typing sharks and typing on the selected shark 
    if (TypingRecovery.RecovTime <= TypingRecovery.time && SelectedShark == "none"){
       TypingRecovery.RecovTime++;
      keyCode = 16;
     }
    
    if (Sharks.length > 0){
      if (SelectedShark == "none"){
      for (i in Sharks){
        if (Sharks[i].word.lettersTyped[0] == false && TypingRecovery.RecovTime > TypingRecovery.time && Sharks[i].x < windowWidth){
          if (key.toUpperCase() == Sharks[i].word.word[0]){
            SelectedShark = i;
            break;
          }
        }
      } 
    }
      else {
      wordType(Sharks[SelectedShark].word,true);
      if (checkArrayValueAll(Sharks[SelectedShark].word.lettersTyped,true) && !keyIsPressed){
        score+= Sharks[SelectedShark].word.word.length;
        SelectedShark = "none";
        key = "SHIFT";
        KeyCode = 16;
        TypingRecovery.RecovTime = 0;
        
        
        //text("Selected Shark",400,Sharks[SelectedShark].y);
      }
    }
    }
  
    // logic for calling waves
    if (Depth > 0 && (Depth/20)%callWaveEvery == 0){
      callWave = true;
    }
    else if (Depth == 2){
      callWave = true;
    }
    
    // if (!callWave && !wavePresent){
    //   Depth++;
    // }
  
    if (callWave && !wavePresent){
      let numOfSharks = floor(random(minWaveSize,maxWaveSize));
      //numOfSharks += 2;
      CallWave(numOfSharks);
      //Sharks = sortSharks(Sharks);
      wavePresent = true;
      callWave = false;
    }
    else if (callWave && wavePresent && (Depth/20)%(callWaveEvery*2) == 0 && !checkAllSharks() && Sharks.length < 30){
      let numOfSharks = floor(random(minWaveSize/2,maxWaveSize/2));
      //numOfSharks += 2;
      CallWave(numOfSharks);
      //Sharks = sortSharks(Sharks);
      wavePresent = true;
      callWave = false;
    }
    
    Depth++;
    if (wavePresent && Sharks.length == 0){
      wavePresent = false;
      callWave = false;
      
    }
  }
  

  // text(Sharks.length,300,100);
  // text(SelectedShark,300,120);
  // text(keyCode,300,140);
  for (i in Sharks){
    if (Sharks[i].x < 0){
      EndGame = true;
    }
  }

  
  for (i in Sharks){
    if (Sharks[i].y > 0){
     break; 
    }
    if (i == Sharks.length-1){
      score += Sharks.length;
      Sharks = [];
      if (maxWaveSize < 30){ 
        maxWaveSize+= 0.4;
      }
      if (callWaveEvery > 20){
        callWaveEvery --;
      }
      if (sharkSpeed < 10){
        sharkSpeed+=0.001;
      }
      if (WordLengthMax < 11){
        WordLengthMax+=0.3;
        updateSharksLibrary();
      }
    }
  }

  if (EndGame){
    endGame(BC1,BC2,BC3);
  }
  
}
function ResetSharks(){
  Depth = -35*20;
  Sharks = [];
  callWave = false;
  wavePresent = false;
  score = 0;
  EndGame = false;
}
function PauseScreen(BC1,BC2,BC3){
  let TopRightX = windowWidth/5;
  let TopRightY = windowHeight/5;
  fill(BC3);
  noStroke();
  rect(TopRightX,TopRightY,windowWidth-2*(TopRightX),windowHeight-2*(TopRightY));
  let ButtonWidth = (windowWidth-2*(TopRightX))-20;
  let ButtonHeight = (windowHeight-2*(TopRightY))/10;
  Buttons[0].reset(TopRightX+10,TopRightY+10,ButtonWidth,ButtonHeight,"Resume");
  Buttons[0].display(BC1,BC2);
  Buttons[0].press(PauseGame,!Pause);
  Buttons[1].reset(TopRightX+10,TopRightY+ButtonHeight+20,ButtonWidth,ButtonHeight,"Home");
  Buttons[1].display(BC1,BC2);
  if (screen == "typingwithsharks"){
    Buttons[1].press(UnlimitedFunctions,3,switchScreen,1,"home",PauseGame,1,false,ResetSharks,0);
    Buttons[2].reset(TopRightX+10,TopRightY+(2*(ButtonHeight+20)),ButtonWidth,ButtonHeight,"Quit");
    Buttons[2].display(BC1,BC2);
    Buttons[2].press(UnlimitedFunctions,3,switchScreen,1,"typingwithsharksselect",ResetSharks,0,PauseGame,1,false);
  }
  else {
    Buttons[1].press(UnlimitedFunctions,3,switchScreen,1,"home",PauseGame,1,false,resetHangman,0);
  }

  
}
function endGame(BC1,BC2,BC3){
  let TopRightX = windowWidth/5;
  let TopRightY = windowHeight/5;
  fill(BC3);
  noStroke();
  rect(TopRightX,TopRightY,windowWidth-2*(TopRightX),windowHeight-2*(TopRightY));
  let ButtonWidth = (windowWidth-2*(TopRightX))-20;
  let ButtonHeight = (windowHeight-2*(TopRightY))/10;
  //Buttons[0].reset(TopRightX+10,TopRightY+10,(windowWidth-2*(TopRightX))-20,(windowHeight-2*(TopRightY))/10,"Resume");
  //Buttons[0].display(BC1,BC2);
  //Buttons[0].press(PauseGame,!Pause);
  Buttons[1].reset(TopRightX+10,TopRightY+10,(windowWidth-2*(TopRightX))-20,(windowHeight-2*(TopRightY))/10,"Home");
  Buttons[1].display(BC1,BC2);
  if (screen == "typingwithsharks"){
    Buttons[1].press(UnlimitedFunctions,3,switchScreen,1,"home",PauseGame,1,false,ResetSharks,0);
    textSize(30);
    fill(0);
    stroke(0);
    text("Your Final Score was: "+score,TopRightX+100,TopRightY+(windowHeight-2*(TopRightY))/2);
    Buttons[2].reset(TopRightX+10,TopRightY+(2*(ButtonHeight+20)),ButtonWidth,ButtonHeight,"Quit");
    Buttons[2].display(BC1,BC2);
    Buttons[2].press(UnlimitedFunctions,3,switchScreen,1,"typingwithsharksselect",ResetSharks,0,PauseGame,1,false);
  }
  else {
    Buttons[1].press(UnlimitedFunctions,3,switchScreen,1,"home",PauseGame,1,false,resetHangman,
                      0,);

    // new random word
    Buttons[0].reset(TopRightX+10,TopRightY+80,ButtonWidth,ButtonHeight,"New Random");
    Buttons[0].display(BC1,BC2);
    Buttons[0].press(UnlimitedFunctions,
      3,
      selectRandomWord,
      0,
      keyCode_Equal,
      1,
      16,
      resetHangman,
      0,
      );
    Buttons[3].reset(TopRightX+10,TopRightY+350,ButtonWidth,ButtonHeight,"New Custom Word");
    Buttons[3].display(BC1,BC2);
    Buttons[3].press(UnlimitedFunctions,
                     2,
                     switchScreen,
                     1,
                     "hangmancustomword",
                     resetHangman,
                     0,
                    );
    // if win
    //HangmanWord
    textSize(30);
    if (checkArrayValueAll(HangmanWord.lettersTyped,true)){
      text("You Won!",TopRightX+100,TopRightY+(windowHeight-2*(TopRightY))/2-25);
      text("You Guessed the Correct Word: "+HangmanWord.word,TopRightX+100,TopRightY+(windowHeight-2*(TopRightY))/2);
    }
    // if lose
    else {
      text("You Lost!",TopRightX+100,TopRightY+(windowHeight-2*(TopRightY))/2-25);
      text("The Correct word was: "+HangmanWord.word,TopRightX+100,TopRightY+(windowHeight-2*(TopRightY))/2);
      
    }
    textSize(12);
  }
  

  

  textSize(12);


}
function SettingsScreen(BC1,BC2,BC3){}

function draw() {
  if (pastScreenWidth == null || pastScreenWidth != ScreenWidth){
    ScreenWidth = windowWidth;
    ScreenHeight = windowHeight;
    ButtonXDefault = windowWidth/40;
    ButtonYDefault = windowHeight/25;
    ButtonYSpacingDefault = ButtonYDefault/10;
    ButtonWidthDefault = windowWidth-(2*ButtonXDefault);
    // each screen will by default fit 8 buttons
    ButtonHeightDefault = (ScreenHeight/8)-ButtonYSpacingDefault;
  }
  ScreenWidth = windowWidth;
  allowButtonPressing();
  switch (screen) {
    case "hangmancustomword":
      HangManCustomWord(PresetColors.main, PresetColors.accent,PresetColors.popuptextbox);
      break;
    case "hangmanselect":
      HangManSelect(PresetColors.main, PresetColors.accent);
      break;
    case "hangman":
      HangMan(PresetColors.main, PresetColors.accent,PresetColors.grey);
      break;
    case "typingwithsharksselect":
      TypingWithSharksSelect(PresetColors.main, PresetColors.accent,PresetColors.grey);
      break;
    case "typingwithsharks":
      TypingWithSharks(PresetColors.main, PresetColors.accent,PresetColors.grey);
      break;
    case "how":
      HowScreen(PresetColors.main, PresetColors.accent);
      break;
    case "addword":
      NewWordsScreen(PresetColors.main, PresetColors.accent,PresetColors.grey);
      break;
    default:
      HomeScreen(PresetColors.main, PresetColors.accent);
      break;
  }
  RunAllPopups(PresetColors.main, PresetColors.accent,PresetColors.popuptextbox);
  if (Pause){
    PauseScreen(PresetColors.main, PresetColors.accent,PresetColors.grey);
  }
}
