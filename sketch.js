let projSpeed = 5;
let projectile, badGuy, proj, enemy;
let turretImg;
let boomX = -500;
let boomY = 0;
let enemyY;
let time = 0;
let score = 0;
let lives = 3;

function  preload(){
  turretImg = loadImage('turret.png')
}
function setup() {
	Canvas('16:9');
	noCursor();
	frameRate(60);
  //the wall you defend
  wall = new Sprite();
  wall.allowSleeping = false;
  wall.collider = 'static'
  wall.x = -5;
  wall.y = canvas.hh;
  wall.height = canvas.h;
  wall.width = 50;
  wall.stroke = 'black';
  wall.fill = 'orange';

  //turret
  turret = new Sprite();
  turret.image = turretImg;
  turret.image.scale = 1;
  turret.collider = 'none';
  turret.fill = 'orange';
  turret.stroke = 'black';
  turret.x = 10;
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
  wall.collided(enemy, wallHurt);
}
function draw() {
	clear();
	background(0,0,75);
  turret.y = mouseY;
  stroke('white');
  fill('white');
  textSize(25);
  textFont('Comic Sans MS')
  text(score, 90, 30)
  text(lives, 30, 30)
  
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
  projectile.x = 65;

}
function enemySpawn(){
  for(let i = 1; i < random(1,4); i++){
    badGuy = new enemy.Sprite();
    badGuy.x = canvas.w + (random(50, 150));
    badGuy.y = enemyY;
  }
}
function scoreUp(projectile, badGuy){
  boomX = badGuy.x;
  boomY = badGuy.y;
  projectile.remove();
  badGuy.remove();
  score++;
}
function wallHurt(wall, badGuy){
  wall.fill = 'red';
  badGuy.remove();
  lives--;
  wall.fill = 'orange';
}