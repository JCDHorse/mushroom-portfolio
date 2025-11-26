import * as THREE from "three";
import { Vector3 } from "three";
import { type MushroomInfo } from "./Mushroom.tsx";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { cloneAndScaleVector } from "../../utils/utils.ts";

interface PorciniGLTFResult extends GLTF {
    nodes: {
        Foot: THREE.Mesh;
        Hat: THREE.Mesh;
    };
}

const MUSH_INFO: MushroomInfo = {
    type: "Porcini",
    model: `${import.meta.env.BASE_URL}/assets/models/mush-porc.glb`,
    defaultScaleFactor: 0.05,
};

export function Porcini({
                            scaleFactor = 1,
                            hatScale = new Vector3(1.48, 1, 1.48),
                            footScale = new Vector3(1, 1, 1),
                            ...props
                        }) {
    const { nodes } = useGLTF(MUSH_INFO.model) as unknown as PorciniGLTFResult;

    // ---- Scale calculations ----
    const globalScale = scaleFactor * MUSH_INFO.defaultScaleFactor;
    const finalHatScale = cloneAndScaleVector(hatScale, globalScale);
    const finalFootScale = cloneAndScaleVector(footScale, globalScale);

    // ---- Materials (instantiated once) ----
    const matFoot = <meshPhongMaterial flatShading color="white" />;
    const matHat = <meshPhongMaterial flatShading color="brown" />;

    return (
        <group {...props} dispose={null}>
            {/* Foot */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Foot.geometry}
                scale={finalFootScale}
            >
                {matFoot}
            </mesh>

            {/* Hat */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Hat.geometry}
                scale={finalHatScale}
                position={[0, 1.6 * finalFootScale.y, 0]}
            >
                {matHat}
            </mesh>
        </group>
    );
}

useGLTF.preload(MUSH_INFO.model);

