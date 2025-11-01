import React, {type ComponentProps} from "react";
import {AMuscaria} from "./AMuscaria.tsx";
import {Chanterelle} from "./Chanterelle.tsx";
import {Porcini} from "./Porcini.tsx";
import {generatePointsInRing, getRandomAngle, randomFloat} from "../utils.ts";
import {Euler, Vector3} from "three";

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

type MushroomProps<T extends keyof MushroomComponentMap> = ComponentProps<MushroomComponentMap[T]> & {
    type: T,
}

export function Mushroom<T extends keyof MushroomComponentMap>(props: MushroomProps<T>) {
    const { type, ...rest } = props;
    const Component = MushroomRegistry[type];
    if (type !== "Chanterelle") {
        rest.scale = new Vector3(1, 1,1);
    }
    return (
        // @ts-ignore
        <Component {...rest}/>
    );
}

type MushroomFieldProps<T extends keyof MushroomComponentMap> = {
    type: T;
    center: Vector3;
    outerRadius: number;
    innerRadius: number;
    count: number;
    monoScaleRange?: {
        min: number;
        max: number;
    };
    hatXZScaleRange?: {
        min: number;
        max: number;
    };
    hatYScaleRange?: {
        min: number;
        max: number;
    };
    footXZScaleRange?: {
        min: number;
        max: number;
    }
    footYScaleRange?: {
        min: number;
        max: number;
    }
}

export function MushroomField<T extends keyof MushroomComponentMap>({
    hatYScaleRange = { min: 1, max: 1 },
    hatXZScaleRange = { min: 1, max: 1 },
    footYScaleRange = { min: 1, max: 1 },
    footXZScaleRange = { min: 1, max: 1 },
    monoScaleRange = { min: 1, max: 1 },
    ...props
}: MushroomFieldProps<T>) {
    const { type, center, outerRadius, innerRadius, count, ...rest } = props;
    const positions = generatePointsInRing(center, innerRadius, outerRadius, count);

    return (
        <>
            {positions.map((position, id) => {
                const finalPosition: number[] = [
                    center.x + position.x,
                    center.y + position.y,
                    center.z + position.z,
                ];

                const randomScale =
                    ({min, max}: {min: number, max: number}): number => {
                        if (min >= max) {
                            return max;
                        }
                        return randomFloat(max, min);
                    };

                // For mushrooms made in 2 blocks
                const hatXZScale = randomScale(hatXZScaleRange);
                const hatYScale = randomScale(hatYScaleRange);
                const hatScale = new Vector3(hatXZScale, hatYScale, hatXZScale);

                const footXZScale = randomScale(footXZScaleRange);
                const footYScale = randomScale(footYScaleRange);
                const footScale = new Vector3(footXZScale, footYScale, footXZScale);

                // For mushroom made in 1 block
                const scaleFactor = randomScale(monoScaleRange);
                const finalScale = new Vector3(scaleFactor, scaleFactor, scaleFactor);

                const finalRotation = new Euler(0, getRandomAngle(), 0);
                if (type === "AMuscaria") {
                    console.log(`${JSON.stringify(hatScale)}`);
                }

                return (
                    // @ts-ignore
                    <Mushroom
                        key={id}
                        type={type}
                        rotation={finalRotation}
                        hatScale={hatScale}
                        footScale={footScale}
                        scale={finalScale}
                        position={finalPosition}
                        {...rest}
                    />
                );
            })}
        </>
    );
}