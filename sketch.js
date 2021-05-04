//Create variables here


var dog,dogImg,happyDog,database,foodS,foodStock

var fedTime
var lastFed
var foodObj

function preload()
{
  //load images here
  dogImg = loadImage("dog.png")
  happyDog = loadImage("happydog.png")
}

function setup() {
  database = firebase.database();
  createCanvas(900,400);

  foodObj = new Food();

  foodStock = database.ref('Food')
  foodStock.on("value",readStock)

  dog = createSprite(785,200,20,60)
  dog.addImage(dogImg)
  dog.scale = 0.16

  feed=createButton("Feed the dog");
  feed.position(690,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(790,95);
  addFood.mousePressed(addFoods);

  
}

function draw() { 
  background("green") 
  
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  fill("black");
  textSize(20);
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed %12 + "PM", 310, 35);
  }
  else if(lastFed == 0) {
    text("Last Feed: 12AM ", 310, 35);
  }
  else {
    text("Last Feed:  " + lastFed + "AM", 310, 35);
  }
 
  drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  //console.log(foodS)
}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}




