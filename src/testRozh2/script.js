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
  initialLeft = currentLeft;
  touchStartX = event.touches[0].clientX;

  const centerCoordinates = calculateElementCenter(elementBox);
  let target = { x: centerCoordinates.x, y: centerCoordinates.y };
  const windowSize = [window.innerWidth, window.innerHeight];
  const t = pointsTracker();
  const info = await t.seen(event.pointerId, { x: event.touches[0].clientX, y: event.touches[0].clientY });

  let a = info.values[0].x - target.x;
  let b = info.values[0].y - target.y;
  c = Math.hypot(a, b); // Update 'c' based on pointer movement
}

function stopMoving() {
  isMoving = false;
  elementBox.style.transition = `none`; // Clear the transition to stop movement
}

function calculateElementCenter(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return { x: centerX, y: centerY };
}

function moving(event) {
  if (!isMoving) return;

  const positionX = event.touches[0].clientX - touchStartX;
  currentLeft = initialLeft + positionX;
  const boxWidth = elementBox.offsetWidth;
  const windowWidth = window.innerWidth;

  // Recalculate 'c' based on the current touch position
  const centerCoordinates = calculateElementCenter(elementBox);
  let a = event.touches[0].clientX - centerCoordinates.x;
  let b = event.touches[0].clientY - centerCoordinates.y;
  c = Math.hypot(a, b);

  // Calculate the speed based on 'c' (distance from touch point to center)
  let maxSpeed = 2; // Adjust this value to control the maximum speed
  let speed = maxSpeed * (1 - c / boxWidth); // Speed decreases as 'c' increases
  console.log(speed);
  //console.log(c); // Log the updated 'c' value
  elementBox.style.transform = `translateX(${currentLeft}px)`;
  elementBox.style.transition = `transform ${speed}s ease`; // Apply speed to the transition
}

elementBox.addEventListener(`touchstart`, startMoving);

elementBox.addEventListener(`touchend`, stopMoving);

elementBox.addEventListener(`touchmove`, moving);