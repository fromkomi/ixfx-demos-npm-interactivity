import { pointsTracker, numberTracker, pointTracker } from "../../ixfx/data.js";
import { Points } from "../../ixfx/geometry.js";

const settings = Object.freeze({
  element: /**@type {HTMLElement} */(document.querySelector(`#box`)),
  consoleEl: /**@type {HTMLElement} */(document.querySelector(`#console`)),
  minimumDistanceNeeded: 80,
  elementSize: 300,
});

let state = Object.freeze({
  touchTracker: pointsTracker({ storeIntermediate: false }),
  /**@type {Boolean} */
  isMovable: false,
  centroid: pointTracker()
});

const use = () => {
  const { touchTracker, centroid } = state;
  const { consoleEl, element, minimumDistanceNeeded } = settings;
  const byAge = [...touchTracker.trackedByAge()];

  consoleEl.textContent = `${byAge.length}`;

  if (byAge.length === 2){
    const distanceAbs = Points.distance(byAge[0].last, byAge[1].last);
    if (distanceAbs >= 120) {
      saveState({isMovable: true});
      const centroid = Points.centroid(...touchTracker.last());
      state.centroid.seen(centroid);
      positionElement(element, state.centroid.last, settings.elementSize);

    } else {
      saveState({ isMovable: false });
    }
  } else {
    state.centroid.reset();
  }
};

const update = () => {
  const { element, elementSize, consoleEl } = settings;
  const {isMovable, centroid} = state;

  if (isMovable)
  {
    if (centroid.initial === undefined) {
      //positionElement(element, { x: -1000, y: -1000 }, elementSize);
    }
    if (centroid.last === undefined) {
      //positionElement(element, { x: -1000, y: -1000 }, elementSize);
    }
    else {
      positionElement(element, centroid.last, elementSize);
    }
  }
};

const setup = () => {
  const { element } = settings;
  element.addEventListener(`pointerdown`, event => startTracking(event));
  element.addEventListener(`pointermove`, event => startTracking(event));
  element.addEventListener(`pointerleave`, event => stopTracking(event));
  window.addEventListener(`pointerup`, event => stopTracking(event));
  document.addEventListener(`wheel`, event => {
    event.preventDefault();
  }, { passive:false });

  window.addEventListener(`contextmenu`, function(event) { event.preventDefault(); });
  //loop();
};
    
const loop = () => {
  update();
  use();

  window.requestAnimationFrame(loop);
};

setup();
function stopTracking(event){
  //const { touchTracker } = state;
  state.touchTracker.delete(event.pointerId.toString());
  update();
  use();
}

async function startTracking(event) {
  if (event.pointerType === `mouse`) return;
  event.preventDefault();

  const { touchTracker } = state;
  await touchTracker.seen(event.pointerId.toString(), { x: event.x, y: event.y});

  update();
  use();
}

const positionElement = (element, point, size) => {
  if (!element)
    return;
  element.style.left = (point.x - size / 2) + `px`;
  element.style.top = (point.y - size / 2) + `px`;
};

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}