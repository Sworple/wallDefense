let projSpeed = 5;
let enemySpeed = 2;
let projectile, badGuy, proj, enemy;
let time = 0;
let score = 0;

function  preload(){

}
function setup() {
	Canvas('16:9');
	noCursor();
	frameRate(60);
  //turret
  turret = new Sprite();
  turret.fill = 'orange';
  turret.diameter = 90;

  //projectile setup
  proj = new Group();
  proj.color = 'grey';
  proj.stroke = 'black';
  proj.diameter = 30;
  proj.speed = projSpeed;
  proj.mass = 500;


  enemy = new Group();
  enemy.diameter = 30;
  enemy.direction = 180;
  enemy.speed = enemySpeed;

  //not calling enemySpawn in the setup breaks the game.
  //don't ask me how, i don't know either.
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
      projectileSpawn();
    }
}
function projectileSpawn(){
  projectile = new proj.Sprite();
  projectile.y = mouseY;
  projectile.x = 90;

}
function enemySpawn(){
  for(let i = 1; i < random(1,3); i++){
    badGuy = new enemy.Sprite();
    badGuy.x = canvas.w + (random(50, 100));
    badGuy.y = random(50, canvas.h-50);
  }
}
function scoreUp(){
  projectile.remove();
  badGuy.remove();
  score++;
}