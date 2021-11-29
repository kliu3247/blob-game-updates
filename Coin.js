class Coin {
  constructor(images, {x,y}, size){
    this.x = x
    this.y = y
    this.size = size
    this.images = images
    this.imageCounter = 0
    this.collected = false
    this.boundingbox = new BoundingBox(this.x, this.y, this.size)

  }
  
  render(){
    if(!this.collected){
      image(this.images[this.imageCounter % (this.images.length - 1)], this.x, this.y, this.size, this.size)
    }
    //this.boundingbox.update(this.x, this.y)
    //this.boundingbox.render()
  }

  update(){
    this.imageCounter++
  }
}