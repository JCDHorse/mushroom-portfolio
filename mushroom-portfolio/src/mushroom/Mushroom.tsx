import {Foot} from "./Foot.tsx";
import {Hat} from "./Hat.tsx";
import React, {type JSX} from "react";
import type {GLTF} from "three-stdlib";
import {Vector3} from "three";
import {useGLTF} from "@react-three/drei";
import {MUSHROOMS} from "./MushroomList.ts";
import {generatePointsInRing, getRandomAngle, randomFloat} from "../utils.ts";
import {BaseModel} from "../BaseModel.tsx";
import {Porcini} from "./Porcini.tsx";
import {AMuscaria} from "./AMuscaria.tsx";
import {Chanterelle} from "./Chanterelle.tsx";

const colors = ['red', 'yellow', 'blue', 'magenta', 'cyan', 'orange'];

type MushroomProps = JSX.IntrinsicElements['group'] & {
    type: string;
    scaleFactor?: number;
}

type MushRoomFieldProps = {
    type: string;
    center: Vector3;
    innerRadius: number;
    outerRadius: number;
    count: number;
    maxScale: number;
    minScale: number;
}

export function Mushroom({
    type,
    scaleFactor = 1,
    ...props
} : MushroomProps) {

    const mushroomType = MUSHROOMS[type];

    if (!mushroomType) {
        throw new Error("Mushroom: Mushroom type invalid");
    }

    scaleFactor *= mushroomType.defaultScaleFactor;

    switch (type) {
        case "Porcini":
            return <Porcini scaleFactor={scaleFactor} {...props} />;
        case "AMuscaria":
            return <AMuscaria scaleFactor={scaleFactor} {...props} />;
        case "Chanterelle":
            return <Chanterelle scaleFactor={scaleFactor} {...props} />;
    }

    return <BaseModel src={mushroomType.model} scaleFactor={scaleFactor} {...props}/>
}

export function MushroomField({
    type = "AMuscaria",
    center = new Vector3(0, 0, 0),
    innerRadius = 0,
    outerRadius = 1,
    count = 1,
    maxScale = 1,
    minScale = 1,
 }: MushRoomFieldProps) {

    const mushroomType = MUSHROOMS[type];

    if (!mushroomType) {
        throw new Error("Mushroom: Mushroom type invalid");
    }

    const positions = generatePointsInRing(center, innerRadius, outerRadius, count);
    const scaleFactors = Array.from({length: count}, (_, __) => randomFloat(maxScale, minScale));

    const mushs = Array.from({length: count}, (_, i) => {
        return <Mushroom key={i} scaleFactor={scaleFactors[i]} rotation={[0, getRandomAngle(), 0]} position={positions[i]} type={type}/>
    });
    return <>{mushs}</>
}
