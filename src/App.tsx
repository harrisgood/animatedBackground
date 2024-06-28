import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import pencilPNG from './pencil.png'

function App() {
  const [count, setCount] = useState(0)

  // create a pencil HTMLImageElenment we can use on our canvas without actually drawing anything on the page yet
  const pencilImg = new Image(512, 512)
  pencilImg.src = pencilPNG
  const pencils = [[10, 10], [10, 25], [10, 40], [10, 55], [10, 70]]

  // create our canvas out here so its globally accessible
  

  console.log("pencil.height: ", pencilImg.height)
  
  

  useEffect(() => {
    renderCanvas()
  }, [])

  const renderCanvas = () => {
    const c = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = c.getContext('2d')
    if (!ctx) return
    //wipe canvas clean everytime (to get rid of pencils in previous location)
    ctx.clearRect(0, 0, c.width, c.height)
    
    console.log("canvas: ", c)
    // ctx.imageSmoothingEnabled = false
    
    // make sky blue background to take up whole page
    ctx.fillStyle = "skyblue"
    ctx.fillRect(0, 0, c.width , c.height)
    
    console.log("pencil: ", pencilImg)

    pencils.forEach(pencil => {
      ctx.drawImage(pencilImg, pencil[0], pencil[1], 5, 5)
    })
  }

  // function that makes pencils fly to the right
  /* 
    create a function that takes an array of 'pencils' and animates them to float to the right of the screen with canvas
      => when they reach the edge of the screen, they should respawn and float again, creating an endless animated background

      -set pencil spawns either in middle of screen nicely laid out or off screen on the way
      -translate pencil from current location to end of window in x dimension
      -when pencil reaches end of screen, set its position back to 'origin' end of screen and begin translation
        -repeat

      -store all pencil x / y coords in arrays in an array [[x1, y1], [x2, y2], [x3, y3]]
      -use an animation that smoothlty 'floats' (translates) pencil img to end of screen (or past it) 
    OR
      -mathematically increase x dimension of pencils until equal to or greater than canvas width
        -looping function to continually move them to the right and then move them back to the left
    EITHER WAY
      -
  */
  // const updatePencils = () => {
    
  // }

  // setInterval(updatePencils, 1)

  return (
    <>
      {/* <div className='pencils'>
        <img className='pencil' src={pencilPNG} alt='flying pencil' />
        <img className='pencil' src={pencilPNG} alt='flying pencil' />
        <img className='pencil' src={pencilPNG} alt='flying pencil' />
      </div> */}

      <div>
        <canvas
          id="canvas"
          style={{
            top: 0,
            right: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            position: 'fixed',
            zIndex: '-100',
          }}
        >

        </canvas>

        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
