import {Foot} from "./Foot.tsx";
import {Hat} from "./Hat.tsx";
import {type JSX} from "react";
import type {GLTF} from "three-stdlib";
import {Vector3} from "three";
import {useGLTF} from "@react-three/drei";

const colors = ['red', 'yellow', 'blue', 'magenta', 'cyan', 'orange'];

type MushroomProps = JSX.IntrinsicElements['group'] & {
    hatXZScale?: number;
    hatYScale?: number;
    footYScale?: number;
    footXZScale?: number;
    scale?: [x: number, y: number, z: number];
    hatColor?: string;
    footColor?: string;
}

const DEFAULT_SCALE_FACTOR = 0.01;

export function Mushroom({
        hatXZScale = 1,
        hatYScale = 1,
        footXZScale = 1,
        footYScale = 1,
        scale = [1, 1, 1],
        hatColor,
        footColor,
        ...props
    } : MushroomProps) {

    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
    const finalScale = new Vector3(scale[0] * DEFAULT_SCALE_FACTOR, scale[1] * DEFAULT_SCALE_FACTOR, scale[2] * DEFAULT_SCALE_FACTOR);
    const finalHatColor = hatColor || randomColor();
    const finalFootColor = footColor || randomColor();
    return (
        <group {...props} scale={finalScale} dispose={null}>
            <Foot castShadow color={finalFootColor} scale={[footXZScale, footYScale, footXZScale]} />
            <Hat color={finalHatColor} position={[0, 3, 0]} scale={[hatXZScale, hatYScale || 1, hatXZScale || 1]}/>
        </group>
    )
}

useGLTF.preload('/assets/models/mush-feet-0.glb')
useGLTF.preload('/assets/models/mush-hat-0.glb')
