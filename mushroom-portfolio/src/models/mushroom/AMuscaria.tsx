import * as THREE from "three";
import { Vector3 } from "three";
import { type MushroomInfo } from "./Mushroom.tsx";
import {Circle, useGLTF} from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { cloneAndScaleVector } from "../../utils/utils.ts";
import React, {useRef} from "react";
import {EffectComposer, Outline} from "@react-three/postprocessing";
import {CircularText} from "../../projects/CircularText.tsx";

interface AMuscariaGLTFResult extends GLTF {
    nodes: {
        Foot: THREE.Mesh;
        Collar: THREE.Mesh;
        Hat_1: THREE.Mesh;
        Hat_2: THREE.Mesh;
    };
}

const MUSH_INFO: MushroomInfo = {
    type: "AMuscaria",
    model: `${import.meta.env.BASE_URL}/assets/models/mush-musc.glb`,
    defaultScaleFactor: 0.05,
};

export function AMuscaria({
    scaleFactor = 1,
    hatScale = new Vector3(1.48, 1, 1.48),
    footScale = new Vector3(1, 1, 1),
    project = null,
    projectName = "",
    projectURL = "",
    ...props
}) {
    const { nodes } = useGLTF(MUSH_INFO.model) as unknown as AMuscariaGLTFResult;
    const ref = useRef(<AMuscaria></AMuscaria>);

    const [showProject, setShowProject] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);

    // ---- Scaling (calculé une seule fois) ----
    const globalScale = scaleFactor * MUSH_INFO.defaultScaleFactor;
    const finalHatScale = cloneAndScaleVector(hatScale, globalScale);
    const finalFootScale = cloneAndScaleVector(footScale, globalScale);

    // ---- Positions pré-calculées ----
    const collarPosY = 3 * finalFootScale.y;
    const hatPosY = 5 * finalFootScale.y;

    // ---- Matériaux réutilisés (optimisation GPU) ----
    const matWhite = <meshStandardMaterial color="white" flatShading
       emissive={hovered ? "hotpink" : "black"}
       emissiveIntensity={hovered ? 0.1 : 0}
    />;
    const matRed = <meshStandardMaterial color="tomato"
        flatShading
        emissive={hovered ? "hotpink" : "black"}
        emissiveIntensity={hovered ? 0.1 : 0}
    />;

    return (
        <group
            {...props}
            dispose={null}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                setShowProject((prev) => !prev)
            }}
            onPointerOut={(e) => {
                e.stopPropagation();
                setHovered(false);
                setShowProject((prev) => !prev)
            }}
            onClick={(e) => {
                e.stopPropagation();
                window.open(projectURL, "_blank");
            }}
            ref={ref}
        >

            {/* Pied */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Foot.geometry}
                position={[0, 0, 0]}
                scale={finalFootScale}
            >
                {matWhite}
            </mesh>

            {/* Col */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Collar.geometry}
                position={[0, collarPosY, 0]}
                scale={1.152 * MUSH_INFO.defaultScaleFactor}
                material={nodes.Collar.material}
            />

            {/* Chapeau */}
            <group position={[0, hatPosY, 0]} scale={finalHatScale}>

                <mesh castShadow receiveShadow geometry={nodes.Hat_1.geometry}>
                    {matRed}
                </mesh>

                <mesh castShadow receiveShadow geometry={nodes.Hat_2.geometry}>
                    {matWhite}
                </mesh>


            </group>
            <CircularText
                text={projectName}
                radius={0.2}
                y={0.2}
            />

            {project && showProject && project}

        </group>
    );
}

useGLTF.preload(MUSH_INFO.model);