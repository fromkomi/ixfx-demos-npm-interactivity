import { pointsTracker } from "../../docs/ixfx/data.js";
const elementBox = document.querySelector(`#box`);

function normalize (value, min, max){
  let nor = (value-min)/(max-value); 
  return nor;
}
// console.log(normalize(300,0,1800));

// Calculate the center coordinates of the element
function calculateElementCenter(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const normalizeX = normalize(centerX,0,window.innerWidth);
  const normalizeY = normalize(centerY,0,window.innerHeight);
  return { x: normalizeX, y: normalizeY };
}

// Call the function to get the center coordinates
// const centerCoordinates = calculateElementCenter(element);

// console.log(centerCoordinates.x,centerCoordinates.y);
document.addEventListener(`pointermove`, async (event) => {
  let t = pointsTracker();
  const centerCoordinates = calculateElementCenter(elementBox);
  // console.log(centerCoordinates);
  let target = {x: centerCoordinates.x, y:centerCoordinates.y};
  const info = await t.seen(event.pointerId, { x: event.x, y: event.y });

  let a = info.values[0].x - target.x;
  let b = info.values[0].y - target.y;
  let c = Math.hypot(a, b);

  console.log(c);
});