let bricks = [];
let rows = 8;
let cols = 8;
let p, player;
let bwidth = 50;
let bheight = 15;
let launched = false;
let gameIsOver = false
let gameStarted = false
let playerWon = false
let bricksRemoved = 0



function setup() {
  createCanvas(400, 400);
  p = new Platform();
  player = new Ball();
  for (let i = 0; i < rows; i++) {
    bricks[i] = [];
    for (let j = 0; j < cols; j++) {
      bricks[i][j] = new Brick(i * bwidth, j * bheight);
    }
  }

  player.dx = 0
  player.dy = 0
}


function draw() {
  background(220);

  for (let i = 0; i < bricks.length; i++) {
    for (let j = 0; j < bricks[i].length; j++) {
      let brick = bricks[i][j];
      if (brick && !brick.removed && isColliding(player, brick)) {
        brick.removed = true;
        player.dy *= -1;
        bricksRemoved++

        if (bricksRemoved == 64) {
            heActuallyWon()
          }

      }

      if (brick && !brick.removed) {
        brick.show(); 
      }
    }
  }

  p.update();
  p.show();
  player.show();
  player.update();

  if (player.y > height) {
    gameOver()
  }
}


function heActuallyWon() {
    gameIsOver = true
    gameStarted = false
    noLoop()
    background(210)
    textAlign(CENTER, CENTER)
    textSize(20)
    textStyle(BOLD)
    text('YOU WON! press R to reload', width / 2, height/ 2)
}


function keyPressed() {
    if ((key =='r' || key == 'R') && gameIsOver ) {
        location.reload()
    }

    if ((key == 's' || key == 'S') && !gameStarted) {
        player.dx = random(-10, 10);
        player.dy = -5;

        gameStarted = true
    }
}


function gameOver() {
    gameIsOver = true
    gameStarted = false
    noLoop()
    background(210)
    textAlign(CENTER, CENTER)
    textSize(20)
    textStyle(BOLD)
    text('YOU LOST press R to reload', width / 2, height/ 2)
}


class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 12;
    this.removed = false; 
  }

  show() {
    fill(color(255, 255, 150));
    rect(this.x, this.y, this.w, this.h);
  }
}

class Platform {
  constructor() {
    this.x = width / 2 - 35;
    this.y = height - 15;
    this.h = 15;
    this.w = 70;
  }

  update() {
    if (mouseX > 0 && mouseX < width - 50) {
        this.x = mouseX;
    }
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height - 25;
    this.dx = random(-10, 10);
    this.dy = -5;
    this.radius = 10;
  }

  show() {
    fill(color(0, 0, 220));
    circle(this.x, this.y, 2 * this.radius);
  }

  update() {
    if (this.x > width || this.x < 0) {
      this.dx *= -1;
    }

    if (this.y < 0 || isColliding(this, p)) {
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}


// collision detection between a circle and a rectangle

function isColliding(circ, rec) {
  let distX = abs(circ.x - rec.x - rec.w / 2);
  let distY = abs(circ.y - rec.y - rec.h / 2);

  if (distX > rec.w / 2 + circ.radius) {
    return false;
  }
  if (distY > rec.h / 2 + circ.radius) {
    return false;
  }

  if (distX <= rec.w / 2) {
    return true;
  }
  if (distY <= rec.h / 2) {
    return true;
  }

  let dx = distX - rec.w / 2;
  let dy = distY - rec.h / 2;
  return dx * dx + dy * dy <= circ.radius * circ.radius;
}
