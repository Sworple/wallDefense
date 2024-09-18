let projSpeed = 5;
let projectile, proj, enemy, badGuy, wall, topWall, bottomWall;
let turretImg, projImg, enemyImg;
let boomX = -500;
let boomY = 0;
let gameOverX = -500;
let isGameOver = false;
let inShop = false;
let time = 0;
let time2 = 0;
let score = 0;
let lives = 3;
let projDamage = 1;
let highScore;
let spawnAmount = 1;
let badGuyHealth = 1;

function  preload(){
  turretImg = loadImage('turret.png')
  projImg = loadImage('fireball.png')
  enemyImg = loadImage('explosive.png')
}
function setup() {
	Canvas('16:9');
	frameRate(60);
  //add sprite cursor in place of this comment
  highScore = getItem('highScore');
  world.allowSleeping = false;

  //the wall you defend
  wall = new Sprite();
  wall.allowSleeping = false;
  wall.collider = 'static'
  wall.x = -5;
  wall.y = canvas.hh;
  wall.height = canvas.h;
  wall.width = 50;
  wall.stroke = 'black';
  wall.strokeWeight = 5;
  wall.fill = 'orange';
  
  //top and bottom walls 
  //stops the enemies from going out of bounds
  topWall = new Sprite(canvas.hw, 0, canvas.w + 50, 10, 'static');
  topWall.stroke = 'black';
  topWall.fill = 'black';
  bottomWall = new Sprite(canvas.hw, canvas.h, canvas.w + 50, 10, 'static');
  bottomWall.stroke = 'black';
  bottomWall.fill = 'black';

  //turret that spits fireballs
  turret = new Sprite();
  turret.image = turretImg;
  turret.collider = 'none';
  turret.pixelPerfect = true;
  turret.fill = 'orange';
  turret.stroke = 'black';
  turret.x = 10;
  turret.y = canvas.hh;
  turret.diameter = 90;
  turret.mouse.hovers = 
  turret.mouse.presses

  //fireball setup
  proj = new Group();
  proj.image = projImg;
  proj.scale = 0.5;
  proj.rotationSpeed = 10;
  proj.diameter = 64;
  proj.x = 65;
  proj.vel.x = projSpeed;
  //enemy has more than 1 health, need them to not fly around when hit
  proj.mass = 1;

  //enemy setup
  enemy = new Group();
  enemy.image = enemyImg;
  enemy.scale = 0.9;
  enemy.image.offset.y = -1
  enemy.image.offset.x = 1;
  enemy.diameter = 64;
  enemy.direction = 180;
  proj.collided(enemy, enemyHit);
  wall.collided(enemy, wallHurt);
  enemySpawn();
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
  text(`score: ${score}`, 30, canvas.h-50);
  text(`highscore: ${highScore}`, 30, canvas.h-25)
  text(`lives: ${lives}`, 30, 25);
  stroke('red');
  fill('red');
  textAlign(CENTER, CENTER);
  text('game over', gameOverX, canvas.hh);
  text(`score: ${score}`, gameOverX, canvas.hh+100);
  text(`highscore: ${highScore}`, gameOverX, canvas.hh+50);
  
  //explosion
  //color is already set by the gameOver text
  circle(boomX, boomY, 100);
  boomX = -500;

  if(frameCount == 60 & isGameOver === false){
    frameCount = 0;
    //pause the timer system when in shop
    if(inShop === false){
      time++
      time2++
      if(time == 3){
        time = 0;
        enemySpawn();
      }
      if(time2 == random(3,7)){
        enemyHealth++;
      }
    }
  }
  //prevent use of shooting/restarting/debug keys when in shop
  if(keyboard.presses('space')){
    if(inShop === false){
      openShop()
    }
    else{
      closeShop()
    }
  }
  if(mouse.presses() | keyboard.presses(' ') & inShop === false){
    if(mouse.presses() & lives > 0 & isGameOver === false ) {
      projectileSpawn();
      console.log('projectileSpawn')
    }
    if(mouse.presses() & lives == 0 & isGameOver === true){
      restart();
      console.log('restart')
    }
    if(kb.presses('z')){
      enemySpawn();
      console.log('enemySpawn')
    }
    if(kb.x >= 30){
      lifeLost()
      console.log('lifeLost')
    }
  }
}
function projectileSpawn(){
  projectile = new proj.Sprite();
  projectile.y = mouseY;
}
function enemySpawn(){
  for(let i = 1; i < random(1,spawnAmount); i++){
    badGuy = new enemy.Sprite();  
    badGuy.x = canvas.w + (random(50, 150));
    badGuy.y = random(canvas.h-50, 50);
    badGuy.speed = random(1.5,3.5);
  }
}
function enemyHit(projectile, badGuy){
  boomX = badGuy.x;
  boomY = badGuy.y;
  projectile.remove();
  badGuy.remove()
  score++;
}
function wallHurt(wall, badGuy){
  badGuy.remove();
  lifeLost();
}
function openShop(){
  
  inShop = true;
}
function closeShop(){
  
  inShop = false;
}
function gameOver(){
  gameOverX = canvas.hw;
  if(highScore < score){
    highScore = score;
  }
  isGameOver = true;
  storeItem('highScore', highScore)
  enemy.removeAll();
  proj.removeAll();
}
function restart(){
  turret.remove();
  wall.remove();
  topWall.remove();
  bottomWall.remove();
  setup();
  gameOverX = -500; 
  isGameOver = false;
  frameCount = 0;
  time = 0;
  score = 0;
  lives = 3;
}
function lifeLost(){
    if(lives > 0){
      lives -= 1;
    }
    if (lives == 2){
      wall.stroke = 'red';
    }
    if (lives == 1){
      wall.stroke = 'red';
      wall.fill = 'red';
    }
    if (lives == 0){
      wall.stroke = 'black';
      wall.fill = 'black';
      gameOver();
    }
  }