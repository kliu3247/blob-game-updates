class Game {
    constructor(images, sounds){
        this.images = images
        this.sounds = sounds
        this.blobImages = this.images.blobSprite
        this.coinImages = loadCoinImages(this.images.coinSprite)
        this.numCoins = gameSettings.numCoins
        this.remainingCoins = this.numCoins
        this.started = false
        this.over = false
        this.bloby = new BlobChar(this.blobImages, {x: gameSettings.blobyStartX, y: gameSettings.blobyStartY}, gameSettings.blobySize)
        this.coins = Array.from({ length: gameSettings.numCoins}, (el, i) => {
            return new Coin(this.coinImages, { x: gameSettings.coinSize + gameSettings.coinSize * i, y: gameSettings.coinLevel }, gameSettings.coinSomething)
        })
        this.background = new Background(this.images.bg)
        this.scoreboard = new Scoreboard()
        this.startButton = createButton('start')
        this.startButton.mousePressed(this.init)
        this.startScreen = new Overlay('play blob', 'use arrow buttons to move', this.startButton)
        this.score = 0
        this.gameOverScreen = null
        this.rock = new Rock(images.rocks, 5)
        this.rocktwo = new Rock(images.rocks, 10)
        this.rockthree = new Rock(images.rocks, 20)
    }

    init = () => {
        if(!this.started){
            this.coins = Array.from({ length: gameSettings.numCoins}, (el, i) => {
                        return new Coin(this.coinImages, { x: gameSettings.coinSize + gameSettings.coinSize * i, y: gameSettings.coinLevel }, gameSettings.coinSomething)
            })
            this.bloby = new BlobChar(this.blobImages, {x: gameSettings.blobyStartX, y: gameSettings.blobyStartY}, gameSettings.blobySize)
            this.started = true
            this.startButton.hide()
        }

    }

    checkCollisions(){
        this.coins.forEach((coin, idx) => {
            if(!coin.collected){
                if (checkCollision(this.bloby, coin)){
                    console.log("collided");
                    this.score ++;
                    this.scoreboard.update(this.score)
                    coin.collected = true;
                    this.remainingCoins --;
                }
            }
            
        })
    }

    checkRockCollisions(){
        if (checkRockCollision(this.bloby, this.rock)){
            console.log("rock collided");
            this.over = true;
        }
    }

    render(){
        this.background.render()
        this.scoreboard.render()
        this.coins.forEach(coin => coin.render())
        
        console.log(this.remainingCoins)
        if(this.remainingCoins == 0){
            this.coins = Array.from({ length: gameSettings.numCoins}, (el, i) => {
                return new Coin(this.coinImages, { x: gameSettings.coinSize + gameSettings.coinSize * i, y: gameSettings.coinLevel }, gameSettings.coinSomething)
            })

            this.remainingCoins = this.numCoins
        }

        if(!this.started && !this.over){
            this.startScreen.render()
        }
        if(this.over){
            this.gameOverScreen = new Overlay('game over! Your score:' + this.score, 'start again?', this.startButton)
            this.gameOverScreen.render()
            return
        }
        if(this.score > 10 && this.rocktwo.y < 400 && this.started){
            this.rocktwo.render()
        }
        if (this.score > 30 && this.rocktwo.y < 400 && this.started){
            this.rockthree.render()
        }
        if(this.rock.y < 400 && this.started){
            this.rock.render()
        }
        
         else {
            if(this.score > 10 && this.score < 30) {
                this.rock = new Rock(images.rocks, this.score/2)
                this.rocktwo = new Rock(images.rocks, this.score/2)
            } else if(this.score > 30){
                this.rock = new Rock(images.rocks, this.score/2)
                this.rocktwo = new Rock(images.rocks, this.score/2)
                this.rockthree= new Rock(images.rocks, this.score/2, )
            }
            else {
                this.rock = new Rock(images.rocks, 5)
            }
        }
        
    }

    update(){
        // game over state
        if(this.started && !this.over){
            this.bloby.update()
            this.coins.forEach(coin => coin.update())
            this.checkCollisions()
            this.checkRockCollisions()
        }
    }
}
