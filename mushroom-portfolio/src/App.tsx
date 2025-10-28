import { useEffect } from 'react'
import './App.css'
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'
import {Mushroom, MushroomField} from "./mushroom";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { TreeField } from "./Tree.tsx";
import * as THREE from "three";
import { Vector3 } from "three";

function BackgroundColor() {
    const { scene } = useThree();
    useEffect(() => {
        scene.background = new THREE.Color('skyblue') // couleur de fond
    }, [scene])
    return null;
}

function Scene() {
    return (
        <>
            <BackgroundColor/>
            <mesh receiveShadow scale={[10, 10, 1]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10, 10] } />
                <meshStandardMaterial color={"green"}/>
            </mesh>
            <Mushroom
                type={"AMuscaria"}
            />
            <Mushroom
                type={"Chanterelle"}
                position={[1, 0, 1]}
            />
            <Mushroom
                type={"Porcini"}
                position={[-1, 0, -1]}
                scaleFactor={2}
                hatScale={new Vector3(2, 2, 2)}
            />
            <MushroomField type={"Porcini"} center={new Vector3(0,0,0)} outerRadius={2} innerRadius={0} count={1000}/>
            <TreeField center={new Vector3(0,0,0)} innerRadius={3} outerRadius={5} count={1000}/>
            <ambientLight intensity={Math.PI / 4}/>
            <directionalLight position={[-5, 8, -5]} intensity={2}   castShadow />
            <OrbitControls/>
            <EffectComposer>
                <Bloom intensity={0.3} castShadow />
            </EffectComposer>
        </>
    );
}

function App() {
  return (
    <>
      <div id="canvas-container" style={{ width: '100%', height: '100vh' }}>
          <Canvas shadows camera={{ position: [0, 0.1, 0.4], rotation: [-Math.PI / 8, 0, 0]  }}>
              <Scene/>
          </Canvas>
      </div>
    </>
  )
}

export default App
