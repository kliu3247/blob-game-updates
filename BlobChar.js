class BlobChar{
  constructor(blobImages, {x,y}, size){
    this.x = x
    this.y = y
    this.startY = y
    this.size = size
    this.images = loadBlobImages(blobImages)
    this.imageCounter = 5
    this.direction = 1
    this.speed = 14
    this.leftCounter = 3
    this.leftIter = 1
    this.rightCounter = 5
    this.rightIter = 1

    this.accelerationX = 10
    this.accelerationY = 1
    this.velocityX = 0
    this.velocityY = 0
    this.drag = 2
    this.gravity = 2
    this.jumping = false
    this.jumpValue = 0
    this.jumpInterval = null
    this.score = 0;

    this.boundingbox = new BoundingBox(this.x, this.y, this.size)
  }

  animateJump = () => {
    if(this.direction > 0){
        this.nextImage(6, 8)
        this.velocityY += this.accelerationY
    }else{
        this.nextImage(2, 4)
        this.velocityY += this.accelerationY 
    }
  }

  clearJump = () => {
    clearInterval(this.jumpInterval)
    this.jumpValue = 1
  } 

  jump(){
    if(!this.jumping){
        this.jumpInterval = setInterval(this.animateJump, 15)
        setTimeout(this.clearJump, 500)
        this.jumping = true
        this.jumpValue = -1
        if(this.direction == 1){
          image(this.images[4], this.x, this.y, this.size, this.size)
        }
        else{
          image(this.images[3], this.x, this.y, this.size, this.size)
        }
    }else {
      if(this.direction == 1){
        image(this.images[4], this.x, this.y, this.size, this.size)
      }
      else{
        image(this.images[3], this.x, this.y, this.size, this.size)
      }
    }
  }

  update(){
    this.x += this.direction * this.velocityX
    this.y += this.jumpValue * 20
    this.keepOnScreen()
  }

  keepOnScreen(){
    if(this.y > 240 && this.y < 300){
      this.jumping = false   
      this.y = 240 
    }
    if(this.y < 240){
      this.jumping = false     
    }
}
  
  move(){
    this.x += this.direction * this.speed
  }
  
  moveLeft(){
    this.direction = -1
    
    if (this.leftCounter == 0 || this.leftCounter == 3) {
      this.leftIter = -1 * this.leftIter;
    }
    
    this.leftCounter = this.leftCounter + this.leftIter
    image(this.images[this.leftCounter], this.x, this.y, this.size, this.size)
    this.nextImage(5,9)
    this.move()

  }
  
  moveRight(){
    this.direction = 1
    this.move()
    if(this.rightCounter == 5 || this.rightCounter == 7){
      this.rightIter = -1 * this.rightIter;
    }
    this.rightCounter = this.rightCounter - this.rightIter
    image(this.images[this.rightCounter], this.x, this.y, this.size, this.size)
    this.nextImage(5,8)
  }
  
  nextImage(start, end){
    if (this.imageCounter < start){
      this.imageCounter = start
    } else if (this.imageCounter>end){
      this.imageCounter = start
    } else {
      this.imageCounter+=this.direction
    }
  }
  
  render(){
    //this.boundingbox.update(this.x, this.y)
    //this.boundingbox.render()
    // console.log(this.images)
    if(this.direction == 1) {
      image(this.images[4], this.x, this.y, this.size, this.size)
    } else {
      image(this.images[3], this.x, this.y, this.size, this.size)
    }
    this.imageCounter++
  }
}