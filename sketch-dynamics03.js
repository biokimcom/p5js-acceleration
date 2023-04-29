var img;
let sliderv, slidera;
var distance = [];
var vel = [];
var acc = [];
let pause = false; 
var preX=0;


function setup() {
  createCanvas(1000, 700);
  img = createImg("car.png");
  img.hide();
  img.size(88,50);
  
  car = new mover(0,100);
  
  sliderv = createSlider(-2, 2, 0,0.2);
  sliderv.position(20, 50);
  sliderv.style('width', '150px');
  
  slidera = createSlider(-.1, .1, 0,0.01);
  slidera.position(200, 50);
  slidera.style('width', '150px');
  
  var drawButton = createButton("Reset");
  drawButton.position(400,50);
  drawButton.mousePressed(resetSketch);
  
  var drawButton = createButton("Pause or Resume");
  drawButton.position(500,50);
  drawButton.mousePressed(pauseOrresume);
}


function resetSketch() {
  background(245);
  car = new mover(0,100);
  distance = [];
  vel = [];
  acc = [];
  
  sliderv.remove();
  sliderv = createSlider(-3, 3, 0,0.2);
  sliderv.position(20, 50);
  sliderv.style('width', '150px');
  slidera.remove();
  slidera = createSlider(-.05, .05, 0,0.01);
  slidera.position(200, 50);
  slidera.style('width', '150px');
    
  pause = false;
  
}

function pauseOrresume() {
  if (pause) {
    pause = false;
  } else {
    pause = true;
  }
}

function draw() {
  background(245);
  strokeWeight(0.5); stroke(0);
  text('Dynamics: programmed by JKim',10,690);
  text('Initial Velocity',30,45); 
  text('Acceleration',210,45);
  strokeWeight(1); stroke(0);
  line(0,153,width,153);
  line(95,50,95,75); text('-       +',80,75)
  line(275,50,275,75); text('-       +',260,75)
  
  stroke(122,122,0);
  line(10,350,width,350); 
  line(10,350,10,250);
  text('Distance',5,245); text('Time',width-50,360);
  line(10,500,width,500);
  line(10,500,10,400);
  text('Velocity',5,395); text('Time',width-50,510);
  line(10,650,width,650);
  line(10,650,10,550);
  text('Acceleration',5,545);text('Time',width-50,660);
  
  if (!pause) {
    car.move();
    text('Ready...', 500,45);
  } else{
    text('Paused...', 500,45); 
  }
  car.display();
  preX = car.location.x ;
  car.graph();
}


class mover {
  constructor(px,py) {
    this.x = px;
    this.y = py;
    this.location = createVector(px,py);
    this.velocity = 0;
    this.acceleration = 0;
  }
  
  move() {
    let initvelocity = sliderv.value();
    this.velocity = this.velocity + slidera.value();
    this.location.x = this.location.x + 0.5*(initvelocity + this.velocity);
    if (this.location.x != preX){
        vel.push(this.velocity+initvelocity);
        acc.push(slidera.value());
        distance.push(this.location.x);
    }
  }
  
  display() {  
    image(img, this.location.x,this.location.y); 
  }
  
  graph() {
    let g1x=10, scalex=0.6, scaley=0.2;
    for (var i=0; i<distance.length; i++) {
      stroke(0); strokeWeight(2);
      line(i*scalex+g1x,350-distance[i]*scaley,(i+1)*scalex+g1x,350-distance[i+1]*scaley);
      stroke('red');
      line(i*scalex+g1x,500-vel[i]*10,(i+1)*scalex+g1x,500-vel[i+1]*10);
      stroke('blue');
      line(i*scalex+g1x,650-acc[i]*800,(i+1)*scalex+g1x,650-acc[i+1]*800);
    }
  }
}
