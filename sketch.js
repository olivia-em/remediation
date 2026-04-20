//Scrolling Text
//Carrie Wang
// https://editor.p5js.org/christinalan/sketches/CUqBLVDjW

let scenes = {};
let sceneIds = [];
let xStart = 0; //starting position of the text wall
let x1Start = 0;
let x = 0;
let xSpeed;

let black = false;
const LOOP_GAP = 1000;

function preload() {
  scenes = loadJSON("scenes.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textFont("PT Serif");
  textAlign(CENTER, CENTER); //adjust the anchor point of text alignment to the horizontal and vertical centers
  textSize(20); //make the text 20 pixels in size
  frameRate(30);

  sceneIds = Object.keys(scenes).sort((a, b) => {
    const aNum = Number(a);
    const bNum = Number(b);
    const aIsNum = !Number.isNaN(aNum);
    const bIsNum = !Number.isNaN(bNum);

    if (aIsNum && bIsNum) return aNum - bNum;
    if (aIsNum) return -1;
    if (bIsNum) return 1;
    return a.localeCompare(b);
  });
}

function draw() {
  background(255);
  leftText();
  rightText();

  if (black == true) {
    background(255);
  }
}

function rightText() {
  if (sceneIds.length === 0) return;

  const rowY = [
    0,
    (2 * height) / 8,
    (4 * height) / 8,
    (6 * height) / 8,
    height,
  ];

  const rowSpacing = [];
  let maxSpacing = 1;
  for (let i = 0; i < rowY.length; i++) {
    const id = sceneIds[i % sceneIds.length];
    const content = scenes[id] || "";
    const spacing = max(textWidth(content) + LOOP_GAP, 1);
    rowSpacing.push(spacing);
    maxSpacing = max(maxSpacing, spacing);
  }

  fill(0);
  for (let i = 0; i < rowY.length; i++) {
    const id = sceneIds[i % sceneIds.length];
    const content = scenes[id] || "";
    const spacing = rowSpacing[i];

    for (let x = xStart; x < width + spacing; x += spacing) {
      text(content, x, rowY[i]);
    }
  }

  xStart -= 5;

  if (xStart < -maxSpacing) {
    xStart = 0;
  }
}

function leftText() {
  if (sceneIds.length === 0) return;

  const rowY = [
    height / 8,
    (3 * height) / 8,
    (5 * height) / 8,
    (7 * height) / 8,
  ];

  const rowSpacing = [];
  let maxSpacing = 1;
  for (let i = 0; i < rowY.length; i++) {
    const id = sceneIds[(i + 5) % sceneIds.length];
    const content = scenes[id] || "";
    const spacing = max(textWidth(content) + LOOP_GAP, 1);
    rowSpacing.push(spacing);
    maxSpacing = max(maxSpacing, spacing);
  }

  fill(0);
  for (let i = 0; i < rowY.length; i++) {
    const id = sceneIds[(i + 5) % sceneIds.length];
    const content = scenes[id] || "";
    const spacing = rowSpacing[i];

    for (let x = x1Start - spacing; x < width + spacing; x += spacing) {
      text(content, x, rowY[i]);
    }
  }

  x1Start += 5;

  if (x1Start > maxSpacing) {
    x1Start = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
