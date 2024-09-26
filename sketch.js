let projectile, proj, enemy, badGuy, wall, topWall, bottomWall, crosshair;
let turretImg, projImg, enemyImg, crosshairImg;
let boomX = -500, boomY = 0;
let gameOverX = -500;
let isGameOver = false;
let time = 0, time2 = 0, time3 = 0;
let score = 0;
let lives = 3;
let cooldown = 0, cooldownAmount = 1.5;
let projSpeed = 7.5, enemySpeed = 0.5;
let highScore;
let spawnAmount = 1;

function  preload(){
  turretImg = loadImage('assets/turret.png')
  projImg = loadImage('assets/fireball.png')
  enemyImg = loadImage('assets/explosive.png')
  crosshairImg = loadImage('assets/crosshair.png')
}
function setup() {
	Canvas(650, 350, 'fullscreen');
	frameRate(60);
  noCursor();
  highScore = getItem('highScore');
  world.allowSleeping = false;

  //the wall you defend
  wall = new Sprite(-5, canvas.hh, 50, canvas.h, 'static');
  wall.allowSleeping = false;
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

  //the spin-cooldown crosshair
  crosshair = new Sprite(crosshairImg, canvas.hw, canvas.hh, 'none');
  crosshair.pixelPerfect = 'true';

  //turret
  turret = new Sprite(turretImg, 10, canvas.hh, 90, 'none');
  turret.pixelPerfect = 'true';

  //fireball setup
  proj = new Group();
  proj.image = projImg;
  proj.scale = 0.5;
  proj.rotationSpeed = 10;
  proj.diameter = 64;
  proj.x = 65;
  proj.vel.x = projSpeed;
  //need enemies to not fly around as much when hit
  proj.mass = 0.75;

  //enemy setup
  enemy = new Group();
  enemy.image = enemyImg;
  enemy.scale = 0.9;
  enemy.isSuperFast = true;
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
	background(0, 51, 102);

  turret.y = mouseY;
  crosshair.x = mouseX;
  crosshair.y = mouseY;

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
  //color set by gameOver text
  circle(boomX, boomY, 100);
  boomX = -500;

  if(frameCount == 15 & isGameOver === false){
    frameCount = 0;
    //pause the timer system when in shop
      time+= 0.25;
      time2+= 0.25;
      time3+= 0.25;
      if(time == 3){
        time = 0;
        enemySpawn();
      }
      if(time2 == 5){
        time2 = 0;
        enemySpeed += 0.25;
      }
      if(time3 == 20){
        time3 = 0;
        if(spawmAmount < 6){
          spawnAmount += 1;
        }
        if(cooldownAmount > 0){
          cooldownAmount -= 0.25
        }
      }
      if(cooldown > 0){
        cooldown -= 0.25;
      }
    }
  if(mouse.presses()){
    if(lives > 0 & isGameOver === false & cooldown == 0) {
      projectileSpawn();
      console.log('projectileSpawn')
    }
    if(lives == 0 & isGameOver === true){
      restart();
      console.log('restart')
    }
  }
  if(kb.presses('z')){
    enemySpawn();
    console.log('debugEnemySpawn')
  }
  if(kb.x >= 30){
    lifeLost()
    console.log('debugLifeLost')
  }
}
function projectileSpawn(){
  projectile = new proj.Sprite();
  projectile.y = mouseY;
  cooldown = cooldownAmount;
}
function enemySpawn(){
  for(let i = 0; i < spawnAmount; i++){
    badGuy = new enemy.Sprite();  
    badGuy.x = canvas.w + (random(50, 150));
    badGuy.y = random(canvas.h-50, 50);
    badGuy.speed = enemySpeed;
  }
}
function enemyHit(projectile, badGuy){
  boomX = badGuy.x;
  boomY = badGuy.y;
  projectile.remove();
  badGuy.remove();
  score++;
}
function wallHurt(wall, badGuy){
  badGuy.remove();
  lifeLost();
}
function gameOver(){
  gameOverX = canvas.hw;
  if(highScore < score){
    highScore = score;
  }
  isGameOver = true;
  enemySpeed = 0;
  storeItem('highScore', highScore)
  enemy.removeAll();
  proj.removeAll();
}
function restart(){
  turret.remove();
  wall.remove();
  topWall.remove();
  bottomWall.remove();
  crosshair.remove();
  setup();
  gameOverX = -500; 
  isGameOver = false;
  frameCount = 0;
  enemySpeed = 0.5;
  time = 0;
  score = 0;
  lives = 3;
}
function lifeLost(){
    if(lives > 0){
      lives -= 1;
    }
    if (lives == 3){
      wall.stroke = 'black';
      wall.fill = 'orange'
    }
    if (lives == 2){
      wall.stroke = 'red';
      wall.fill = 'orange'
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