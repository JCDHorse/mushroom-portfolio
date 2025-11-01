import * as THREE from "three";
import {Vector3} from "three";
import { type MushroomInfo } from "./Mushroom.tsx";
import {useGLTF} from "@react-three/drei";
import type {GLTF} from "three-stdlib";
import {cloneAndScaleVector} from "../utils.ts";

interface AMuscariaGLTFResult extends GLTF {
    nodes: {
        Foot: THREE.Mesh;
        Collar: THREE.Mesh;
        Hat_1: THREE.Mesh;
        Hat_2: THREE.Mesh;
    };
    materials: {
        ["Material.002"]: THREE.MeshStandardMaterial;
        ["Material.003"]: THREE.MeshStandardMaterial;
    };
}

const MUSH_INFO: MushroomInfo = {
    type: "AMuscaria",
    model: "/assets/models/mush-musc.glb",
    defaultScaleFactor: 0.05,
}

export function AMuscaria({
    scaleFactor = 1,
    hatScale = new Vector3(1.48, 1, 1.48),
    footScale = new Vector3(1, 1, 1),
    ...props
}) {
    const { nodes, materials } = useGLTF(MUSH_INFO.model) as unknown as AMuscariaGLTFResult;


    const finalHatScale = cloneAndScaleVector(hatScale, scaleFactor * MUSH_INFO.defaultScaleFactor);
    const finalFootScale = cloneAndScaleVector(footScale, scaleFactor * MUSH_INFO.defaultScaleFactor);
    console.log(`Inside: ${JSON.stringify(finalHatScale)}`);

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
                geometry={nodes.Collar.geometry}
                material={nodes.Collar.material}
                position={[0, 3 * finalFootScale.y, 0]}
                rotation={[0, 0, 0]}
                scale={1.152 * MUSH_INFO.defaultScaleFactor}
            />
            <group position={[0, 5 * finalFootScale.y, 0]} scale={finalHatScale}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Hat_1.geometry}
                    material={materials['Material.003']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Hat_2.geometry}
                    material={nodes.Hat_2.material}
                />
            </group>
        </group>
    );
}

useGLTF.preload(MUSH_INFO.model);