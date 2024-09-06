let scoreElement;
let trail = [];
let foodx, foody, dx, dy, currentDir;
let cellsize = 10;
let h;
let snakeLength, gameIsOver, beepSound, loseSound;

function setup() {
  createCanvas(400, 400);

  h = new head(width / 2, height / 2);
  f = new food();
  dx = 0;
  dy = 0;
  currentDir = null;
  foodx = random(width);
  foody = random(height);

  snakeLength = 0;

  frameRate(10);

  scoreElement = select('#score')

  gameIsOver = false


}

function draw() {
  background(255);

  h.show();
  h.update();

  for (let i = 0; i < snakeLength; i++) {
    
    if (trail[i].x == h.x && trail[i].y == h.y ) {
      gameOver()

    }

    if (rectCollision(f, trail[i])) {
      f.changePosition()
    }

    fill(0, 255, 0);
    rect(trail[i].x, trail[i].y, cellsize);
  }

  f.show();
  f.update();
}

function addHeadPos(x, y) {
  trail.push({ x, y });

  if (trail.length > snakeLength + 1) { // originally it was just snakeLength, it took me an hour  to realize this was causing the bug .....
    trail.shift();
  }
}

function gameOver() {
  gameIsOver = true
  noLoop();
  background(255)

  fill(210, 20, 40)
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Game Over', width/2, height/2)

  fill(10, 50, 100)
  textSize(15)
  text('Press R to reload', width/2, height/2 + height/4)
}


function keyPressed() {
    if (keyCode == UP_ARROW && currentDir !== "UP" && currentDir !== "DOWN") {
    dy = -cellsize;
    dx = 0;
    currentDir = "UP";
    }
  if (keyCode == DOWN_ARROW && currentDir !== "DOWN" && currentDir !== "UP") {
    dx = 0;
    dy = cellsize;
    currentDir = "DOWN";
  }
  if (
    keyCode == LEFT_ARROW &&
    currentDir !== "LEFT" &&
    currentDir !== "RIGHT"
  ) {
    dy = 0;
    dx = -cellsize;
    currentDir = "LEFT";
  }
  if (
    keyCode == RIGHT_ARROW &&
    currentDir !== "RIGHT" &&
    currentDir !== "LEFT"
  ) {
    dy = 0;
    dx = cellsize;
    currentDir = "RIGHT";
  }

  if ( ( key == 'R' || key == 'r') && gameIsOver) {
    location.reload()
  }
}

class head {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    
    fill(0, 255, 0);
    rect(this.x, this.y, cellsize);
  }

  update() {
    addHeadPos(this.x, this.y);
    
    this.x += dx;
    this.y += dy;

    if (
      this.x > width - cellsize ||
      this.x < 0 ||
      this.y > height - cellsize ||
      this.y < 0
    ) {
      gameOver();
    }

    
  }
}

class food {
  constructor() {
    this.x = random(width - 5);
    this.y = random(height - 5);
  }


  changePosition() {
    this.x = random(width - 5)
    this.y = random(height -5)
  }


  show() {
    fill(255, 0, 40);
    rect(this.x, this.y, 5);
  }

  update() {
    if (
      rectCollision(this, h)
    ) {
      this.x = random(width - 5);
      this.y = random(height - 5);
      snakeLength += 1;
      scoreElement.elt.textContent = parseInt(scoreElement.elt.textContent) + 1
    }
  }
}


function rectCollision(rect1, rect2) {
  return (

    rect1.x < rect2.x + cellsize &&
      rect1.x + 5 > rect2.x &&
      rect1.y < rect2.y + cellsize &&
      rect1.y + 5 > rect2.y

  )
}