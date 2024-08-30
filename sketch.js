let projX = 0;
let projSpeed = 7;
let projActive = false;
let time = 0;
let enemySpeed = 2;

function  preload(){

}
function setup() {
	Canvas('16:9');
	noCursor();
	frameRate(60);
  turret = new Sprite();
  turret.fill = 'orange';
  turret.diameter = 90;
}
function draw() {
	clear();
	background(0,0,75);
  //the turret itself

  turret.x = 0;
  turret.y = mouseY;
	stroke('orange')
	rect(0, mouseY-15, 90, 30)
	stroke('black');
    fill('black');
    circle(90, mouseY, 30)

    if(frameCount === 60){
    frameCount = 0;
    time++
    }
    if(time === 4){
    time = 0;
    enemySpawn();
    }
    if(mouseIsPressed === true){
      projectile = new Sprite();
      projectile.color = 'grey';
      projectile.stroke = 'black';
      projectile.diameter = 30;
      projX = 85;
    }
    if(projX = 85){
      projectile.y = mouseY;
    }
    if(projX >= canvas.w+40){
      projectile = remove();
    }
}

function enemySpawn(){
  for(let i = 1; i < random(1,3); i++){
    badGuy = new Sprite();
    badGuy.diameter = 30;
    badGuy.x = canvas.w + (random(50, 100))
    badGuy.y = random(50, canvas.h-50)
  }
}
