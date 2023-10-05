import { pointsTracker } from '../../ixfx/data.js';

const elementBox = document.querySelector(`#box`);
let isMoving = false;
let touchCount = 0; 
let initialLeft = 0;
let currentLeft = 0;
let touchStartX = 0;
let currentTransform = 0;
let c = 0; 
let speed = 1;

function normalize(value, min, max) {
  return (value - min) / (max - min);
}

async function startMoving(event) {
  if (event.touches.length > 0) { // Check if there is at least one touch
    touchCount = event.touches.length; // Update the touch count
    
    window.addEventListener(`touchmove`, moving(event));
    const centerCoordinates = calculateElementCenter(elementBox);
    let target = { x: centerCoordinates.x, y: centerCoordinates.y };
    const windowSize = [window.innerWidth, window.innerHeight];
    const t = pointsTracker();
    const info = await t.seen(event.touches[0].identifier, { x: event.touches[0].clientX, y: event.touches[0].clientY });

    let a = info.values[0].x - target.x;
    let b = info.values[0].y - target.y;
    c = Math.hypot(a, b); // Update 'c' based on pointer movement
    //console.log(c);
  }
}

function stopMoving() {
  window.removeEventListener(`touchmove`, moving,true);
}

function calculateElementCenter(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return { x: centerX, y: centerY };
}

let targetX;
let targetY;

function moving(event) {
  speed = c / (6 * touchCount);

  // Update target coordinates
  targetX = event.touches[0].clientX;
  targetY = event.touches[0].clientY;

  const deltaX = (targetX - elementBox.offsetLeft) / speed;
  const deltaY = (targetY - elementBox.offsetTop) / speed;

  elementBox.style.left = elementBox.offsetLeft + deltaX + `px`;
  elementBox.style.top = elementBox.offsetTop + deltaY + `px`;
}


elementBox.addEventListener(`touchstart`, startMoving,false);
window.addEventListener(`touchend`, stopMoving,false);
