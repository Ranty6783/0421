let cam, pg;

function setup() {
  createCanvas(windowWidth, windowHeight);

  cam = createCapture(VIDEO);
  cam.size(640, 480); // 固定來源尺寸，避免比例錯亂
  cam.hide();

  pg = createGraphics(640, 480);
}

function draw() {
  background('#e7c6ff');

  let w = width * 0.7;
  let h = height * 0.7;

  let x = (width - w) / 2;
  let y = (height - h) / 2;

  let stepSize = 30; // 可自行調整

  cam.loadPixels();

  if (cam.pixels.length > 0) {
    pg.clear();
    pg.noStroke();

    for (let cy = 0; cy < cam.height; cy += stepSize) {
      for (let cx = 0; cx < cam.width; cx += stepSize) {

        let index = (cy * cam.width + cx) * 4;

        let r = cam.pixels[index];
        let g = cam.pixels[index + 1];
        let b = cam.pixels[index + 2];

        pg.fill(r, g, b);
        pg.rect(cx, cy, stepSize, stepSize);
      }
    }
  }

  push();
  translate(x + w, y);
  scale(-1, 1);
  image(pg, 0, 0, w, h);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
