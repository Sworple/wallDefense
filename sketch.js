let projectileX = 0;
let projectileSpeed = 7;
let projectileVelocity = 0;
let projectileActive = false;
let cooldown = 0;
let time = 0;
let enemy = new Group();
let enemySpeed = 2;

function  preload(){

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  frameRate(60);
  enemy.sprite
}
function draw() {
  clear();

  background(0,0,75);
  //the turret itself
  fill('orange')
  circle(0, mouseY, 90)
  stroke('orange')
  rect(0, mouseY-15, 90, 30)
  stroke('black');
  fill('black');
  circle(90, mouseY, 30)
  textFont('Comic Sans MS')
  textSize(15)
  text(cooldown, 15, mouseY+5)

  if(frameCount === 60){
    frameCount = 0;
    time++
    if(cooldown > 0){
      cooldown -= 1;
    }
  }
  if(time === 4){
    time = 0;
    enemySpawn();
  }
  if(cooldown === 0 & mouseIsPressed === true & projectileActive === false){
      projectileVelocity = mouseY;
      projectileX = 85;
      projectileActive = true;
      cooldown = 3;
  }
  
  if(projectileActive === true){
    //projectile
    stroke('black');
    fill('grey');
    circle(projectileX, projectileVelocity, 25)
    projectileX += projectileSpeed;
    if(projectileX >= windowWidth){
      projectileActive = false;
      projectileX = 0;
    }
  }
}

function enemySpawn(){
  for(let i = 1; i < random(3,5); i++){
    
  }
}
