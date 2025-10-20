import type {GLTF} from "three-stdlib";
import * as THREE from "three";
import {type JSX} from "react";
import {useGLTF} from "@react-three/drei";

type HatGLTFResult = GLTF & {
    nodes: {
        Sphere: THREE.Mesh
    }
    materials: {}
}

type HatProps = JSX.IntrinsicElements['group'] & {
    color: string;
};

export function Hat(props: HatProps) {
    const { nodes, materials } = useGLTF('/assets/models/mush-hat-0.glb') as HatGLTFResult
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere.geometry}
                material={nodes.Sphere.material}
            >
                <meshPhongMaterial flatShading color={props.color}/>
            </mesh>
        </group>
    )
}

