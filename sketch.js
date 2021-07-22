var bg,bgImg;
var player,playerImg;
var robots_img;
var laser, laserImg;
var shoot = 0;
var robots;
var score = 0;
var backMusic,laserSound;
var gameOver,gameOverImg; 



function preload(){
 bgImg = loadImage("assets/City2.jpg");
 playerImg = loadImage("assets/GRobot.png")
 robots_img = loadImage("assets/ERobot4.png");
 laserImg = loadImage("assets/laser.png");
backMusic = loadSound("assets/backMusic.mp3");
laserSound = loadSound("assets/LaserMusic.mp3");
heartImg = loadImage("assets/heart.png");
gameOverImg = loadImage("assets/GameOver.png");
}

function setup() {
createCanvas(700,600)
bg = createSprite(600,300);
bg.addImage(bgImg);
bg.scale = 2.5;

player = createSprite(50,550);
player.addImage(playerImg);
player.scale = 0.2;

//backMusic.play();
backMusic.loop();

edges = createEdgeSprites();

laserGroup= new Group;
robotsGroup = new Group;


  
  
  bg.velocityX =-2;
  
  
score = 0;
stroke("red");
fill("red");
textSize(20);
}

function draw() { 
  background(0); 



if (bg.x <50){
  bg.x = bg.width/2;
}



  
if(keyDown("UP_ARROW")){
  player.y = player.y - 5;

}
if(keyDown("DOWN_ARROW")){
  player.y = player.y + 5;

}

  
if(keyDown("LEFT_ARROW")){
  player.x = player.x - 5;
 
}
if(keyDown("RIGHT_ARROW")){
  player.x = player.x + 5;

}
shoot = shoot-1
if(keyDown("space") && shoot <0){
laser = createSprite(player.x,player.y);
laser.addImage(laserImg);
laser.velocityX = 5 ;
laserGroup.add(laser);
shoot = laser.x;
laserSound.play();
}



player.bounceOff(edges);


if(laserGroup.isTouching(robotsGroup)){
  robotsGroup[0].destroy();
  laserGroup[0].destroy();
  score = score+25;
}


 
  
  



spawnRobots();

drawSprites();
text("Score: " + score, 300, 50);

}

function spawnRobots(){
if(World.frameCount % 150 === 0){
   robots = createSprite(700,300);
  robots.addImage(robots_img);
  robots.scale = 0.15;
  robots.velocityX = -(2 + score/100);
  robots.y = Math.round(random(550,50));
  robotsGroup.add(robots);
  robotsGroup.lifetime = 134
}
if(robotsGroup.isTouching(player)){
  player.destroy();
  robotsGroup[0].destroy();
  //bg.velocityX = 0;
  robots.velocityX = 0;
  robotsGroup.setVelocityXEach(0);
  robotsGroup.setVelocityYEach(0);
  robotsGroup.setVisibleEach(false);
  robotsGroup.destroyEach(0);
  
 // robotsGroup.destroyEach();
 // robots.destroy();
  bg.velocityX=0;
 // player.destroy();
 //robotsGroup.setLifetimeEach(-1);
 gameOver = createSprite(400,150);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.5;
 
 
}
}




// Music from
//Main Theme (Overture) | The Grand Score by Alexander Nakarada | https://www.serpentsoundstudios.com
//Music promoted by https://www.chosic.com/
//Attribution 4.0 International (CC BY 4.0)
//https://creativecommons.org/licenses/by/4.0/ 
