// import pencilPNG from './pencil.png'

// const AnimatedGrid = () => {

//   // create a pencil HTMLImageElement we can use on our canvas without actually drawing anything on the page yet
//   const pencilImg = new Image(512, 512)
//   pencilImg.src = pencilPNG
  
//   // pull the 'data' of the canvas on our page so we can manipulate it
//   const canvas = document.getElementById("canvas") as HTMLCanvasElement

//   // set bounds of canvas to page size
//   const windowHeighth = window.innerHeight
//   const windowWidth = window.innerWidth
  

//   const horizontalLeftover = windowWidth % 50
//   const pencilCols = (((windowWidth - horizontalLeftover +200) / 50) / 2)
//   console.log(`((windowWidth(${windowWidth}) - horizontalLeftover(${horizontalLeftover})) / 50) / 2 = ${pencilCols}`)


//   //evenly distribute leftover page size to each pencil spacing
//   const leftoverSpaceModifier = (windowWidth % 50) / pencilCols

//   // const startPoint = -100 + horizontalLeftover / 2
//   const midWayPoint = (pencilCols * (50 + leftoverSpaceModifier)) + (pencilCols * 50)
//   const renderingSpace = 100 - (horizontalLeftover / 2)
//   const endPoint = midWayPoint + (2 * renderingSpace)
//   console.log("midWayPoint: ", midWayPoint)
  
//   console.log("leftoverSpaceModifier: ", leftoverSpaceModifier)

//   class Pencil {
//     image: HTMLImageElement
//     xpos: number
//     ypos: number
//     size: number
//     speed: number
//     dx: number
//     label: number

//     constructor(image: HTMLImageElement, xpos: number, ypos: number, size: number, speed: number, label: number) {
//       this.image = image
//       this.xpos = xpos
//       this.ypos = ypos
//       this.size = size
//       this.speed = speed
//       this.label = label

//       this.dx = 1 * this.speed // delta x aka the change in xpos per animation frame
//     }

//     draw(context: CanvasRenderingContext2D){
//       if(context){
//         context.drawImage(pencilImg, this.xpos, this.ypos, this.size, this.size)
//       }
//     }

//     update(context: CanvasRenderingContext2D){
//       this.draw(context)

//       if(this.xpos > endPoint){
//         //reset pencil to start of page
//         this.xpos = -renderingSpace
//       }
//       context.font = "25px serif"
//       context.fillText(`${this.label}`, this.xpos+10, this.ypos+30)
//       this.xpos += this.dx
//     }
//   }
  
//   if(canvas){
//     canvas.style.background = 'skyblue'
//     canvas.width = windowWidth
//     canvas.height = windowHeighth
//     const context = canvas.getContext("2d")
    
//     // create an array of all pencils
//     const allPencils: Pencil[] = []
//     // const bigPencils: Pencil[] = []

//     // determine how many rows are required to fill the page based on window.innerHeight/windowHeighth/canvas.height* (same value) accounting for a small margin?
//     /* 
//       -pencil image size is 50 (henceforth called pencils)
//       -canvas height is h (it varies but its available data)
//       -num of rows is r (we're solving for it)
//       -m is the margin we want to remove from height usable for rows (either arbitrary, or maybe based on leftover space?)
//       m = h % 50 calculates leftover space if we wanted to max out on pencils
//       r = (h - m) / 50 AND WE LEAVE EVERY OTHER ROW BLANK (artistic choice)
    
//     */

//     /*
//     determine how much to space out pencils so that they are evenly displayed with no ONE BIG GAP
//       w = page width (given)
//       m = page margin (w % pencil size)
//       s = space between pencils (what we're solving for?) or (base it off the remainder)
//       a = number of pencils ()
//       b = number of spaces (a-1)

      
      
//     */
//     let verticalMargin = canvas.height % 50
    
//     // half the number of 50px rows we can fit
//     const pencilRows = Math.ceil(((canvas.height - verticalMargin) / 50) / 2)
    
    
//     console.log("pencilRows: ", pencilRows)

//     if( canvas.height - ((pencilRows - 1) * 100 + verticalMargin / 2) > 50 + verticalMargin / 2 ){
//       // trying to add a buffer so some page heights dont look weird (when theres a gap of <50 pixels between last row and page bottom)
//       verticalMargin = 100
//     }
    
//     let pencilCounter = 1

//     for(let i = 1; i <= pencilRows; i++){
//       const currentHeighth = (i - 1) * 100 + verticalMargin / 2
      
//       for(let j = 0; j <= pencilCols + 2; j++){
//         const startingXpos = j * 100 + leftoverSpaceModifier
      
//         const pencilTemplate = new Pencil(pencilImg, startingXpos, currentHeighth, 50, 1, pencilCounter)
//         if(i>18){
//           console.log(currentHeighth)
//         }
//         allPencils.push(pencilTemplate)
//         pencilCounter++
//       }
      
      
//     }

//     if(context){
      
//       // draw the pencils initially
//       // allPencils.forEach(pencil => pencil.draw(context))     doesnt seem to do anything/be necessary

//       console.log("canvas.width: ", canvas.width)
//       console.log("canvas.height: ", canvas.height)

//       // function that sets up an animation of pencils floating from left to right
//       const updatePencils = () => {
//           // set up an animation of the following process
//           requestAnimationFrame(updatePencils)
//           // erase all drawn pencils
//           context.clearRect(0, 0, windowWidth, windowHeighth)
//           // update position and redraw them
//           allPencils.map(pencil => {
//             pencil.update(context)
            
//           })
          
//           context.drawImage(pencilImg, 300, 300, 200, 200)
          
//         //black bars for measuring page
//           // for(let i = 1; i <= 11; i++){
//           //   const currentHeighth = (i - 1) * 100 + verticalMargin / 2
//           //   for(let j = 0; j <= 13; j++){
//           //     context.fillRect(j*100, currentHeighth, 50, 50)
//           //   }
//           // }

//         }
//         // call animation function
//         updatePencils()
//     }
//   }

//   return (
    
//       <canvas
//         id="canvas"
//         style={{
//           top: 0,
//           right: 0,
//           position: 'fixed',
//           zIndex: '-100',
//         }}
//       >
//       </canvas>
   
//   )
// }

// export default AnimatedGrid