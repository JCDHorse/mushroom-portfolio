import { useEffect } from 'react'
import './App.css'
import { Canvas, useThree } from "@react-three/fiber";
import {OrbitControls, OrthographicCamera} from '@react-three/drei'
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
        <mesh receiveShadow  position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100] } />
            <meshStandardMaterial color={"green"}/>
        </mesh>
        <Mushroom
            type={"AMuscaria"} position={[0, 0, 0]}
        />
        <Mushroom
            type={"Chanterelle"}
            position={[1, 0, 1]}
        />
        <MushroomField
            type={"AMuscaria"}
            hatXZScaleRange={{min: 0.6, max: 2}}
            center={new Vector3(0,0,0)}
            outerRadius={3}
            innerRadius={0}
            count={12}/>
        <MushroomField
            type={"Porcini"}
            center={new Vector3(0,0,0)}
            footYScaleRange={{min: 2.6, max: 3}}
            footXZScaleRange={{min: 2.3, max: 3}}
            hatXZScaleRange={{min: 2.3, max: 5}}
            hatYScaleRange={{min: 2.2, max: 4}}
            outerRadius={2}
            innerRadius={0}
            count={25}/>
        <MushroomField
            type={"Chanterelle"}
            monoScaleRange={{min: 0.3, max: 1}}
            center={new Vector3(0,0,0)}
            outerRadius={3}
            innerRadius={0}
            count={95}/>
        <ambientLight intensity={Math.PI / 3}/>
        <directionalLight
            position={[2, 3, 2]}
            intensity={Math.PI / 4}
            castShadow
            shadow-mapSize-width={8192}
            shadow-mapSize-height={8192}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
        />
        <OrbitControls/>
        <OrthographicCamera
            makeDefault
            position={[2, 2, 2]} // Vue diagonale
            zoom={300} // Ajuste la taille apparente
            near={-200}
            far={200}
        />

        <EffectComposer>
            <Bloom intensity={0.6} castShadow />
        </EffectComposer>
        </>
    );
}

function App() {
  return (
    <>
      <h1 className="text-5xl text-center">Céline Dhordain</h1>
      <div className="h-lvh" id="canvas-container">
          <Canvas shadows >
              <Scene/>
          </Canvas>
      </div>
    </>
  )
}

export default App
