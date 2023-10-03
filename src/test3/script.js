const canvas = document.querySelector(`#canvas`);
const box = canvas.getContext(`2d`);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let rectX = 300;
let rectY = 300;
let isDragging = false;
let offsetX, offsetY;

function drawRectangle() {
  box.clearRect(0, 0, canvas.width, canvas.height);
  box.fillStyle = `pink`;
  box.fillRect(rectX, rectY, 600, 600);
}

function calculateSpeed(touchX, touchY) {
  const centerX = rectX + 300; // x-coordinate of the center
  const centerY = rectY + 300; // y-coordinate of the center

  // Calculate distance from touch point to center
  const distance = Math.hypot((touchX - centerX), (touchY - centerY));

  // Speed proportional to distance
  return 50 / distance;
}


function handleTouchStart(event) {
  const touchX = event.touches[0].clientX;
  const touchY = event.touches[0].clientY;

  if (touchX >= rectX && touchX <= rectX + 300 && touchY >= rectY && touchY <= rectY + 300) {
    isDragging = true;

    // Store the initial touch position relative to the rectangle
    offsetX = touchX - rectX;
    offsetY = touchY - rectY;
  }
}

function handleTouchMove(event) {
  if (isDragging) {
    rectX = event.touches[0].clientX - offsetX;
    rectY = event.touches[0].clientY - offsetY;
    drawRectangle();
  }
}

function handleTouchEnd() {
  isDragging = false;
}

canvas.addEventListener(`touchstart`, handleTouchStart);
canvas.addEventListener(`touchmove`, handleTouchMove);
canvas.addEventListener(`touchend`, handleTouchEnd);

drawRectangle();