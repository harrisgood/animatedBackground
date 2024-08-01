import pencilPNG from './pencil.png'

const Spinning = () => {
  // create a pencil HTMLImageElement we can use on our canvas without actually drawing anything on the page yet
  const pencilImg = new Image(512, 512)
  pencilImg.src = pencilPNG
  
  // pull the 'data' of the canvas on our page so we can manipulate it
  const canvas = document.getElementById("canvas") as HTMLCanvasElement

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

  class Pencil {
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

    // i bet we can remove some of these arguments and just do their calculations in here
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
      
      this.scale = getRandomDecimal(0.1, 0.25) // resizes image
      this.degree = Math.PI * 2 // current degree of the pencil in its rotation

      this.dDegree = getRandomDecimal(-0.1, 0.1)  // change in pencil degree
      this.dx = 1 * this.xspeed // delta x aka the change in xpos per animation frame
      this.dy = 1 * this.yspeed
    }

    draw(context: CanvasRenderingContext2D){
      if(context){
        // setTransform(a, b, c, d, e, f)
        // changes origin from (x,y) => (ax + cy + e, bx+ dy + f)
          // e is horizontal translation, f is vertical translation
          // when b and c are 0, a and d control horizontal and vertical scaling of ctx
          // when a and d are 1, b and c control the horizontal and vertical skewing of the ctx
            // so if we use setTransform(imgScaler, 0, 0, imgScaler, imgXpos, imgYpos)
              // we can set the context origin to be the center of the image

        // set context origin and scale to match center of image being drawn
        context.setTransform(this.scale, 0, 0, this.scale, this.xpos, this.ypos)
        context.rotate(this.degree)
        context.drawImage(this.image, -this.image.width / 2, -this.image.height / 2)
        // context.drawImage(pencilImg, this.xpos, this.ypos, this.size, this.size)
      }
    }

    IsOffPage(){
      // check if the pencil's current position will appear on the page or not
      let result = false

      // if pencil goes RIGHT off the page
      if(this.xpos > windowWidth && this.xDirection === 1){
        //reset pencil to start of page
        result = true
      }
      // if pencil goes LEFT off the page
      if(this.xpos + this.image.width * this.scale < 0 && this.xDirection === -1){
        //reset pencil to start of page
        result = true
      }
      // if pencil goes DOWN off the page
      if(this.ypos > windowHeighth && this.yDirection === 1){
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
      // console.log("this pencil? ",this)  
    }

    update(context: CanvasRenderingContext2D){
      let imgHeightModifier: number, imgWidthModifier: number
      // this.draw(context) 

      /*
      rotation
        context.rotate( degrees * Math.PI / 180)
          -will always rotate about the origin (0,0) which creates an orbiting effect
          -we can move the origin by using context.translate, to set it to the center of the pencil?

        1. context.setTransform() canvas origin to image center
        2. context.rotate() canvas to desired angle
        4. context.drawImage() at desired angle and position
        5. context.setTransform() back to original angle
      */

      //reset origin to default scale/position
//       context.setTransform(1, 0, 0, 1, 0, 0)
// /////////////////////WE MAY NEED THIS LINE//////////////////////////////////      
//       context.clearRect(0, 0, canvas.width, canvas.height)
///////////////////^^WE MAY NEED THIS LINE^^////////////////////////////////

      // check if pencil is still on page and needs a reset
      if(this.IsOffPage()){
        this.resetPosition()
      }

      this.xpos += this.dx * this.xDirection
      this.ypos += this.dy * this.yDirection
      this.degree += this.dDegree
      imgHeightModifier = this.image.width * this.scale * 2 + windowWidth
      imgWidthModifier = this.image.height * this.scale * 2 + windowHeighth
      this.rotatedXpos = ((this.xpos % imgWidthModifier) + imgWidthModifier) % imgWidthModifier - this.image.width * this.scale
      this.rotatedYpos = ((this.ypos % imgHeightModifier) + imgHeightModifier) % imgHeightModifier - this.image.height * this.scale

      this.draw(context) 

      // we may also need a counter rotation here (or along with above transform) to get back to original context
      // context.rotate(((-1 / 60) * Math.PI) / 180)
      

      // this.ypos += this.dx * this.yDirection
      // this.xpos += this.dx * this.xDirection
    }
  }
  
  if(canvas){
    canvas.style.background = 'skyblue'
    canvas.width = windowWidth
    canvas.height = windowHeighth
    const context = canvas.getContext("2d")
    
    // create an array of all pencils
    const allPencils: Pencil[] = []
    // const bigPencils: Pencil[] = []

    // const small = 50
    // const medium = 75
    // const large = 150

    for(let i = 1; i <= 20; i++){
  
      const pencilTemplate = new Pencil()
      // pencilTemplate.resetPosition()
      allPencils.push(pencilTemplate)
    }
   
    if(context){
      // create an animation function
      const updatePencils = () => {
          // set up an animation that repeats this function
          requestAnimationFrame(updatePencils)

          // erase all drawn pencils (and the whole canvas)
          // context.clearRect(0, 0, windowWidth, windowHeighth)
          
          context.setTransform(1, 0, 0, 1, 0, 0)
          context.clearRect(0, 0, canvas.width, canvas.height)
          
          // update position and redraw them
          allPencils.map(pencil => {
            pencil.update(context)
            
          })
        }
        // call the animation function
        updatePencils()
    }
  }
  
  return (
    
      <canvas
        id="canvas"
        style={{
          top: 0,
          right: 0,
          position: 'fixed',
          zIndex: '-100',
        }}
      >
      </canvas>
   
  )
}

export default Spinning