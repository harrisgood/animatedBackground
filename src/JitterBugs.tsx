import pencilPNG from './pencil.png'

const JitterBugs = () => {

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

  const getRandomSignChanger = () => {
    const num = getRandomNumber(0, 1)
    if(num === 0){
      return -1
    }else {
      return 1
    }
  }

  class Pencil {
    image: HTMLImageElement
    xpos: number
    ypos: number
    size: number
    xspeed: number
    yspeed: number
    dx: number
    dy: number
    xDirection: number
    yDirection: number
    label: number

    constructor(image: HTMLImageElement, xpos: number, ypos: number, size: number, xspeed: number, yspeed: number, xDirection: number, yDirection: number, label: number) {
      this.image = image
      this.xpos = xpos
      this.ypos = ypos
      this.size = size
      this.xspeed = xspeed
      this.yspeed = yspeed
      this.xDirection = xDirection
      this.yDirection = yDirection
      this.label = label

      this.dx = 1 * this.xspeed // delta x aka the change in xpos per animation frame
      this.dy = 1 * this.yspeed
    }

    draw(context: CanvasRenderingContext2D){
      if(context){
        context.drawImage(pencilImg, this.xpos, this.ypos, this.size, this.size)
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
      if(this.xpos + this.size < 0 && this.xDirection === -1){
        //reset pencil to start of page
        result = true
      }
      // if pencil goes DOWN off the page
      if(this.ypos > windowHeighth && this.yDirection === 1){
        result = true
      }
      // if pencil goes UP off the page
      if(this.ypos + this.size < 0 && this.yDirection === -1){
        result = true
      }
      return result
    }

    resetPosition(){
      // get a new position and direction for the pencil (when they go off the page)
      
      const side = getRandomNumber(1, 4)
  
      if(side === 1){
        // spawn off to the left side of page
        this.xpos = 0 - this.size
        this.ypos = getRandomNumber(0, windowHeighth - this.size)
        this.xDirection = 1
        this.yDirection = getRandomSignChanger()
      }else if(side === 2){
        // spawn off to the top side of page
        this.xpos = getRandomNumber(0, windowWidth - this.size)
        this.ypos = 0 - this.size
        this.xDirection = getRandomSignChanger()
        this.yDirection = 1
      }else if(side === 3){
        // spawn off to the right side of page
        this.xpos = windowWidth
        this.ypos = getRandomNumber(0, windowHeighth - this.size)
        this.xDirection = -1
        this.yDirection = getRandomSignChanger()
      }else if(side === 4){
        // spawn off to the bottom side of page
        this.xpos = getRandomNumber(0, windowWidth - this.size)
        this.ypos = windowHeighth
        this.xDirection = getRandomSignChanger()
        this.yDirection = -1
      }
      
    }
    update(context: CanvasRenderingContext2D){
      this.draw(context)
      
      if(this.IsOffPage()){
        this.resetPosition()
      }

      context.font = "25px serif"
      context.fillText(`${this.label}`, this.xpos+10, this.ypos+30)
      this.ypos += this.dx * this.yDirection
      this.xpos += this.dx * this.xDirection

      // decide if we should change x or y directions
      const randomNumX = getRandomNumber(1, 10000)
      const randomNumY = getRandomNumber(1, 10000)
      if(randomNumX > 9980){ // ??% chance to change x direction
        this.xDirection *= -1
      }
      if(randomNumY > 9990){ // ??% chance to change y direction
        this.yDirection *= -1
      }
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
      let size = getRandomNumber(20, 50)
      const sizeDeterminer = getRandomNumber(1, 100)
      if(sizeDeterminer > 60){ // 61 to 90 gives a medium pencil, 29% chance
        size = getRandomNumber(65, 95)
      }else if(sizeDeterminer > 90){ // 91 gives a large pencil, 9% chance
        size = getRandomNumber(135, 180)
      }


      const pencilTemplate = new Pencil(pencilImg, 500, 100 * i, size, 1, 0, 1, 0.35, size)
      pencilTemplate.resetPosition()
      allPencils.push(pencilTemplate)
    }
   
    
    

    if(context){
      
      // draw the pencils initially
      // allPencils.forEach(pencil => pencil.draw(context))     doesnt seem to do anything/be necessary


      // function that sets up an animation of pencils floating from left to right
      
      const updatePencils = () => {
          // set up an animation of the following process
          requestAnimationFrame(updatePencils)
          // erase all drawn pencils
          context.clearRect(0, 0, windowWidth, windowHeighth)
          
          // update position and redraw them
          allPencils.map(pencil => {
            pencil.update(context)
            
          })

          
          
          // context.drawImage(pencilImg, 300, 300, 200, 200)
          
        //black bars for measuring page
          // for(let i = 1; i <= 11; i++){
          //   const currentHeighth = (i - 1) * 100 + verticalMargin / 2
          //   for(let j = 0; j <= 13; j++){
          //     context.fillRect(j*100, currentHeighth, 50, 50)
          //   }
          // }

        }
        // call animation function
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

export default JitterBugs