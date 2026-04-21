let cam, pg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#e7c6ff');

  cam = createCapture(VIDEO);
  cam.size(width * 0.7, height * 0.7);
  cam.hide();
  pg = createGraphics(width * 0.7, height * 0.7); // 建立與視訊畫面比例相同的繪圖物件
}

function draw() {
  background('#e7c6ff');

  let w = width * 0.7;
  let h = height * 0.7;

  let x = (width - w) / 2;
  let y = (height - h) / 2;

  // 將攝影機畫面繪製到 pg 物件中
  pg.image(cam, 0, 0, pg.width, pg.height);

  push(); // 儲存目前的座標狀態
  translate(x + w, y); // 將原點移至影像預計出現的右側
  scale(-1, 1); // 水平翻轉座標系
  image(cam, 0, 0, w, h); // 在翻轉後的座標系繪製影像
  image(pg, 0, 0, w, h); // 將圖層繪製在視訊畫面上方（同樣會受 scale 影響而鏡像修正）
  pop(); // 恢復原始座標狀態，以免影響後續繪圖
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pg = createGraphics(width * 0.7, height * 0.7); // 視窗縮放時重新調整繪圖物件大小
}
