import React from "react";
import {AMuscaria} from "./AMuscaria.tsx";
import {Chanterelle} from "./Chanterelle.tsx";
import {Porcini} from "./Porcini.tsx";
import {generatePointsInRing} from "../utils.ts";
import type {Vector3} from "three";

export type MushroomType =
    "AMuscaria" |
    "Porcini" |
    "Chanterelle";

export interface MushroomInfo {
    type: MushroomType;
    model: string;
    defaultScaleFactor: number;
}

type MushroomComponentMap = {
    AMuscaria: typeof AMuscaria,
    Chanterelle: typeof Chanterelle,
    Porcini: typeof Porcini,
}

const MushroomRegistry: MushroomComponentMap = {
    AMuscaria,
    Chanterelle,
    Porcini,
}

export function Mushroom<T extends keyof MushroomComponentMap>(
    props: {
        type: T,
        position: Vector3
    } & React.ComponentProps<MushroomComponentMap[T]>) {
    const { type, ...rest } = props;
    const Component = MushroomRegistry[type];
    return React.createElement(Component, rest);
}

export function MushroomField<T extends keyof MushroomComponentMap>(
    props: {
        type: T,
        center: Vector3,
        outerRadius: number,
        innerRadius: number,
        count: number,
    } & React.ComponentProps<MushroomComponentMap[T]>) {

    const { type, center, outerRadius, innerRadius, count, position, ...rest } = props;
    const positions = generatePointsInRing(center, innerRadius, outerRadius, count);

    return (
        <>
            {positions.map((position, index) => (
                <Mushroom key={index} type={type} position={position}/>
            ))}
        </>
    );
}

