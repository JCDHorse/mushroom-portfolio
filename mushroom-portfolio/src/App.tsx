import {JSX, useState, useEffect} from 'react'
import './App.css'
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import {OrbitControls, OrthographicCamera, TransformControls, useGLTF} from '@react-three/drei'
import {Mushroom} from "./mushroom/Mushroom.tsx";
import {EffectComposer, Bloom} from "@react-three/postprocessing";
import {Tree} from "./Tree.tsx";
import * as THREE from "three";

function BackgroundColor() {
    const { scene } = useThree();

    useEffect(() => {
        scene.background = new THREE.Color('skyblue') // couleur de fond
    }, [scene])

    return null
}
function App() {

  return (
    <>
      <div id="canvas-container" style={{ width: '100%', height: '100vh' }}>
          <Canvas shadows camera={{ position: [0, 0.1, 0.4], rotation: [-Math.PI / 8, 0, 0]  }}>
              <BackgroundColor/>
              <mesh receiveShadow scale={[10, 10, 1]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[10, 10] } />
                  <meshStandardMaterial color={"green"}/>
              </mesh>
              <Tree position={[-0.9, 0, 0.9]} rotateY={Math.PI / 2} />
              <Tree position={[-0.9, 0, 0.7]} rotateY={Math.PI / 2} />
              <Tree position={[-0.9, 0, 0.5]} rotateY={Math.PI / 2} />
              <Tree position={[-0.9, 0, 0.3]} rotateY={Math.PI / 2} />
              <Tree position={[-0.9, 0, 0.1]} rotateY={Math.PI / 2} />
              <Tree position={[-0.9, 0, -0.1]} rotateY={Math.PI / 2} />
              <Tree position={[-0.9, 0, -0.3]} rotateY={Math.PI / 2} />
              <Tree position={[-0.9, 0, -0.5]} rotateY={Math.PI / 2} />
              <Tree position={[-0.9, 0, -0.7]} rotateY={Math.PI / 2} />
              <Tree position={[0.9, 0, 0.9]}  />
              <Tree position={[0.9, 0, -0.9]} />
              <Tree position={[-0.9, 0, -0.9]}/>

              <Mushroom castShadow hatColor={'#54e397'} footColor={'#d6aa73'} footXZScale={2.3} hatXZScale={10} hatYScale={2} position={[0.3, 0, 0.1]} scale={[1, 5, 1]}/>
              <Mushroom hatXZScale={5} position={[-0.6, 0, 0.4]}/>
              <Mushroom  hatXZScale={3} position={[-0.3, 0, -0.1]} />
              <Mushroom hatXZScale={2} position={[0.1,0,0.1]}  rotation={[ 0, 0, 0]}>
              </Mushroom>
              <Mushroom hatXZScale={4} hatYScale={5} position={[-0.1,0,0.1]}  rotation={[ 0, 0, 0]}>
              </Mushroom>
              <Mushroom hatXZScale={2} hatYScale={1} position={[-0.4,0,0.2]}  rotation={[ 0, 0, 0]}>
              </Mushroom>
              <Mushroom footXZScale={0.3} position={[-0.,0,0.4]} rotation={[ 0, 0, 0]}>
              </Mushroom>
              <ambientLight intensity={0.3} castShadow />
              <directionalLight position={[100, 400, 100]} intensity={0.3}   castShadow />
              <OrbitControls maxPolarAngle={Math.PI / 2.4} maxDistance={4} minDistance={1} enablePan={false}/>
              <EffectComposer>
                  <Bloom intensity={0.3} castShadow />
              </EffectComposer>
          </Canvas>
      </div>
    </>
  )
}

export default App
