var p5_mic, p5_recorder, p5_soundFile;

var savedWord;
var dancingWords = [];
var dw;

var state = 0; 
var ding; 

var bg = 20; 

function preload() {
    ding = loadSound('../ding.mp3'); // delete sound effect 
}

function setup() {
  createCanvas(2000,2000);
  fill(0);
  ding.setVolume(0.1);


  p5_mic = new p5.AudioIn();
  p5_mic.start();
  p5_recorder = new p5.SoundRecorder();
  p5_recorder.setInput(p5_mic);

  fft = new p5.FFT();
  fft.setInput(p5_mic);
}

function draw(){
  
  background(0);

  fill(255);
  // vol = p5_mic.getLevel();
 
  for(var i = 0; i < dancingWords.length; i++){

     dancingWords[i].brownian();
  }
 
//FFT  -- Background from mic 
  // plot FFT.analyze() frequency analysis on the canvas
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length/20; i++) {
    noStroke();
    fill(spectrum[i]/bg-10, spectrum[i]/40, spectrum[i]);
    var x = map(i, 0, spectrum.length/13, 0, width);
    var h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height, spectrum.length/40, -h);
  }

}

function showSavedWord(word){
  fill(255);
  textSize(14);
  textFont("PxPlus IBM VGA8");

  //generate floating words 
  var tempSpan = createSpan(word).addClass('floatingText');
  //delete floating words 
  tempSpan.mousePressed(deleteWord);
 
  dw = new DanceSpan(tempSpan, random(window.innerWidth), random(500,window.innerHeight));
  // console.log(width +"|"+ height);
  dancingWords.push(dw);
    
}

function deleteWord(){
  ding.play();
  this.remove();
}

//floating words 
function DanceSpan(element, x, y) {
  element.position(x, y);
  
  this.brownian = function() {
    x += random(-2, 2);
    y += random(-2, 2);
    element.position(x, y);
  };

};



