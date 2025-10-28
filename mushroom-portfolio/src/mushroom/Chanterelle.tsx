import * as THREE from "three";
import {Vector3} from "three";
import { type MushroomInfo } from "./Mushroom.tsx";
import {useGLTF} from "@react-three/drei";
import type {GLTF} from "three-stdlib";
import {cloneAndScaleVector} from "../utils.ts";

interface ChanterelleGLTFResult extends GLTF {
    nodes: {
        Chanterelle: THREE.Mesh
    }
    materials: {
        ['Material.001']: THREE.MeshStandardMaterial
    }
}

const MUSH_INFO: MushroomInfo = {
    type: "Chanterelle",
    model: "/assets/models/mush-chant.glb",
    defaultScaleFactor: 0.1,
}

export function Chanterelle({
    scaleFactor = 1,
    scale = new Vector3(1, 1, 1),
    ...props
}) {
    const { nodes, materials } = useGLTF(MUSH_INFO.model) as unknown as ChanterelleGLTFResult;
    const finalScale = cloneAndScaleVector(scale, MUSH_INFO.defaultScaleFactor * scaleFactor);
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Chanterelle.geometry}
                material={materials['Material.001']}
                scale={finalScale}
            />
        </group>
    );
}

useGLTF.preload(MUSH_INFO.model);
