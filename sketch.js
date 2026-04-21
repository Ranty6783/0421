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

  push(); // 儲存目前的座標狀態
  translate(x + w, y); // 將原點移至影像預計出現的右側
  scale(-1, 1); // 水平翻轉座標系
  image(cam, 0, 0, w, h); // 在翻轉後的座標系繪製影像
  pop(); // 恢復原始座標狀態，以免影響後續繪圖
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
