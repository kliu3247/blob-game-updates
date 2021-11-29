class Rock{
    constructor(img, speed){
        const startXVal = Math.random() * 700
        const speedRock = speed
        const rockSize = 30
        this.x = startXVal
        this.startY = 0
        this.y = this.startY
        this.startX = startXVal
        this.speed = speedRock
        this.size = rockSize
        this.rockImg = img
        this.boundingbox = new BoundingBox(this.x, this.y, this.size)

    }

    render(){
        console.log("falling")
        this.y += this.speed
        image(this.rockImg, this.x, this.y, this.size, this.size)
        //this.boundingbox.update(this.x, this.y)
        //this.boundingbox.render()
    }
}