import { Points, radianToDegree} from "https://unpkg.com/ixfx/dist/geometry.js";

const a = {x: 10, y: 10};
const b = {x: 20, y: 20};

// Calculates distance between point a and b
const distance = Points.distance(a, b); // Returns a number
console.log(distance);

// Calculate angle in radians between points a and b
const angleRad = Points.angle(a, b);
const angleDeg = radianToDegree(angleRad);