let projSpeed = 5;
let projectile, proj, enemy, badGuy;
let turretImg;
let boomX = -500;
let boomY = 0;
let gameOverX = -500;
let isGameOver = false;
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
  turret.pixelPerfect = true;
  turret.fill = 'orange';
  turret.stroke = 'black';
  turret.x = 10;
  turret.diameter = 90;

  //projectile setup
  proj = new Group();
  proj.image = '➡️';
  proj.image.scale = 3;
  proj.color = 'grey';
  proj.stroke = 'black';
  proj.diameter = 30;
  proj.x = 65;
  proj.speed = projSpeed;
  proj.mass = 500;

  //enemy
  enemy = new Group();
  enemy.image = '💣';
  enemy.image.scale = 5;
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
  stroke('red');
  fill('red');
  text('game over', gameOverX, canvas.hh)
  
  //explosion
  stroke('red');
  fill('red');
  circle(boomX, boomY, 100);

  if(frameCount == 60 & isGameOver === false){
    frameCount = 0;
    time++
    if(time == 3){
      time = 0;
      enemySpawn();
    }
  }
  if(mouse.presses() & lives > 0){
    projectileSpawn();
  }
  boomX = -500;
}
function projectileSpawn(){
  projectile = new proj.Sprite();
  projectile.y = mouseY;
}
function enemySpawn(){
  for(let i = 1; i < random(1,4); i++){
    badGuy = new enemy.Sprite();
    badGuy.x = canvas.w + (random(50, 150));
    badGuy.y = random(canvas.h-50, 0);
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
  badGuy.remove();
  if(lives > 0){
    lives -= 1;
  }
  if(lives == 0){
    gameOver()
  }
}
function gameOver(){
  gameOverX = canvas.hw;
  isGameOver = true;
  turret.remove();
  wall.remove();
  enemy.remove();
}