//Create variables here
var dog;
var happyDog;
var foodS
//var foodStock;
var button, button2;
var foodObj;
var database = firebase.database();
var fedTime, lastFed;
function preload()
{
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
  
  createCanvas(500, 500);
  dog1 = createSprite(250,250,50,50);
  dog1.addImage(dog);
  dog1.scale = 0.1;

  button = createButton("Feed Dog");
  button.position(500,100);
  button.mousePressed(feedDog);
  button2 = createButton("Add Food");
  button2.position(600,100);
  button2.mousePressed(addFoods);

  foods = new Food();
}


function draw() {  
  background(46, 139, 87);
  console.log(foodS)
  textSize(15);
  foods.display();

  if(lastFed>=12){
    text("Last Feed : " + lastFed%12 + " PM",350,30);
  } else if(lastFed===0){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed : " + lastFed, 350,30)
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);

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
}






