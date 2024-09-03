let projSpeed = 5;
let projectile, badGuy, proj, enemy;
let turretImg;
let boomX = -500;
let boomY = 0;
let time = 0;
let score = 0;
let lives = 3;

function  preload(){
  turretImg = loadImage('/assets/turret.png')
}
function setup() {
	Canvas('16:9');
	noCursor();
	frameRate(60);
  //the wall you defend
  wall = new Sprite();

  //turret
  turret = new Sprite();
  turret.image;
  turret.collider = 'none';
  turret.fill = 'orange';
  turret.stroke = 'black';
  turret.diameter = 90;

  //projectile setup
  proj = new Group();
  proj.color = 'grey';
  proj.stroke = 'black';
  proj.diameter = 30;
  proj.speed = projSpeed;
  proj.mass = 500;

  enemy = new Group();
  enemy.stroke = 'black';
  enemy.diameter = 35;
  enemy.direction = 180;
  enemy.speed = random(1, 4);

  enemySpawn();

  proj.collided(enemy, scoreUp);
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
  circle(90, mouseY, 30);
  fill('white');
  textSize(25);
  textFont('Comic Sans MS')
  text(score, 20, 30)
  
  //explosion
  stroke('red');
  fill('red');
  circle(boomX, boomY, 100);

  if(frameCount == 60){
    frameCount = 0;
    time++
  }
  if(time === 2){
    time = 0;
    enemySpawn();
  }
  if(mouse.presses()){
    projectileSpawn();
  }
  boomX = -500;
}
function projectileSpawn(){
  projectile = new proj.Sprite();
  projectile.y = mouseY;
  projectile.x = 90;

}
function enemySpawn(){
  for(let i = 1; i < random(1,4); i++){
    badGuy = new enemy.Sprite();
    badGuy.x = canvas.w + (random(50, 100));
    badGuy.y = random(50, canvas.h-50);
  }
}
function scoreUp(projectile, badGuy){
  boomX = badGuy.x;
  boomY = badGuy.y;
  projectile.remove();
  badGuy.remove();
  score++;
}