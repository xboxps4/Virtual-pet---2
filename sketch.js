var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var fedTime;
var lastFed;

//Create variables here

function preload()
{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 700);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  
  dog = createSprite(750,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.4
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("FEED DOG")
  feed.position(500,15,20,11111110)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)
  

} 

function draw(){
 background(0);

 foodobject.display()
 
 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });
  
 fill(255,255,254);
 textSize(25);
 if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + " AM", 350,30);
 }


drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
