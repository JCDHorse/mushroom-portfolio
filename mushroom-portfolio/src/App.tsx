import {type RefObject, useEffect, useRef} from 'react'
import './App.css'
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import Scene from "./scene/Scene.tsx";

function App() {
  return (
    <>
      <div className="h-lvh" id="canvas-container">
          <Canvas shadows >
              <Scene/>
          </Canvas>
      </div>
    </>
  )
}

export default App
