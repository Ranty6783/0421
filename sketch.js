let cam;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#e7c6ff');

  cam = createCapture(VIDEO);
  cam.size(width * 0.7, height * 0.7);
  cam.hide();
}

function draw() {
  background('#e7c6ff');

  let w = width * 0.7;
  let h = height * 0.7;

  let x = (width - w) / 2;
  let y = (height - h) / 2;

  image(cam, x, y, w, h);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
