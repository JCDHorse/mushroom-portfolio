import {Vector3} from "three";

export function randomFloat(max: number, min: number = 0) {
    return Math.random() * (max - min) + min;
}

export function randomFloatNeg() {
    return (Math.random() - 0.5) * 10
}

export function getRandomAngle(): number {
    return Math.random() * 2 * Math.PI;
}

export function cloneAndScaleVector(vector: Vector3, scale: number) {
    return new Vector3(vector.x * scale, vector.y * scale, vector.z * scale);
}

export function generatePointsInRing(center: Vector3, innerRadius: number, outerRadius: number, count = 0) {
    if (innerRadius < 0 || outerRadius < 0 || outerRadius <= innerRadius) {
        throw new Error("generatePointsInRing: invalid radius");
    }

    const points: Vector3[] = []

    for (let i = 0; i < count; i++) {
        // random angle between 0 and 2PI
        const angle = getRandomAngle();
        // random radius in the ring
        const radius = Math.sqrt(Math.random() * (outerRadius ** 2 - innerRadius ** 2) + innerRadius ** 2);

        const x = center.x + Math.cos(angle) * radius;
        const z = center.z + Math.sin(angle) * radius;
        const y = center.y;

        points.push(new Vector3(x, y, z));
    }

    return points;
}