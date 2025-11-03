import {Mushroom, MushroomField} from "../models/mushroom";
import {Vector3} from "three";

export default function Mushrooms() {
    return (
       <>
           <MushroomField
               type={'MushLamp'}
               innerRadius={1}
               outerRadius={3}
               count={5}
               center={new Vector3(0,0,0)}
               rotationsRange={{ x: 0, z: 0 }}
           />
           <Mushroom
               type={"AMuscaria"}
               position={[0, 0, 0]}
               onClick={(event) => { console.log("Mushrooms event"); }}
           />
           <Mushroom
               type={"Chanterelle"}
               position={[1, 0, 1]}
           />
           <MushroomField
               type={"AMuscaria"}
               hatXZScaleRange={{min: 0.6, max: 2}}
               center={new Vector3(0,0,0)}
               outerRadius={3}
               innerRadius={0}
               count={4}/>
           <MushroomField
               type={"Porcini"}
               center={new Vector3(0,0,0)}
               footYScaleRange={{min: 0.6, max: 1.7}}
               footXZScaleRange={{min: 0.9, max: 1.6}}
               hatXZScaleRange={{min: 0.9, max: 2}}
               hatYScaleRange={{min: 0.6, max: 1.8}}
               outerRadius={4}
               innerRadius={0}
               count={50}/>
           <MushroomField
               type={"Chanterelle"}
               monoScaleRange={{min: 0.3, max: 1}}
               center={new Vector3(0,0,0)}
               outerRadius={1}
               innerRadius={0}
               count={10}/>
       </>
    )
}