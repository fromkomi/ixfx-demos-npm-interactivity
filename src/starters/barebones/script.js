import { pointsTracker } from '../../ixfx/data.js';

const elementBox = document.querySelector(`#box`);
let isMoving = false;
let initialLeft = 0;
let currentLeft = 0;
let touchStartX = 0;
let currentTransform = 0;
let c = 0; // Initialize 'c' outside of the event listeners

function normalize(value, min, max) {
  return (value - min) / (max - min);
}

async function startMoving(event) {
  isMoving = true;
  window.addEventListener(`touchmove`, moving);
  //initialLeft = currentLeft;
  //touchStartX = event.touches[0].clientX;

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

function stopMoving() {
  isMoving = false;
  //elementBox.style.transition = `none`; // Clear the transition to stop movement
  window.removeEventListener(`touchmove`, moving,true);
}

function calculateElementCenter(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return { x: centerX, y: centerY };
}

let targetX = null;
let targetY = null;

function moving(event) {
  if (!isMoving) return;

  const speed = c / 6;
  console.log(speed);

  // Update target coordinates
  targetX = event.touches[0].clientX;
  targetY = event.touches[0].clientY;

  // Set the position of the element
  elementBox.style.left = targetX - elementBox.offsetWidth / 2 + `px`;
  elementBox.style.top = targetY - elementBox.offsetHeight / 2 + `px`;
}

elementBox.addEventListener(`touchstart`, startMoving,false);

window.addEventListener(`touchend`, stopMoving,false);