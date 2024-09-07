let rows = 16;
let cols = 16;
let grid = [];
let randomBombsPlaces = []
let numBombs = 40
let playerWon, gameIsOver
let gStatus



function setup() {
  let canvas = createCanvas(400, 400);
  canvas.elt.oncontextmenu = (e) => e.preventDefault();
  let gap = width / rows;


  let j = 0

    while (j < numBombs) {
        let bombPos = {x: floor(random(rows)), y: floor(random(cols))}

        if (!isInArray(randomBombsPlaces, bombPos)) {
            randomBombsPlaces.push(bombPos)
            j++
        }
    }


  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Cell(i, j, gap);
    }
  }


 playerWon = false
 gameIsOver = false

 gStatus = select('#gameStatus')
}



function draw() {
  background(180);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }

  if (playerWon) {
    heActuallyWon()
  }
}


function heActuallyWon() {
    noLoop()
    background(210)
    fill(orange)
    textAlign(CENTER, CENTER)
    textSize(25)
    text('YOU WON! press R to play again', width/2, height/2)
    gameIsOver = true
}



function keyPressed() {
    if ( ( key == 'R' || key == 'r') && gameIsOver) {
        location.reload()
      }
}

function mousePressed() {

if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {

    let gap = width / rows;
    let x = floor(mouseX / gap);
    let y = floor(mouseY / gap);


    if (mouseButton === LEFT) {
        grid[x][y].update();
    } else if (mouseButton === RIGHT) {
        grid[x][y].toggleX()
    }

    
    playerWon = randomBombsPlaces.every(bomb => grid[bomb.x][bomb.y].toggled == true)

    if (grid[x][y].isBomb && grid[x][y].reavealed) {
        
        for (let i = 0; i< numBombs; i++) {
            grid[randomBombsPlaces[i].x][randomBombsPlaces[i].y].reavealed = true
        }

        noLoop()
        gStatus.html("YOU LOST! press R to play again.")
        gameIsOver = true
    }
}

}

class Cell {
  constructor(i, j, gap) {
    this.i = i
    this.j = j
    this.x = i * gap;
    this.y = j * gap;
    this.reavealed = false;
    this.isBomb = isInArray(randomBombsPlaces, {x : i, y : j})
    this.gap = gap;
    this.toggled = false;
  }

  update() {
    this.reavealed = true;
  }


  toggleX() {
    
    this.toggled = !this.toggled

    if (this.toggled) {
        textSize(16)
        text('X', this.x + this.gap/2, this.y + this.gap /2)
    } else {
        fill(110, 108, 104)
        stroke(0);
        rect(this.x, this.y, this.gap, this.gap);
    }
  }


  show() {
    this.reavealed ? fill(235, 235, 235) : fill(165, 165, 165);
    stroke(0);
    rect(this.x, this.y, this.gap, this.gap);
    
    
    if(this.reavealed) {
      if(!this.isBomb) {
        let bombCount = this.countBombs()
        if (bombCount > 0) {
                  fill(0)
                  textAlign(CENTER, CENTER)
                  textSize(16)
                  text(bombCount, this.x + this.gap/2, this.y + this.gap /2)
        } else {
          
          
          let x = this.x / this.gap;
          let y = this.y / this.gap;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let neighborX = x + i;
        let neighborY = y + j;

        if (i == 0 && j == 0) {
          continue;
        }
        if (
          neighborX >= 0 &&
          neighborX < rows &&
          neighborY >= 0 &&
          neighborY < cols
        ) {
          if (!grid[neighborX][neighborY].isBomb && !grid[neighborX][neighborY].reavealed) {
            grid[neighborX][neighborY].update();
          }
        }
      }
    }
        }

      } else {
        fill(11)
        noStroke()
        circle(this.x + this.gap / 2, this.y + this.gap /2, 16)
      }
    }

    if (this.toggled && !this.reavealed) {
        fill((210, 10, 30))
        textAlign(CENTER, CENTER)
        textSize(20)
        text('X', this.x + this.gap/2, this.y + this.gap /2)
    }
  }

  countBombs() {
    let count = 0;
    let x = this.x / this.gap;
    let y = this.y / this.gap;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let neighborX = x + i;
        let neighborY = y + j;

        if (i == 0 && j == 0) {
          continue;
        }
        if (
          neighborX >= 0 &&
          neighborX < rows &&
          neighborY >= 0 &&
          neighborY < cols
        ) {
          if (grid[neighborX][neighborY].isBomb) {
            count += 1;
          }
        }
      }
    }

    return count;
  }
}


function isInArray(arr, obj) {
    return arr.some(item => item.x === obj.x && item.y === obj.y)
}