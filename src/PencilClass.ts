import pencilPNG from './pencil.png'

// create a pencil HTMLImageElement we can use on our canvas without actually drawing anything on the page yet
const pencilImg = new Image(512, 512)
pencilImg.src = pencilPNG

// set bounds of canvas to page size
const windowHeighth = window.innerHeight
const windowWidth = window.innerWidth

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomDecimal = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const getRandomSignChanger = () => {
  const num = getRandomNumber(0, 1)
  if(num === 0){
    return -1
  }else {
    return 1
  }
}

export default class Pencil {
    image: HTMLImageElement // probably redundant to give every pencil the img src
    xpos: number
    ypos: number
    rotatedXpos: number
    rotatedYpos: number

    xspeed: number
    yspeed: number
    dx: number
    dy: number
    xDirection: number
    yDirection: number
    scale: number
    degree: number
    dDegree: number

    constructor() {
      this.image = pencilImg
      this.xpos = getRandomNumber(0,windowWidth)
      this.ypos = getRandomNumber(0, windowHeighth)
      
      this.rotatedXpos = 0 // position after accounting for rotation
      this.rotatedYpos = 0

      this.xspeed = getRandomDecimal(0.3, 1)
      this.yspeed = getRandomDecimal(0.3, 1)
      this.xDirection = getRandomSignChanger()
      this.yDirection = getRandomSignChanger()
      
      this.scale = getRandomDecimal(0.05, 0.13) // resizes image
      this.degree = Math.PI * 2 // current degree of the pencil in its rotation

      this.dDegree = getRandomDecimal(-0.04, 0.04)  // change in pencil degree
      this.dx = 1 * this.xspeed // delta x aka the change in xpos per animation frame
      this.dy = 1 * this.yspeed
    }

    draw(context: CanvasRenderingContext2D){
      if(context){

        // set context origin and scale to match center of image being drawn
        context.setTransform(this.scale, 0, 0, this.scale, this.xpos, this.ypos)
        context.rotate(this.degree)
        context.drawImage(this.image, -this.image.width / 2, -this.image.height / 2)
        
      }
    }

    IsOffPage(){
      // check if the pencil's current position will appear on the page or not
      let result = false

      // if pencil goes RIGHT off the page
      if(this.xpos - this.image.width * this.scale > windowWidth && this.xDirection === 1){
        //reset pencil to start of page
        result = true
      }
      // if pencil goes LEFT off the page
      if(this.xpos + this.image.width * this.scale < 0 && this.xDirection === -1){
        //reset pencil to start of page
        result = true
      }
      // if pencil goes DOWN off the page
      if(this.ypos - this.image.height * this.scale > windowHeighth && this.yDirection === 1){
        result = true
      }
      // if pencil goes UP off the page
      if(this.ypos + this.image.height * this.scale < 0 && this.yDirection === -1){
        result = true
      }
      return result
    }

    resetPosition(){
      // get a new position and direction for the pencil (when they go off the page)
      
      const side = getRandomNumber(1, 4)
  
      if(side === 1){
        // spawn off to the left side of page
        this.xpos = 0 - this.image.width * this.scale
        this.ypos = getRandomNumber(0, windowHeighth - this.image.height * this.scale)
        this.xDirection = 1
        this.yDirection = getRandomSignChanger()
      }else if(side === 2){
        // spawn off to the top side of page
        this.xpos = getRandomNumber(0, windowWidth - this.image.width * this.scale)
        this.ypos = 0 - this.image.height * this.scale
        this.xDirection = getRandomSignChanger()
        this.yDirection = 1
      }else if(side === 3){
        // spawn off to the right side of page
        this.xpos = windowWidth
        this.ypos = getRandomNumber(0, windowHeighth - this.image.height * this.scale)
        this.xDirection = -1
        this.yDirection = getRandomSignChanger()
      }else if(side === 4){
        // spawn off to the bottom side of page
        this.xpos = getRandomNumber(0, windowWidth - this.image.width * this.scale)
        this.ypos = windowHeighth
        this.xDirection = getRandomSignChanger()
        this.yDirection = -1
      } 
    }

    update(context: CanvasRenderingContext2D){
      // unused variables for handling margins when pencils go off page
      let imgHeightModifier: number, imgWidthModifier: number

      // check if pencil is still on page and needs a reset
      if(this.IsOffPage()){
        this.resetPosition()
      }

      this.xpos += this.dx * this.xDirection
      this.ypos += this.dy * this.yDirection
      this.degree += this.dDegree

      // unused code to handle margins when pencils go off page
      imgHeightModifier = this.image.width * this.scale * 2 + windowWidth
      imgWidthModifier = this.image.height * this.scale * 2 + windowHeighth
      this.rotatedXpos = ((this.xpos % imgWidthModifier) + imgWidthModifier) % imgWidthModifier - this.image.width * this.scale
      this.rotatedYpos = ((this.ypos % imgHeightModifier) + imgHeightModifier) % imgHeightModifier - this.image.height * this.scale

      this.draw(context) 
    }
  }