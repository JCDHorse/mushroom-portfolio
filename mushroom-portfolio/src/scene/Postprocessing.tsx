import {Bloom, EffectComposer, SSAO, Vignette} from "@react-three/postprocessing";
import {BlendFunction} from "postprocessing";
import {useControls} from "leva";

export default function Postprocessing() {
    return (
    <>
    <EffectComposer multisampling={0} enableNormalPass={true}>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Vignette eskil={false} offset={0.1} darkness={0.3} />
        <SSAO
            blendFunction={BlendFunction.MULTIPLY}
            samples={8}
            radius={20}    // rayon moyen
            intensity={0.8}
            bias={0.02}
        />
        <SSAO
            blendFunction={BlendFunction.MULTIPLY}
            samples={8}
            radius={1}
            intensity={1.0}
            bias={0.02}
        />
        {/*<SSAO blendFunction={BlendFunction.NORMAL}*/}
        {/*      normalDepthBuffer={undefined} // fourni automatiquement par DepthDownsamplingPass*/}
        {/*      samples={32}*/}
        {/*      rings={4}*/}
        {/*      radius={5}             // grand rayon → occlusion globale*/}
        {/*      intensity={1.0}*/}
        {/*      distanceThreshold={1.0}*/}
        {/*      rangeThreshold={0.6}*/}
        {/*      rangeFalloff={0.1}*/}
        {/*      luminanceInfluence={0.8}*/}
        {/*      bias={0.02}*/}
        {/*      depthAwareUpsampling={true}*/}
        {/*/>*/}

        {/*<SSAO*/}
        {/*    blendFunction={BlendFunction.MULTIPLY}*/}
        {/*    normalDepthBuffer={undefined} // même buffer downsamplé*/}
        {/*    samples={24}*/}
        {/*    rings={4}*/}
        {/*    radius={1}            // petit rayon → détails fins*/}
        {/*    intensity={1.0}*/}
        {/*    distanceThreshold={1.0}*/}
        {/*    rangeThreshold={0.5}*/}
        {/*    rangeFalloff={0.1}*/}
        {/*    luminanceInfluence={0.9}*/}
        {/*    bias={0.02}*/}
        {/*    depthAwareUpsampling={true}*/}
        {/*/>*/}
    </EffectComposer>
    </>
    );
}