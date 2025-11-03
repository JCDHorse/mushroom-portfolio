import {OrbitControls, OrthographicCamera, PerspectiveCamera} from "@react-three/drei";
import Postprocessing from "./Postprocessing.tsx";

export default function Camera() {
    return (
        <>
            <OrbitControls/>
            <PerspectiveCamera makeDefault
                               position={[2, 1, 2]} // Vue diagonale
                               fov={45}
            />
            {/*<OrthographicCamera*/}
            {/*    makeDefault*/}
            {/*    position={[2, 1, 2]} // Vue diagonale*/}
            {/*    zoom={300} // Ajuste la taille apparente*/}
            {/*    near={-200}*/}
            {/*    far={200}*/}
            {/*/>*/}
        </>
    )

}