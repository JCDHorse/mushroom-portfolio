import type {GLTF} from "three-stdlib";
import * as THREE from "three";
import {type JSX} from "react";
import {useGLTF} from "@react-three/drei";

type FootGLTFResult = GLTF & {
    nodes: {
        Cylinder: THREE.Mesh
    }
    materials: {}
}

type FootProps = JSX.IntrinsicElements['group'] & {
    color: string;
};

export function Foot(props: FootProps) {
    const { nodes, materials } = useGLTF('/assets/models/mush-feet-0.glb') as FootGLTFResult
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder.geometry}
                material={nodes.Cylinder.material}
            >
                <meshPhongMaterial flatShading color={props.color} />
            </mesh>
        </group>
    )
}

