import {Mushroom, MushroomField} from "../models/mushroom";
import {Vector3} from "three";
import {AMuscaria} from "../models/mushroom/AMuscaria.tsx";
import {ProjectBillboard} from "../projects/ProjectBillboard.tsx";

export default function Mushrooms() {
    return (
       <>
           <MushroomField
               type={'MushLamp'}
               innerRadius={1}
               outerRadius={3}
               count={4}
               center={new Vector3(0,0,0)}
               rotationsRange={{ x: 0, z: 0 }}
           />
           <AMuscaria
               scaleFactor={1.6}
               position={[1, 0, 1]}
               projectURL={"https://github.com/JCDHorse/mushroom-portfolio"}
               projectName={'MOORHSUM'}
               project={<ProjectBillboard
                   projectDescription={"Portfolio en 3D avec des champignons"}
                   projectName={"Mushroom portfolio"}
               />}
           />
           <AMuscaria
               scaleFactor={1.6}
               position={[-1, 0, -1]}
               hatScale={new Vector3(0.6, 1.2, 0.6)}
               footScale={new Vector3(1.2, 0.6, 1.2)}
               projectURL={"https://github.com/JCDHorse/tetrix"}
               projectName={"SIRTET"}
               project={<ProjectBillboard
                   projectURL={"https://github.com/JCDHorse/tetrix"}
                   projectDescription={"Clone de Tetris"}
                   projectName={"Tetrix"}
               />}
           />
           <AMuscaria
               scaleFactor={1.6}
               position={[-1, 0, 1]}
               projectURL={"https://github.com/JCDHorse/game-of-life"}
               projectName={"EFIL FO EMAG"}
               project={<ProjectBillboard
                   projectDescription={"Game of Life implementation"}
                   projectName={"Game Of Life"}
               />}
           />
           {/*<Mushroom*/}
           {/*    type={"AMuscaria"}*/}
           {/*    position={[0, 0, 0]}*/}
           {/*    onClick={(event) => { console.log("Mushrooms event"); }}*/}
           {/*/>*/}
           <MushroomField
               type={"Chanterelle"}
               count={25}
               center={new Vector3(0.5,0,0.5)}
               outerRadius={2}
               innerRadius={0}
           />
           <MushroomField
               type={"Porcini"}
               center={new Vector3(-0.5,0,-0.5)}
               footYScaleRange={{min: 0.6, max: 1.7}}
               footXZScaleRange={{min: 0.9, max: 1.6}}
               hatXZScaleRange={{min: 0.9, max: 2}}
               hatYScaleRange={{min: 0.6, max: 1.8}}
               outerRadius={2}
               innerRadius={0}
               count={50}/>
           {/*<MushroomField*/}
           {/*    type={"Chanterelle"}*/}
           {/*    monoScaleRange={{min: 0.3, max: 1}}*/}
           {/*    center={new Vector3(0,0,0)}*/}
           {/*    outerRadius={1}*/}
           {/*    innerRadius={0}*/}
           {/*    count={10}/>*/}
       </>
    )
}