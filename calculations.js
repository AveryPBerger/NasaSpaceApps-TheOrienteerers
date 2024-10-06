class SpaceObjects {
  constructor(VoX_,VoY_,x_,y_,mass_) {
    this.Vo = [VoX_, VoY_];
    this.pos = [x_, y_];
    this.mass = mass_;
    this.r = 0;
  }
}

const x = 0;
const y = 1;
const squared = 2;
const EarthsMass = 5.972 * (10**24);
const GravitationalC = 6.6743 * (10**-11);
const timeInt = 0.1;

function CalculateDistance(spaceobj) {
  

  let coordinates = [];
  for (let i = 0; i < 1000; i++){
    coordinates.push([]);


    coordinates[i][x] = spaceobj.pos[x];
    coordinates[i][y] = spaceobj.pos[y];
    
    if(coordinates[y] <= 700000){
      console.log("Game Over");
      return;
    }

    spaceobj.r = (Math.sqrt(coordinates[i][x]**2 + coordinates[i][y]**2));
    let a = (GravitationalC * EarthsMass) / (spaceobj.r**2);
  
    let angle = Math.atan(spaceobj.pos[x]/ spaceobj.pos[y]);
    xAcceleration = Math.sin(angle) * a * Math.sign(spaceobj.pos[x]) *-1;
    yAcceleration = Math.cos(angle) * a * Math.sign(spaceobj.pos[y]) *-1;
  
    deltaX = (xAcceleration * (timeInt**2) /2 + spaceobj.Vo[x] * timeInt);
    deltaY = (yAcceleration * (timeInt**2) /2 + spaceobj.Vo[y] * timeInt);
  
    spaceobj.Vo[x] = 2*deltaX/timeInt - spaceobj.Vo[x];
    spaceobj.Vo[y] = 2*deltaY/timeInt - spaceobj.Vo[y];
    
    spaceobj.pos[x] += deltaX;
    spaceobj.pos[y] += deltaY;


  }
  console.log(coordinates);
  return (spaceobj.pos[x],spaceobj.pos[y]);
}
