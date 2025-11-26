import {type ComponentProps, type ReactNode} from "react";
import {AMuscaria} from "./AMuscaria.tsx";
import {Chanterelle} from "./Chanterelle.tsx";
import {Porcini} from "./Porcini.tsx";
import {generatePointsInRing, randomAngle, randomAngleRangeAroundZero, randomFloat} from "../../utils/utils.ts";
import {Euler, Vector3} from "three";
import type {ThreeEvent} from "@react-three/fiber";
import {MushLamp} from "./MushLamp.tsx";

export type MushroomType =
    "AMuscaria" |
    "Porcini" |
    "Chanterelle" |
    "MushLamp";

export interface MushroomInfo {
    type: MushroomType;
    model: string;
    defaultScaleFactor: number;
}

type MushroomComponentMap = {
    AMuscaria: typeof AMuscaria,
    Chanterelle: typeof Chanterelle,
    Porcini: typeof Porcini,
    MushLamp: typeof MushLamp,
}

const MushroomRegistry: MushroomComponentMap = {
    AMuscaria,
    Chanterelle,
    Porcini,
    MushLamp
}

type MushroomProps<T extends keyof MushroomComponentMap> = ComponentProps<MushroomComponentMap[T]> & {
    type: T,
    onClick?: (event: ThreeEvent<MouseEvent>) => void,
    scale: Vector3,
}

export function Mushroom<T extends keyof MushroomComponentMap>(props: MushroomProps<T>) {
    const { type, onClick, ...rest } = props;
    const Component = MushroomRegistry[type];
    if (type !== "Chanterelle") {
        rest.scale = new Vector3(1, 1,1);
    }
    return (
        // @ts-ignore
        <Component {...rest} onClick={onClick}/>
    );
}

type Range = number | {
    min: number;
    max: number;
};

type MushroomFieldProps<T extends keyof MushroomComponentMap> = {
    type: T;
    center: Vector3;
    outerRadius: number;
    innerRadius: number;
    count: number;
    monoScaleRange?: Range;
    hatXZScaleRange?: Range;
    hatYScaleRange?: Range;
    footXZScaleRange?: Range;
    footYScaleRange?: Range;
    rotationsRange?: {
        x: Range,
        z: Range
    }
}

export function MushroomField<T extends keyof MushroomComponentMap>({
    hatYScaleRange = { min: 1, max: 1 },
    hatXZScaleRange = { min: 1, max: 1 },
    footYScaleRange = { min: 1, max: 1 },
    footXZScaleRange = { min: 1, max: 1 },
    monoScaleRange = { min: 1, max: 1 },
    rotationsRange = {
        x: { min: (-1/16) * Math.PI, max: (1/16) * Math.PI },
        z: { min: (-1/16) * Math.PI, max: (1/16) * Math.PI }
    },
    ...props
}: MushroomFieldProps<T>) {
    const { type, center, outerRadius, innerRadius, count, ...rest } = props;
    const positions = generatePointsInRing(center, innerRadius, outerRadius, count);

    return (
        <>
            {positions.map((position, id) => {
                const finalPosition: number[] = [
                    center.x + position.position.x,
                    center.y + position.position.y,
                    center.z + position.position.z,
                ];

                const normScale = 0.5 + position.scale * (1 - 0.5);

                const randomScale =
                    (range: Range, scaleFactor: number): number => {
                        if (typeof range === "number") {
                            return range;
                        }
                        const { min, max } = { ...range};
                        if (min >= max) {
                            return max;
                        }
                        return randomFloat(max, min) * scaleFactor;
                    };

                // For mushrooms made in 2 blocks
                const hatXZScale = randomScale(hatXZScaleRange, normScale);
                const hatYScale = randomScale(hatYScaleRange, normScale);
                const hatScale = new Vector3(hatXZScale, hatYScale, hatXZScale);

                const footXZScale = randomScale(footXZScaleRange, normScale);
                const footYScale = randomScale(footYScaleRange, normScale);
                const footScale = new Vector3(footXZScale, footYScale, footXZScale);

                // For mushroom made in 1 block
                const scaleFactor = randomScale(monoScaleRange, normScale);
                const finalScale = new Vector3(scaleFactor * normScale, scaleFactor * normScale, scaleFactor * normScale);

                const randomRotation =
                    (range: Range): number => {
                        if (typeof range === "number") {
                            return range;
                        }
                        if (range.max == range.min) {
                            return range.min;
                        }
                        return randomAngleRangeAroundZero(range.min, range.max);
                    };

                let rotationX = randomRotation(rotationsRange.x);
                let rotationZ = randomRotation(rotationsRange.z);
                let rotationY = randomAngle();
                const finalRotation = new Euler(rotationX, rotationY, rotationZ);
                // const finalRotation = new Euler(0, randomAngle(), 0);

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