let cells = []
let num = 14
let minR = 10
let maxR = 50


function setup() {
  let canvas = createCanvas(800, 600)
  canvas.elt.oncontextmenu = (e) => e.preventDefault();
  for (let i = 0; i < num; i++) {
    cells[i] = new Cell()
  }

  colorMode(HSB, 255);
}


function draw() {
  background(210)
  
  for (let i = 0; i < cells.length; i++) {
    cells[i].show()
    cells[i].update()
  }
}


function mousePressed() {

if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {

    if (mouseButton === LEFT) {

        let distances = []
      
        for (let i = 0; i < cells.length; i++) {
          distances[i] = dist(mouseX, mouseY, cells[i].x, cells[i].y)
        }
        
        let minDist = min(distances)
        let index = distances.findIndex(distance => distance === minDist)
        parent = cells[index]

        if (dist(mouseX, mouseY, parent.x, parent.y) <= parent.rad) {
            cells.push(new Cell(createVector(parent.x, parent.y), parent.rad / 2))
            cells.push(new Cell(createVector(parent.x, parent.y), parent.rad / 2))
            cells.splice(index, 1)
        }
    } 
    
    else if (mouseButton === RIGHT) {
        cells.push(new Cell(createVector(mouseX, mouseY), random(minR, maxR)))
    }

}

}


class Cell {
  constructor(origin = createVector(random(width), random(height)), rad = 50) {
    this.x = origin.x
    this.y = origin.y
    
    this.dx = random(-2, 2)
    this.dy = random(-2, 2)
    this.rad = rad

    this.startColor = color(random(255), random(255), random(255))
    this.endColor = color(random(255), random(255), random(255))

    this.lerpAmount = 0
    this.changeSpeed = 0.001

    this.color = lerpColor(this.startColor, this.endColor, this.lerpAmount)
  }
  
  show() {
    fill(this.color)
    noStroke()
    circle(this.x, this.y, this.rad)
  }
  
  update() {
    this.color = lerpColor(this.startColor, this.endColor, this.lerpAmount)

    if (this.rad < minR) {
        this.rad = minR
    }

    if (this.x > width || this.x < 0) {
      this.dx *= -1
    } 
    
    if (this.y > height || this.y < 0) {
      this.dy *= -1
    }
    
    this.x += this.dx
    this.y += this.dy
    
    this.lerpAmount += this.changeSpeed

    if (this.lerpAmount >= 1) {
      this.startColor = this.endColor
      this.endColor = color(random(255), random(255), random(255))
      this.lerpAmount = 0
    }
  }
}
