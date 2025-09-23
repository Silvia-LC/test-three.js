"use client"

import React from "react"

export default function Whitebase() {
    return(
        <mesh
            position={[0, -2.6, 0]} // Posicionar debajo del cubo
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow={true} // Habilitar recepción de sombras
        >
            <boxGeometry args={[10, 10, 0.2]} />
            <meshStandardMaterial color={"white"} />
        </mesh>
    )
}