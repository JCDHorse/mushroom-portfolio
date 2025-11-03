import * as THREE from "three";
import {MeshToonMaterial, Vector3} from "three";
import { type MushroomInfo } from "./Mushroom.tsx";
import {GradientTexture, useGLTF} from "@react-three/drei";
import type {GLTF} from "three-stdlib";
import {cloneAndScaleVector} from "../../utils.ts";

interface PorciniGLTFResult extends GLTF {
    nodes: {
        Foot: THREE.Mesh
        Hat: THREE.Mesh
    };
    materials: {
        ['Material.002']: THREE.MeshStandardMaterial
        ['Material.001']: THREE.MeshStandardMaterial
    };
}

const MUSH_INFO: MushroomInfo = {
    type: "Porcini",
    model: "/assets/models/mush-porc.glb",
    defaultScaleFactor: 0.05,
}

export function Porcini({
    scaleFactor = 1,
    hatScale = new Vector3(1.48, 1, 1.48),
    footScale = new Vector3(1, 1, 1),
    ...props
}){
    const { nodes, materials } = useGLTF(MUSH_INFO.model) as unknown as PorciniGLTFResult;

    const finalHatScale = cloneAndScaleVector(hatScale, scaleFactor * MUSH_INFO.defaultScaleFactor);
    const finalFootScale = cloneAndScaleVector(footScale, scaleFactor * MUSH_INFO.defaultScaleFactor);

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Foot.geometry}
                material={materials['Material.002']}
                position={[0, 0, 0]}
                scale={finalFootScale}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Hat.geometry}
                material={materials['Material.001']}
                scale={finalHatScale}
                position={[0, 1.6 * finalFootScale.y, 0]}
            />
        </group>
    )
}

useGLTF.preload(MUSH_INFO.model);
