import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function Postprocessing() {
    return (
        <EffectComposer>
            <Bloom
                luminanceThreshold={0}
                luminanceSmoothing={0.9}
                height={300}
            />

            <Vignette
                eskil={false}
                offset={0.1}
                darkness={0.3}
            />

            {/*
                SSAO examples kept for reference, but commented out cleanly.
                To enable later, pick your preferred preset.
            /}

            {/
            <SSAO
                blendFunction={BlendFunction.MULTIPLY}
                samples={8}
                radius={20}
                intensity={0.8}
                bias={0.02}
            />
            */}

        </EffectComposer>
    );
}