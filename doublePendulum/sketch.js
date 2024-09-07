let theta, omega, thetaV, omegaV, thetaA, omegaA, x1, y1, x2, y2;
let r1, r2, m1, m2, g, damping;
let r = 10;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('canvas-container');
  
  updateParameters();
  
  document.getElementById('r1').addEventListener('input', updateParameters);
  document.getElementById('r2').addEventListener('input', updateParameters);
  document.getElementById('m1').addEventListener('input', updateParameters);
  document.getElementById('m2').addEventListener('input', updateParameters);
  document.getElementById('g').addEventListener('input', updateParameters);
  document.getElementById('damping').addEventListener('input', updateParameters);
  document.getElementById('omega').addEventListener('input', updateParameters);
  document.getElementById('theta').addEventListener('input', updateParameters);

  omega = PI / 3;
  theta = PI / 4;
  
  thetaV = 0;
  omegaV = 0;
  thetaA = 0;
  omegaA = 0;
  
  x1 = width / 2 + r1 * sin(omega);
  y1 = r1 * cos(omega);
  
  x2 = x1 + r2 * sin(theta);
  y2 = y1 + r2 * cos(theta);
}

function updateParameters() {
  r1 = parseFloat(document.getElementById('r1').value);
  r2 = parseFloat(document.getElementById('r2').value);
  m1 = parseFloat(document.getElementById('m1').value);
  m2 = parseFloat(document.getElementById('m2').value);
  g = parseFloat(document.getElementById('g').value);
  omega = parseFloat(document.getElementById('omega').value);
  theta = parseFloat(document.getElementById('theta').value);
  damping = parseFloat(document.getElementById('damping').value);
  
  document.getElementById('r1-value').textContent = r1;
  document.getElementById('r2-value').textContent = r2;
  document.getElementById('m1-value').textContent = m1;
  document.getElementById('m2-value').textContent = m2;
  document.getElementById('g-value').textContent = g.toFixed(2);
  document.getElementById('omega-value').textContent = omega.toFixed(2);
  document.getElementById('theta-value').textContent = theta.toFixed(2);
  document.getElementById('damping-value').textContent = damping.toFixed(3);
}

function draw() {
  background(220);
  
  fill(0);
  rect(width / 2 - 15, 0, 30, 10);
  
  let num1 = -g * (2 * m1 + m2) * sin(omega);
  let num2 = -m2 * g * sin(omega - 2 * theta);
  let num3 = -2 * sin(omega - theta) * m2 * (thetaV * thetaV * r2 + omegaV * omegaV * r1 * cos(omega - theta));
  let den1 = r1 * (2 * m1 + m2 - m2 * cos(2 * omega - 2 * theta));
  
  omegaA = (num1 + num2 + num3) / den1;
  omegaV += omegaA;
  omegaV *= damping;
  omega += omegaV;
  
  let num4 = 2 * sin(omega - theta);
  let num5 = (omegaV * omegaV * r1 * (m1 + m2));
  let num6 = g * (m1 + m2) * cos(omega);
  let num7 = thetaV * thetaV * r2 * m2 * cos(omega - theta);
  let den2 = r2 * (2 * m1 + m2 - m2 * cos(2 * omega - 2 * theta));
  
  thetaA = (num4 * (num5 + num6 + num7)) / den2;
  thetaV += thetaA;
  thetaV *= damping;
  theta += thetaV;
  
  x1 = width / 2 + r1 * sin(omega);
  y1 = r1 * cos(omega);
  
  x2 = x1 + r2 * sin(theta);
  y2 = y1 + r2 * cos(theta);
  
  stroke(0);
  line(width / 2, 10, x1, y1);
  line(x1, y1, x2, y2);
  
  fill(150);
  circle(x1, y1, r);
  circle(x2, y2, r);

  
  document.getElementById('omega').value = omega;
  document.getElementById('theta').value = theta;
  updateParameters();
}
