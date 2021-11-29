// const canvasWidth = window.innerWidth
// const canvasHeight = window.innerHeight

let coinSprite, blobSprite
let images
let game
let sounds


function preload() {
  bg = loadImage('assets/unnamed.png')
  coinSprite = loadImage('assets/coin.png')
  blobSprite = loadImage('assets/character.png')
  rocks = loadImage('assets/rock.png')

  images = {bg, coinSprite, blobSprite, rocks}
  sounds = {}
}

function setup() {
  createCanvas(800, 400)
  // createCanvas(canvasWidth, canvasHeight)
  frameRate(12)

  game = new Game(images, sounds)
}

function draw() {
  game.render()
  checkKeys()
  game.update() 
}

function checkKeys() {
  if(keyIsDown(UP_ARROW)){
    game.bloby.jump()
    return
  } else if(keyIsDown(LEFT_ARROW)){
    game.bloby.moveLeft()
    return
  } else if(keyIsDown(RIGHT_ARROW)){
    game.bloby.moveRight()
    return       
  } else {
    game.bloby.render()
  }
}

function keyReleased(){
  if(keyCode === UP_ARROW){
    game.bloby.clearJump()
  }
}
