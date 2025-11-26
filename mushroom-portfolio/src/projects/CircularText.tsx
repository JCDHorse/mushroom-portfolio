import { useMemo } from "react"
import { Text } from "@react-three/drei";

export function CircularText({ text, radius = 2, y = 0, size = 0.1, align = 'center' }) {
// On nettoie le texte et on calcule les glyphes
    const chars = useMemo(() => text.split(''), [text])


// L'angle total que prendra le texte (en radians)
// Ici on répartit uniformément sur un cercle entier (2π).
// Si vous voulez un arc seulement, remplacez 2*Math.PI par l'angle désiré.
    const totalAngle = Math.PI


    return (
        <group>
            {chars.map((char, i) => {
// fraction le long du cercle
                    const t = i / chars.length
// angle pour ce caractère (on décale pour centrer le texte si besoin)
                    const angle = t * totalAngle - Math.PI / 2 // -90° pour commencer en haut


// position cartésienne
                    const x = Math.cos(angle) * radius
                    const z = Math.sin(angle) * radius




// rotation autour de Y pour suivre le cercle
// on calcule une correction pour éviter que les lettres soient "à l'envers"
// sur la face opposée du cercle : on ajoute PI quand cos(angle) < 0
// (côté gauche/droite du cercle selon l'axe X)
                let rotY = -angle + Math.PI / 2

                    return (
                        <group key={i} position={[x, y, z]} rotation={[0, rotY, 0]}>
                    {/*
Text de drei : pratique pour du texte 3D.
- size contrôle l'échelle
- anchorX/anchorY pour l'alignement
- font : vous pouvez fournir l'URL d'un font .ttf/.woff disponible
*/}
                    <Text
                        fontSize={size}
                        //@ts-ignore
                    anchorX={align}
                    anchorY="middle"
                    maxWidth={2}
                    lineHeight={1}
                    renderOrder={999}>
                        {char}
                    </Text>
                    </group>
                )
                })}
        </group>
    )
}