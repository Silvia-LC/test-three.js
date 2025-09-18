"use client"

import React from "react"

export default function Whitebase() {
    return(


        <mesh
            position = {[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}
        >
            <boxGeometry args={[10, 10, 0.2]} />
            <meshStandardMaterial color={"white"} />
        </mesh>

    )
}