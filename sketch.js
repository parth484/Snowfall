var bgImage;
var personKid, personDog;
var personKidImg, dogImg;
var snowMan, snowManImg, snowball;
var snowParticle, snowParticleImg, snowBallImage, snowballGroup;

const bgSound = new Audio("snowBG.wav");
const giggle = new Audio("giggle.wav");

function preload() {
  bgImage = loadImage("snow4.jpg");
  snowManImg = loadImage("snowmanImg.png");
  personKidImg = loadImage("babyKid.png");
  dogImg = loadImage("dog.png");
  snowParticleImg = loadImage("snowflakeImg.png");
  snowBallImage = loadAnimation("snowball.png", "snowball2.png", "snowball3.png", "snowball4.png");
}

function setup() {
  createCanvas(1300,700);

  personDog = createSprite(700, 630);
  personDog.shapeColor = "blue";
  personDog.addImage(dogImg);
  personDog.scale = 0.2;

  personKid = createSprite(200, 630);
  personKid.shapeColor = "red";
  personKid.addImage(personKidImg);
  personKid.scale = 0.5;

  invisibleGround = createSprite(650, 690, 1300, 3);
  invisibleGround.visible = false;

  snowballGroup = new Group();
  
}

function draw() {
  background(bgImage);  
  edges = createEdgeSprites();
  image(snowManImg, 1100, 480, 190, 230);
  var randomNumber = random(0.01, 3);
  var randomNumber1 = random(-1, 1);
  bgSound.play();
  bgSound.loop = true;

  if (frameCount % 1 == 0) {
    var snowflake = createSprite(random(0, 1300), -20);
    snowflake.velocityY = randomNumber;
    snowflake.velocityX = randomNumber1;
    snowflake.addImage(snowParticleImg);
    snowflake.scale = 0.01;
    snowflake.lifetime=500;
  }

  if (keyDown(UP_ARROW) && personKid.y >= 600) {
    personKid.velocityY = -20;
  } else if(keyDown(LEFT_ARROW)) {
    personKid.velocityX = -7;
  } else if(keyDown(RIGHT_ARROW)) {
    personKid.velocityX = 7;
  } else if(keyDown(DOWN_ARROW)) {
    personKid.velocityX = 0;
    personKid.velocityY = 0;
  }

  if (keyDown("w") && personDog.y >= 630) {
    personDog.velocityY = -20;
  } else if(keyDown("a")) {
    personDog.velocityX = -10;
  } else if(keyDown("d")) {
    personDog.velocityX = 10;
  } else if(keyDown("s")) {
    personDog.velocityX = 0;
    personDog.velocityY = 0;
  }

  if(keyDown("space")) {
    snowball = createSprite(personKid.x+30, personKid.y+5);
    snowball.addAnimation("snowball", snowBallImage);
    snowball.scale = 0.04;
    snowball.lifetime = 500;
    if((personDog.x > 650 && personKid.x < 650) || (personDog.x > 650 && personKid.x < personDog.x) || (personDog.x < 650 && personKid.x < personDog.x)) {
      snowball.velocityX = 20;
      snowball.velocityY = 1;
    } else if((personDog.x < 650 && personKid.x > 650) || (personDog.x > 650 && personKid.x > personDog.x) || (personDog.x < 650 && personKid.x > personDog.x)) {
      snowball.velocityX = -20;
      snowball.velocityY = 1;
    }

    snowballGroup.add(snowball);
  }

  if(snowballGroup.isTouching(personDog)) {
    // snowballGroup.setVelocityXEach(4);
    // snowballGroup.setVelocityYEach(20);
    snowballGroup.destroyEach();
    personDog.destroy();
    giggle.play();
  }

  personDog.velocityY = personDog.velocityY + 0.6;
  personKid.velocityY = personKid.velocityY + 0.9;
  personDog.collide(invisibleGround);
  personKid.collide(invisibleGround);

  personKid.depth = personDog.depth;

  personKid.bounceOff(edges);
  personDog.bounceOff(edges);

  personKid.bounce(personDog);
  personDog.bounce(personKid);
  strokeWeight(0);
  fill("black");
  textSize(22);
  text("Press space key to attack snowball",248,30);
  text("Use arrow keys to control boy",340,60);


  drawSprites();
}