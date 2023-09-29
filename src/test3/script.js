const canvas = document.querySelector(`#canvas`);
const box = canvas.getContext(`2d`);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let rectX = 50;
let rectY = 50;
let isDragging = false;
let offsetX, offsetY;

function drawRectangle() {
  box.clearRect(0, 0, canvas.width, canvas.height);
  box.fillStyle = `pink`;
  box.fillRect(rectX, rectY, 500, 500);
}

function calculateSpeed(touchX, touchY) {
  const centerX = rectX + 100; // x-coordinate of the center
  const centerY = rectY + 100; // y-coordinate of the center

  // Calculate distance from touch point to center
  const distance = Math.hypot((touchX - centerX), (touchY - centerY));

  // Speed will be inversely proportional to distance
  // Adjust the multiplier (e.g., 5) to control sensitivity
  return 5 / distance;
}

function handleTouchStart(event) {
  const touchX = event.touches[0].clientX;
  const touchY = event.touches[0].clientY;

  if (touchX >= rectX && touchX <= rectX + 100 && touchY >= rectY && touchY <= rectY + 100) {
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