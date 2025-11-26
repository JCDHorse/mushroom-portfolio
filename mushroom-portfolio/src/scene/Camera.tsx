import {OrbitControls, OrthographicCamera, PerspectiveCamera} from "@react-three/drei";
import Postprocessing from "./Postprocessing.tsx";
import {useFrame, useThree} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import {useSpring} from "@react-spring/core";

function CameraIntro({cameraRef}) {
    // Animation du mouvement
    const [spring, api] = useSpring(() => ({
        position: [0, 2, 10],       // position initiale
        rotation: [0, 0, 0],
        config: { mass: 1, tension: 120, friction: 30 }
    }));

    useEffect(() => {
        // Lancement de l’anim à l’entrée
        api.start({
            position: [2, 1, 2],      // position finale
            rotation: [0, 0, 0],
            onRest: () => {
                api.stop();
            }
        });
    }, []);

    // Mise à jour de la caméra à chaque frame selon l’animation
    useFrame(() => {
        if (!cameraRef.current) {
            return;
        }
        if (spring.position.goal) { // si l'animation n'est pas finie
            const p = spring.position.get();
            cameraRef.current.position.set(p[0], p[1], p[2]);
        }
    });

    return null;
}


export default function Camera() {
    const camRef = useRef(this);

    return (
        <>
            <OrthographicCamera
                makeDefault
                ref={camRef}
                position={[2, 1, 2]} // Vue diagonale
                zoom={300} // Ajuste la taille apparente
                near={-200}
                far={200}
            />
            {/*<CameraIntro cameraRef={camRef}/>*/}
            <OrbitControls/>
            {/*<PerspectiveCamera makeDefault*/}
            {/*                   position={[2, 1, 2]} // Vue diagonale*/}
            {/*                   fov={45}*/}
            {/*/>*/}
        </>
    )

}