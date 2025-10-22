import {JSX, useState, useEffect} from 'react'
import './App.css'
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import {OrbitControls, OrthographicCamera, TransformControls, useGLTF} from '@react-three/drei'
import {Mushroom, MushroomField} from "./mushroom/Mushroom.tsx";
import {EffectComposer, Bloom} from "@react-three/postprocessing";
import {Tree, TreeField} from "./Tree.tsx";
import * as THREE from "three";
import {Vector3} from "three";

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
              <TreeField center={new Vector3(0,0,0)} innerRadius={3} outerRadius={5} count={1000}/>
              <MushroomField maxScale={1} minScale={0.4} type={"Porcini"} center={new Vector3(0,0,0)} innerRadius={2} outerRadius={3} count={200}/>
              <MushroomField maxScale={1.2} minScale={0.4} type={"AMuscaria"} center={new Vector3(0,0,0)} innerRadius={1} outerRadius={2} count={100}/>
              <MushroomField maxScale={1} minScale={0.4} type={"Chanterelle"} center={new Vector3(0,0,0)} innerRadius={0} outerRadius={1} count={100}/>

              <ambientLight intensity={Math.PI / 10} castShadow />
              <directionalLight position={[-5, 8, -5]} intensity={2}   castShadow />
              <OrbitControls/>
              <EffectComposer>
                  <Bloom intensity={0.3} castShadow />
              </EffectComposer>
          </Canvas>
      </div>
    </>
  ) }

export default App
