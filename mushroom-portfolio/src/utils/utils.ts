import {Vector3} from "three";
import {noise, normalizedNoise} from "./perlin.ts";

export function randomFloat(max: number, min: number = 0) {
    return Math.random() * (max - min) + min;
}

export function randomFloatNeg() {
    return (Math.random() - 0.5) * 10
}

export function randomAngleRangeAroundZero(min: number, max: number) {
    const range = max - min;
    return (Math.random() - 0.5) * range;
}

export function randomAngle(): number {
    return Math.random() * 2 * Math.PI;
}

export function cloneAndScaleVector(vector: Vector3, scale: number) {
    return new Vector3(vector.x * scale, vector.y * scale, vector.z * scale);
}

// Fractal Brownian Noise
export function fbm(x: number, y: number, octaves = 4, lacunarity = 2.0, gain = 0.5) {
    let total = 0;
    let freq = 1;
    let amp = 1;

    for (let i = 0; i < octaves; i++) {
        total += noise(x * freq, y * freq) * amp;
        freq *= lacunarity;
        amp *= gain;
    }

    return total;
}

export function fbmNormalized(x: number, y: number, octaves = 4, lacunarity = 2.0, gain = 0.5) {
    let total = 0;
    let freq = 1;
    let amp = 1;

    for (let i = 0; i < octaves; i++) {
        total += normalizedNoise(x * freq, y * freq) * amp;
        freq *= lacunarity;
        amp *= gain;
    }

    const ampMax = (1 - Math.pow(gain, octaves)) / (1 - gain);

    return total / ampMax; // ➜ forcément dans [0, 1]
}


type MushroomPoint = {
    position: Vector3;
    scale: number;
};

export function generatePointsInRing(center: Vector3, innerRadius: number, outerRadius: number, count = 0, noiseScale: number = 1, threshold: number = 0.1) {
    if (innerRadius < 0 || outerRadius < 0 || outerRadius <= innerRadius) {
        throw new Error("generatePointsInRing: invalid radius");
    }

    const points: MushroomPoint[] = []

    while (points.length < count) {
        const angle = randomAngle();
        const radius = Math.sqrt(Math.random() * (outerRadius ** 2 - innerRadius ** 2) + innerRadius ** 2);

        const x = center.x + Math.cos(angle) * radius;
        const z = center.z + Math.sin(angle) * radius;
        const y = center.y;

        const v = fbmNormalized(x, z);
        if (v > threshold) {
            points.push({position: new Vector3(x, y, z), scale: v});
        }
    }

    return points;
}