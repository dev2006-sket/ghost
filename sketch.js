var towerImg, tower; 
var doorImg, door;
var climberImg, climber;
var ghostImg, ghost;
var invisibleBlockGroup, invisibleBlock;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var spookySound; 

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  if(tower.y > 400){
    tower.y =300;
  }
  if(gameState ==="PLAY"){
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3; 
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
  if(keyDown("space")){
    ghost.velocityY = -3;
}
  ghost.velocityY = ghost.velocityY + 0.3;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
    ghost.destroy();
  }
  spawnDoors();
drawSprites();  
}
}

if(gameState ==="END"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over", 230, 250);
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200, -50);
    door.addImage("door", doorImg);
    door.x = Math.round(random(120, 400))
    door.velocityY = 1;
    door.lifetime = 800;
    doorGroup.add(door);
    
    climber = createSprite(200, 10);
    climber.addImage("climber", climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climberGroup.add(climber);
    ghost.depth = door.depth;
    ghost.depth +=1;
    
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
