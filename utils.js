const loadCoinImages = (objectsImg) => {
  const coinImages = Array.from({length:6}, (el, i) => {
    return objectsImg.get(i*84,0,84,84)
  })
  return coinImages
}

const loadBlobImages = (runImg) => {
  console.log(runImg)
  const runImages = Array.from({length:8}, (el, i) => {
    console.log(i, runImg)
    return runImg.get(i * 555, 12, 600, 600)
  })
  return runImages
}

function checkCollision(a,b){
  if(a.x + a.size/2 - 15 > b.x - b.size && 
  a.x + a.size/2 - 15 < (b.x) &&
  a.y < b.y &&
  a.y + a.size > b.y){
      return true;
  } else {
      return false;
  }
}

function checkRockCollision(a,b){
  //if x is too in front
  //a.x + a.size/2 > b.x - b.size &&
  //a.y + 5 < b.y
  if(a.x + a.size/2 > b.x - b.size &&
    a.x + a.size/2 - 65  < (b.x) &&
    a.y + 5 < b.y && a.y + a.size > b.y
    ){
      return true;
  } else {
      return false;
  }
}