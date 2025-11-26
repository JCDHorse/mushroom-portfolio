
import * as THREE from 'three';
import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import type { GLTF } from 'three-stdlib';
import type { MushroomInfo } from "./Mushroom.tsx";
import { Euler, Vector3 } from "three";
import { cloneAndScaleVector } from "../../utils/utils.ts";
import { useControls } from "leva";

interface MushLampGLTFResult extends GLTF {
    nodes: {
        Foot: THREE.Mesh;
        Hat: THREE.Mesh;
        Bulbs: THREE.Mesh;
    };
    materials: {
        ['Material.003']: THREE.MeshStandardMaterial;
        ['Material.001']: THREE.MeshStandardMaterial;
        ['material-lamp-on']: THREE.MeshStandardMaterial;
        ['material-lamp-off']: THREE.MeshStandardMaterial;
    };
}

const MUSH_INFO: MushroomInfo = {
    type: "MushLamp",
    model: `${import.meta.env.BASE_URL}/assets/models/mush-lamp.glb`,
    defaultScaleFactor: 0.05,
};

export function MushLamp({
     scaleFactor = 1,
     hatPositionY = 2.716,
     bulbsPositionY = 3.68,
     bulbsRotation = [0.025, 0.712, -0.984],
     bulbsScale = [-0.608, -0.307, -0.481],
     ...props
}) {
    const { nodes } = useGLTF(MUSH_INFO.model) as unknown as MushLampGLTFResult;

    const [lightOn, setLight] = useState(true);

    const lightIntensity = 0.6;

    const toggleLight = () => setLight(!lightOn);

    // ---- Scales ----
    const globalScale = scaleFactor * MUSH_INFO.defaultScaleFactor;
    const finalBulbScale = cloneAndScaleVector(new Vector3(...bulbsScale), globalScale);

    // ---- Rotations ----
    const bulbsEuler = new Euler(...bulbsRotation);

    // ---- Materials (instancés une seule fois) ----
    const matFoot = <meshPhongMaterial flatShading color="lightpurple" />;
    const matHat = <meshPhongMaterial flatShading color="#400e6b" />;

    const matBulb = (
        <meshPhongMaterial
            flatShading
            color={lightOn ? "#f6e495" : "#000000"}
            emissive={lightOn ? "#f3e6ac" : "#000000"}
            emissiveIntensity={1}
            transparent
            opacity={0.85}
        />
    );

    return (
        <group {...props} dispose={null} onClick={toggleLight}>

            {/* Pied */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Foot.geometry}
                scale={globalScale}
            >
                {matFoot}
            </mesh>

            {/* Chapeau */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Hat.geometry}
                position={[0, hatPositionY * globalScale, 0]}
                scale={globalScale}
            >
                {matHat}
            </mesh>

            {/* Ampoules */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bulbs.geometry}
                position={[0, bulbsPositionY * globalScale, 0]}
                rotation={bulbsEuler}
                scale={finalBulbScale}
            >
                {matBulb}
            </mesh>

            {/* Lumière / glow */}
            <group position={[0, 4.7 * globalScale, 0]}>
                {lightOn && (
                    <>
                        <pointLight
                            castShadow
                            intensity={lightIntensity}
                            color="#b486e1"
                            distance={0}
                        />

                        <mesh>
                            <sphereGeometry args={[0.2, 16, 16]} />
                            <meshBasicMaterial color="#d3b2f1" transparent opacity={0.009} />
                        </mesh>
                    </>
                )}
            </group>

        </group>
    );
}

useGLTF.preload(MUSH_INFO.model);

