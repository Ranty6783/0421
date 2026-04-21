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

  // 產生馬賽克效果
  let stepSize = 20; // 馬賽克方塊的大小，數字越大馬賽克感越強
  cam.loadPixels();
  
  if (cam.pixels.length > 0) {
    pg.clear(); // 清除上一幀的繪圖
    pg.noStroke();
    for (let cy = 0; cy < cam.height; cy += stepSize) {
      for (let cx = 0; cx < cam.width; cx += stepSize) {
        // 取得該像素點的顏色資訊 [r, g, b, a]
        let offset = (cy * cam.width + cx) * 4;
        let r = cam.pixels[offset];
        let g = cam.pixels[offset + 1];
        let b = cam.pixels[offset + 2];
        
        pg.fill(r, g, b);
        pg.rect(cx, cy, stepSize, stepSize); // 在 pg 上繪製馬賽克方塊
      }
    }
  }

  push(); // 儲存目前的座標狀態
  translate(x + w, y); // 將原點移至影像預計出現的右側
  scale(-1, 1); // 水平翻轉座標系
  image(pg, 0, 0, w, h); // 將圖層繪製在視訊畫面上方（同樣會受 scale 影響而鏡像修正）
  pop(); // 恢復原始座標狀態，以免影響後續繪圖
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pg = createGraphics(width * 0.7, height * 0.7); // 視窗縮放時重新調整繪圖物件大小
}
