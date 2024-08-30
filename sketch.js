let projSpeed = 5;
let enemySpeed = 2;
let projectile, badGuy;
let time = 0;
let score = 0;

function  preload(){

}
function setup() {
	Canvas('16:9');
	noCursor();
	frameRate(60);
  turret = new Sprite();
  turret.fill = 'orange';
  turret.diameter = 90;
  enemySpawn();
}
function draw() {
	clear();
	background(0,0,75);
  turret.x = 0;
  turret.y = mouseY;
  fill('orange')
	stroke('orange')
	rect(0, mouseY-15, 90, 30)
	stroke('black');
    fill('black');
    textSize(10);
    textFont('Comic Sans MS')
    text(score, 50, mouseY+5)
    circle(90, mouseY, 30)

    if(frameCount === 60){
    frameCount = 0;
    time++
    }
    if(time === 4){
    time = 0;
    enemySpawn();
    }
    if(mouse.presses()){
      projectile = new Sprite();
      projectile.color = 'grey';
      projectile.stroke = 'black';
      projectile.diameter = 30;
      projectile.speed = projSpeed;
      projectile.y = mouseY;
      projectile.x = 90;
      projectile.mass = 5000;
      projectile.collided(badGuy, scoreUp)
    }
}
function enemySpawn(){
  for(let i = 1; i < random(1,3); i++){
    badGuy = new Sprite();
    badGuy.diameter = 30;
    badGuy.x = canvas.w + (random(50, 100))
    badGuy.y = random(50, canvas.h-50)
    badGuy.direction = 180;
    badGuy.speed = enemySpeed;
  }
}
function scoreUp(){
  projectile.remove;
  badGuy.remove;
  score++;
}
