``
let theta, thetaV, thetaA, x, y, l, g, dt;

function setup() {
  createCanvas(600, 400);
  updateParameters();
  
  // Add event listeners to update parameters when inputs change
  document.getElementById('length').addEventListener('input', updateParameters);
  document.getElementById('angle').addEventListener('input', updateParameters);
  document.getElementById('gravity').addEventListener('input', updateParameters);
}

function updateParameters() {
  l = parseFloat(document.getElementById('length').value) * 100; // Convert to pixels (1m = 100px)
  g = parseFloat(document.getElementById('gravity').value);
  let angleDegrees = parseFloat(document.getElementById('angle').value);
  theta = radians(angleDegrees);
  
  thetaV = 0;
  thetaA = 0;
  
  x = l * sin(theta) + width / 2;
  y = l * cos(theta);
  
  dt = 1 / 60; // Time step, since the frameRate is 60
}

function draw() {
  background(210);
  
  thetaA = -g / l * sin(theta) * 100;
  thetaV += thetaA * dt;
  theta += thetaV * dt;
  
  x = l * sin(theta) + width / 2;
  y = l * cos(theta);
  
  // Drawing the platform, ball, line, origin at (width/2, 0)
  fill(0);
  rect(width / 2 - 15, 0, 30, 10); // platform
  stroke(0);
  line(width / 2, 0, x, y);
  fill(255, 0, 0);
  circle(x, y, 20); // ball
}


``