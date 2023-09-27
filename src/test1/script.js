const myCar = document.querySelector(`#myCar`);
let isMoving = false;
let initialLeft = 0;
let currentLeft = 0; // Track the current position of the car
let touchStartX = 0;
let stepSize = 1;
let distance = 0;

function startMoving(event) {
  isMoving = true;
  initialLeft = currentLeft; // Update the initialLeft when you start moving
  touchStartX = event.clientX; 
  
}

function moveCar(event) {
  if (myCar && isMoving) {
    const windowWidth = window.innerWidth;
    const carWidth = myCar.offsetWidth;
    // const distanceRevative = Points.distance (middle)
    // Calculate the new position based on the pointer's position
    const getMiddle = (myCar) => {
      return {
        x : `${myCar.left + myCar.width/2}`,
        y : `${myCar.top +  myCar.height/2}`,
      };
    };
    console.log(getMiddle(myCar));
    const positionX = event.clientX - touchStartX;
    currentLeft = initialLeft + positionX;
    if (currentLeft < 0) {
      currentLeft = 0;
    } else if (currentLeft + carWidth > windowWidth) {
      currentLeft = windowWidth - carWidth;
    }
    // Replace the if statement with a ternary expression
    // 
    myCar.style.transition = `transform 0.01s`; // Adjust the duration as needed
    myCar.style.transform = `translateX(${currentLeft}px)`;

  
  };
};

function stopMoving(event) {
  if (isMoving) {
    isMoving = false;
    
    // Clear the transition when stopping movement
    myCar.style.transition = `none`;
    
    // Optionally, add deceleration logic here for a more realistic feel
  }
}


// Event listener for pointer down to start moving
// myCar.addEventListener(`touchstart`, startMoving);
// myCar.addEventListener(`touchmove`, moveCar);

// // Event listener for pointer up to stop moving
// myCar.addEventListener(`touchend`, stopMoving);
myCar.addEventListener(`pointerdown`, startMoving);
myCar.addEventListener(`pointermove`, moveCar);

document.addEventListener(`pointerup`, stopMoving);
// // Optional: Reset the car's position when the window is resized
// window.addEventListener(`resize`, () => {
//   currentLeft = initialLeft;
//   myCar.style.left = `${currentLeft}px`;
// })`;