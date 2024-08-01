import { useEffect } from 'react'
import Pencil from './PencilClass.ts'

const BackgroundAnimation = () => {
    useEffect(() => {
        // pull the 'data' of the canvas on our page so we can manipulate it
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
  
    // set bounds of canvas to page size
    const windowHeighth = window.innerHeight
    const windowWidth = window.innerWidth
    
    
    if(canvas){
      canvas.style.background = 'skyblue'
      canvas.width = windowWidth
      canvas.height = windowHeighth
      const context = canvas.getContext("2d")
      
      // create an array of all pencils
      const allPencils: Pencil[] = []
      
      for(let i = 1; i <= 20; i++){
    
        const pencilTemplate = new Pencil()
        // pencilTemplate.resetPosition() // puts the pencils on the edges going in
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
    }, [])
    
    
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
  
  export default BackgroundAnimation