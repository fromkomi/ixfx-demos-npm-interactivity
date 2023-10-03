import { pointsTracker } from '../../ixfx/data.js';
const box = document.querySelector(`#box`);
let cValue;
box.addEventListener(`mousedown`, mouseDown, false);
window.addEventListener(`mouseup`, mouseUp, false);

function calculateElementCenter(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return { x: centerX, y: centerY };
}
async function distance(event) {
  let t = pointsTracker();
  const centerCoordinates = calculateElementCenter(box);
  let target = { x: centerCoordinates.x, y: centerCoordinates.y };
  const info = await t.seen(event.pointerId, { x: event.x, y: event.y });

  let a = info.values[0].x - target.x;
  let b = info.values[0].y - target.y;
  cValue = Math.hypot(a, b); // Store the value in cValue
}

function mouseUp() {
  window.removeEventListener(`mousemove`, move, true);
}

function mouseDown(event) {
  window.addEventListener(`mousemove`, move, true);
  distance();
}

function move(event) {
  const speed = cValue/10;
  box.style.top = event.clientY/speed + `px`;
  box.style.left = event.clientX/speed + `px`;
};