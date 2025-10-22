import  {Vector3} from "three";
import * as THREE from "three";

export type MushroomType = {
    name: string;
    model: string;
    defaultScaleFactor: number;
    hatY: number | null;
};

const modelsRoot =  (model: string) => `/assets/models/${model}`;

export const MUSHROOMS: {[id: string]: MushroomType} = {
    "AMuscaria": {
        name: "AMuscaria",
        model: modelsRoot('mush-musc.glb'),
        defaultScaleFactor: 0.05,
        hatY: 5,
    },
    "Chanterelle": {
        name: "Chanterelle",
        model: modelsRoot('mush-chant.glb'),
        defaultScaleFactor: 0.1,
        hatY: null,
    },
    "Porcini": {
        name: "Porcini",
        model: modelsRoot('mush-porc.glb'),
        defaultScaleFactor: 0.1,
        hatY: 1.6,
    }
};