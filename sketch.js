
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime=0;
var jungle,jungle_image;
var gameState;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungle_image = loadImage("jungle.jpg")
 
}



function setup() {
  
  createCanvas(600,400);
  
  jungle = createSprite(300,200,600,400);
  jungle.addImage(jungle_image);
    jungle.x = jungle.width/2;
  jungle.velocityX= -4;
  
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.10;
  
  ground=createSprite(400,350,900,10);
 
  ground.visible=false;
  console.log(ground.x);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  

  
  
}


function draw() {
  background(220);
  
  if (jungle.x < 300){
      jungle.x = jungle.width/2;
    }
  
  
  
  
  monkey.collide(ground);
  
  if(keyDown("space")&&monkey.y>=100)
    {
      monkey.velocityY=-12;
      
    }
  monkey.velocityY+=0.8;
  
  
  
  if(frameCount%80 ==0)
    {
      food();
    }
  
  if(frameCount%100==0)
    {
      obstacles();
    }
  
  
  drawSprites();
  
    switch(score){
    case 10: monkey.scale=0.12;
            break;
    case 20: monkey.scale = 0.14;
            break;
    case 30: monkey.scale = 0.16;
            break;
    case 40: monkey.scale = 0.18;
            break;
    case 50: monkey.scale = 0.20;
            break;
    default: break;
  }
  
  if(obstacleGroup.isTouching(monkey))
    {
      score=score-5;
      monkey.scale = 0.1;
      obstacleGroup.destroyEach();
    }
  
  if(FoodGroup.isTouching(monkey))
    {
      score+=2;
      FoodGroup.destroyEach();
      
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime,100,50);
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score : "+score , 400,50);
  
  
}

function food(){
  
  banana = createSprite(400,Math.round(random(120,200)),30,30);
  banana.addImage("banana",bananaImage);
  banana.scale=0.1;
  banana.velocityX=-4;
  banana.lifetime=300;
  FoodGroup.add(banana);
  
}

function obstacles(){
  
  obstacle=createSprite(400,315,20,20);
  obstacle.addImage("obs",obstacleImage);
  obstacle.scale = 0.17;
  obstacle.velocityX=-4;
  obstacle.lifetime=300;
  obstacleGroup.add(obstacle);
  
}



