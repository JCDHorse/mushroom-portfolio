import { useGLTF } from '@react-three/drei'
import { Vector3 } from 'three'
import {type JSX} from "react";

type BaseModelProps = JSX.IntrinsicElements['group'] & {
    src: string
    scaleFactor?: number
}

export function BaseModel({ src, scaleFactor = 1, ...props }: BaseModelProps) {
    const { nodes, materials } = useGLTF(src)
    return (
        <group {...props} scale={new Vector3(scaleFactor, scaleFactor, scaleFactor)}>
            {Object.values(nodes).map((node: any, i) => (
                node.geometry && (
                    <mesh key={i} geometry={node.geometry} material={materials[node.material?.name]} castShadow receiveShadow />
                )
            ))}
        </group>
    )
}
