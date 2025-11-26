import {Billboard, Html} from "@react-three/drei";


export function ProjectBillboard({
    position = [0, 0, 0],
    projectName,
    projectDescription,
    ...props
}) {


    return (
    <group>
        <Billboard position={[0, 1.2, 0]} follow={true}>
            <Html as='div' style={{   borderRadius: 30, padding: 20, backgroundColor: "#004388FF", width: 250 }}>
                <h1 style={{fontSize: "1.4rem", fontWeight: 'bolder', paddingLeft: 5, color: 'white'}}>{projectName}</h1>
                <p style={{textAlign: "left", color: 'white'}}>
                    {projectDescription}
                </p>
            </Html>
        </Billboard>
    </group>
    )


}