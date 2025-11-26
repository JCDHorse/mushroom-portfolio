import { Billboard, GradientTexture, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import Lightning from "./Ligthning.tsx";
import Postprocessing from "./Postprocessing.tsx";
import Mushrooms from "./Mushrooms.tsx";
import Camera from "./Camera.tsx";
import {ProjectBillboard} from "../projects/ProjectBillboard.tsx";
import {TreeField} from "../models/Tree.tsx";
import {Vector3} from "three";

// ---------------- BACKGROUND ---------------- //

function BackgroundColor() {
    const { scene } = useThree();

    useEffect(() => {
        scene.background = new THREE.Color("skyblue");
    }, [scene]);

    return null;
}

// ---------------- TITLE TEXT ---------------- //

function SceneTitle() {
    const ref = useRef<Text>(null);

    return (
        <Billboard follow position={[0, 0, 0]}>
            <Text
                ref={ref}
                color="#f2bfff"
                outlineColor="#000000"
                outlineWidth={0.09}
                fontWeight="bold"
                position={[0, 1.4, 0]}
                scale={0.2}
            >
                Céline Dhordain
            </Text>
            <Text
                color="#f2bfff"
                outlineColor="#000000"
                outlineWidth={0.03}
                fontWeight="bold"
                position={[0, 1.2, 0]}
                scale={0.1}
            >
                Cliquez sur les amanites pour accèder a mes projets
            </Text>
            <Text
                color="cyan"
                outlineColor="#000000"
                outlineWidth={0.03}
                fontWeight="bold"
                position={[-2, 1.4, 0]}
                scale={0.1}
                onClick={e => {
                    window.open(`${import.meta.env.BASE_URL}/assets/resume/resume.pdf`)
                }}
            >
                [CV]
            </Text>
        </Billboard>
    );
}

// ---------------- MAIN SCENE ---------------- //

export default function Scene() {
    return (
        <>
            <BackgroundColor />

            {/* Ground */}
            <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <planeGeometry args={[1000, 1000]} />
                <meshToonMaterial>
                    <GradientTexture
                        stops={[0, 1]}
                        colors={["#1c430e", "#8aaa49"]}
                        size={2048}
                    />
                </meshToonMaterial>
            </mesh>

            {/* Mushrooms */}
            <Mushrooms />
            
            {/*<TreeField center={new Vector3(0, 0, 0)} innerRadius={10} outerRadius={15} count={50}/>*/}

            {/* Scene title */}
            <SceneTitle />

            {/* Effects */}
            <Postprocessing />
            <Lightning />
            <Camera />

            {/* Fog */}
            <fog attach="fog" args={["#625ed5", -15, 200]} />

            {/*<ProjectBillboard*/}
            {/*    projectName={"Mushroom portfolio"}*/}
            {/*    projectURL={"https://github.com/JCDHorse/mushroom-portfolio"}*/}
            {/*    projectDescription={"Portfolio en 3D avec des champignons"}*/}
            {/*/>*/}
        </>
    );
}

