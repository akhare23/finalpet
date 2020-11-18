//Create variables here
var dog1;
var bg;
var dog, happyDog, bedroom, deadDog, dogVaccination, foodImages, garden, injection, lazy, livingRoom, milk, running, runningLeft, catVaccination, washRoom;
var foodS, foodObj, foodStock;
//var foodStock;
var button, button2;
var foodObj;
var database;
var fedTime, lastFed;
var gameState = "normal";
function preload()
{
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/BedRoom.png")
  deadDog = loadImage("images/deadDog.png");
  dogVaccination = loadImage("images/dogVaccination.png");
  foodImages =loadImage("images/Food Stock.png");
  garden = loadImage("images/Garden.png");
  injection = loadImage("images/Injection.png");
  lazy = loadImage("images/Lazy.png");
  livingRoom = loadImage("images/Living Room.png");
  running = loadImage("images/running.png");
  milk = loadImage("images/milk.png");
  runningLeft = loadImage("images/runningLeft.png");
  catVaccination=loadImage("images/Vaccination.jpg");
  washRoom = loadImage("images/WashRoom.png")

	//load images here
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);

  foodObj = new Food();

  foodStock = database.ref("food");
  foodStock.on("value", readStock);

  dog1 = createSprite(250,250,50,50);
  dog1.addImage(happyDog);
  dog1.scale = 0.1;

  button = createButton("Feed Dog");
  button.position(500,100);
  button.mousePressed(feedDog);

  button2 = createButton("Add Food");
  button2.position(600,100);
  button2.mousePressed(addFoods);

  bg = createSprite(500,250,100,100);
  bg.addImage("bedroom", bedroom);
  bg.addImage("washroom", washRoom);
  bg.addImage("garden", garden);


}


function draw() {  
  background(46, 139, 87);
  console.log(hour());
  textSize(15);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  })


  fill(255,255,254);
  textSize(15);
  currentTime=hour();
if(currentTime===(lastFed+1)){
  update("playing");
  bg.changeImage(bedroom);

}else if(currentTime === (lastFed+2)){
  update("sleeping");
  bg.changeImage(washroom);
}else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
  update("bathing");
  bg.changeImage(garden);
}else{
  update("hungry");
  foodObj.display();
}

if(gameState!="hungry"){
  button.hide();
  button2.hide();
  //dog.remove();
}else{
  button.show();
  button.show();
  dog1.addImage(dog);
}
  if(lastFed>=12){
    text("Last Feed : " + lastFed%12 + " PM",350,30);
  } else if(lastFed===0){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed : " + lastFed, 350,30)
  }

  

  

  drawSprites();
}

function feedDog(){
  dog1.changeImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}







