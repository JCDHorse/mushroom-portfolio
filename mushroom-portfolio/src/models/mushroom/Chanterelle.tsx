import * as THREE from "three";
import { Vector3 } from "three";
import { type MushroomInfo } from "./Mushroom.tsx";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { cloneAndScaleVector } from "../../utils/utils.ts";

interface ChanterelleGLTFResult extends GLTF {
    nodes: {
        Chanterelle: THREE.Mesh;
    };
}

const MUSH_INFO: MushroomInfo = {
    type: "Chanterelle",
    model: `${import.meta.env.BASE_URL}/assets/models/mush-chant.glb`,
    defaultScaleFactor: 0.1,
};

export function Chanterelle({
                                scaleFactor = 1,
                                scale = new Vector3(1, 1, 1),
                                ...props
                            }) {
    const { nodes } = useGLTF(MUSH_INFO.model) as unknown as ChanterelleGLTFResult;

    // ---- Scale calculé une seule fois ----
    const finalScale = cloneAndScaleVector(scale, scaleFactor * MUSH_INFO.defaultScaleFactor);

    // ---- Matériau réutilisé (optimisation) ----
    const matYellow = <meshPhongMaterial flatShading color="yellow" />;

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Chanterelle.geometry}
                scale={finalScale}
            >
                {matYellow}
            </mesh>
        </group>
    );
}

useGLTF.preload(MUSH_INFO.model);
