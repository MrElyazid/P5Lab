let theta, thetaV, thetaA, x, y, l, g, dt;

function setup() {
  createCanvas(600, 400);
  updateParameters();
  
  document.getElementById('length').addEventListener('input', updateParameters);
  document.getElementById('angle').addEventListener('input', updateParameters);
  document.getElementById('gravity').addEventListener('input', updateParameters);
}

function updateParameters() {
  l = parseFloat(document.getElementById('length').value) * 100;
  g = parseFloat(document.getElementById('gravity').value);
  let angleDegrees = parseFloat(document.getElementById('angle').value);
  theta = radians(angleDegrees);
  
  thetaV = 0;
  thetaA = 0;
  
  x = l * sin(theta) + width / 2;
  y = l * cos(theta);
  
  dt = 1 / 60;
}

function draw() {
  background(210);
  
  thetaA = -g / l * sin(theta) * 100;
  thetaV += thetaA * dt;
  theta += thetaV * dt;
  
  x = l * sin(theta) + width / 2;
  y = l * cos(theta);
  
  
  fill(0);
  rect(width / 2 - 15, 0, 30, 10);
  stroke(0);
  line(width / 2, 0, x, y);
  fill(255, 0, 0);
  circle(x, y, 20);
}

