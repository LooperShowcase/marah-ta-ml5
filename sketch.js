let player;
let bgImg;
let playerImg;
let obsImg;
let ulost;
let obstacles = [];
let wordClassifier;

function preload() {
  bgImg = loadImage("background3.png");
  playerImg = loadImage("player4.gif");
  obsImg = loadImage("obstacle1.png");
  let options = {
    pobabilityThreshold: 0.85,
  };

  wordClassifier = ml5.soundClassifier("SpeechCommands18w", options);
}

function setup() {
  createCanvas(1600, 600);
  player = new Player();

  wordClassifier.classify(heardWord);
}

function heardWord(error, results) {
  console.log(results[0].label + "  " + results[0].confidence);
  if (results[0].label == "up") {
    player.jump();
  }
}

function restart() {
  location.reload();
}

function draw() {
  background(bgImg);

  textSize(30);
  text(frameCount, 1500, 70);

  if (random(1) < 0.01) {
    obstacles.push(new Obstacles());
  }

  for (let obs of obstacles) {
    obs.show();
    obs.move();
    if (player.collided(obs) === true) {
      textSize(100);
      text("GAME OVER", width / 2 - 300, height / 2);
      noLoop();

      button = createButton("restart");
      button.position(width / 2 - 10, height / 2 + 25);
      button.style("font-size", "20px");
      button.style("background-color", "#AFE1AF");
      button.style("font-weight", "bold");
      button.size(100, 50);
      button.mousePressed(restart);
    }
  }

  player.show();
  player.move();
}

function keyPressed() {
  if (key === " ") {
    player.jump();
  }
}
