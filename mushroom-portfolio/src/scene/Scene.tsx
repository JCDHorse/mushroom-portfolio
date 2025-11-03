import {Billboard, GradientTexture, Html, Text} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {type RefObject, useEffect, useRef} from "react";
import * as THREE from "three";
import Lightning from "./Ligthning.tsx";
import Postprocessing from "./Postprocessing.tsx";
import Mushrooms from "./Mushrooms.tsx";
import Camera from "./Camera.tsx";

function BackgroundColor() {
    const { scene } = useThree();
    useEffect(() => {
        scene.background = new THREE.Color('skyblue') // couleur de fond
    }, [scene])
    return null;
}

function SceneTitle() {
    const ref: RefObject<Text | null> = useRef(null);
    const { camera } = useThree();

    useFrame(() => {
    });

    return (
        <>
            <Billboard follow={true}  >
                <Text
                    ref={ref}
                    color={"#f2bfff"}
                    outlineColor={"#000000"}
                    outlineWidth={0.03}
                    fontWeight={"bold"}
                    position={[0,1,0]}
                    scale={0.2}>
                    Céline Dhordain
                </Text>
            </Billboard>
        </>
    )
}

export default function Scene() {
    return (
        <>
            <BackgroundColor/>

            {/*Main plane*/}
            <mesh receiveShadow  position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1000, 1000] } />
                <meshToonMaterial>
                    <GradientTexture stops={[0, 1]} colors={['#1c430e', '#8aaa49']} size={2048}/>
                </meshToonMaterial>
            </mesh>

            {/*<Billboard position={[0, 1, 0]}>*/}
            {/*    <Html as='div' style={{   borderRadius: 30, padding: 20, backgroundColor: "#0043EEAA", width: 250 }}>*/}
            {/*        <h1 style={{fontSize: "1.4rem", fontWeight: 'bolder', paddingLeft: 5}}>Hello!</h1>*/}
            {/*        <p style={{textAlign: "left"}}>*/}
            {/*            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus varius dolor sapien, sed*/}
            {/*            sodales eros at dapibus sagittis. Nullam ac elit vitae purus consequat blandit.*/}
            {/*        </p>*/}
            {/*    </Html>*/}
            {/*</Billboard>*/}

            <Mushrooms/>

            <SceneTitle/>
            <Postprocessing/>
            <Lightning/>
            <Camera/>
            <fog attach="fog" args={['#625ed5', -15, 200]} />

        </>
    );
}
