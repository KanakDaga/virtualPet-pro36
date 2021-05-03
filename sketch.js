var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var hour;
var time;

//create feed and lastFed variable here
var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  // getTime();
  database.ref("lastFedTime").on("value",(data)=>{
    time = data.val();
  })

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here
 
 
  drawSprites();
  fill (0);
  textSize (15);
  text ("Last feed time" + time, 700,30);
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  getTime();

  //write code here to update food stock and last fed time
  foodS--;
  database.ref("/").update({
    Food:foodS,
    lastFedTime : time
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
async function getTime(){
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var data = await response.json();
  console.log(data);
  var dateTime = data.datetime;
  console.log(dateTime);
  hour = data.datetime.slice(11,13);
  console.log(hour);
  time = data.datetime.slice(11,19);
  console.log(time);
}
