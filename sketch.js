let projSpeed = 5;
let projectile, proj, enemy, badGuy;
let projScale = 3;
let enemyScale = 5;
let turretImg;
let boomX = -500;
let boomY = 0;
let gameOverX = -500;
let isGameOver = false;
let inShop = false;
let time = 0;
let score = 0;
let lives = 3;
let highScore;

function  preload(){
  turretImg = loadImage('turret.png')
}
function setup() {
	Canvas('16:9');
	noCursor();
	frameRate(60);
  highScore = getItem('highScore');

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

  //turret that spits fireballs
  turret = new Sprite();
  turret.image = turretImg;
  turret.collider = 'none';
  turret.pixelPerfect = true;
  turret.fill = 'orange';
  turret.stroke = 'black';
  turret.x = 10;
  turret.diameter = 90;

  //fireball setup
  proj = new Group();
  proj.image = '🔥';
  proj.image.scale = projScale;
  proj.rotationSpeed = 40;
  proj.diameter = 30;
  proj.x = 65;
  proj.vel.x = projSpeed;
  proj.mass = 500;

  //enemy setup
  enemy = new Group();
  enemy.image = '💣';
  enemy.image.scale = enemyScale;
  enemy.image.offset.y = -1
  enemy.image.offset.x = 1;
  enemy.stroke = 'black';
  enemy.diameter = 50;
  enemy.direction = 180;

  enemySpawn();

  proj.collided(enemy, scoreUp);
  wall.collided(enemy, wallHurt);
  projScale = 1;
  enemyScale = 1;
}
function draw() {
	clear();
	background(0,0,75);
  turret.y = mouseY;
  stroke('white');
  fill('white');
  textSize(25);
  textAlign(LEFT, CENTER);
  textFont('Comic Sans MS');
  text(`score: ${score}`, 30, canvas.h-45);
  text(`highscore: ${highScore}`, 30, canvas.h-20)
  text(`lives: ${lives}`, 30, 20);
  stroke('red');
  fill('red');
  textAlign(CENTER, CENTER);
  text('game over', gameOverX, canvas.hh);
  text(`score: ${score}`, gameOverX, canvas.hh+100);
  text(`highscore: ${highScore}`, gameOverX, canvas.hh+50);
  
  //explosion
  //color is already set by the gameOver text
  circle(boomX, boomY, 100);

  if(frameCount == 60 & isGameOver === false){
    frameCount = 0;
    //pause the timer system when in shop
    if(inShop === false){
      time++
      if(time == 3){
        time = 0;
        enemySpawn();
      }
    }
  }
  if(mouse.presses()){
    if(lives > 0 & isGameOver === false) {
      projectileSpawn();
    }
    if(lives == 0 & isGameOver === true){
      restart();
    }
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
    badGuy.speed = random(1,4);
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
  highScore = score;
  isGameOver = true;
  storeItem('highScore', highScore)
  enemy.remove();
  proj.remove();
}
function restart(){
  setup();
  gameOverX = -500; 
  isGameOver = false;
  frameCount = 0;
  time = 0;
  score = 0;
  lives = 3;
}