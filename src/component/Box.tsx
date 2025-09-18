"use client"

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'

export default function Box(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    const [position, setPosition] = useState<THREE.Vector3>(
        new THREE.Vector3(...(props.position as [number, number, number]))
    )
    const [scale, setScale] = useState(1)

    // Movimiento con teclado
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const step = 0.2
            const newPos = position.clone()

            switch (event.key.toLowerCase()) {
                case 'w':
                case 'arrowup':
                    newPos.z += step
                    break
                case 's':
                case 'arrowdown':
                    newPos.z -= step
                    break
                case 'a':
                case 'arrowright':
                    newPos.x -= step
                    break
                case 'd':
                case 'arrowleft':
                    newPos.x += step
                    break
                default:
                    return
            }

            // Límites del plano
            const halfSize = 10 - 1
            if (
                newPos.x >= -halfSize && newPos.x <= halfSize &&
                newPos.z >= -halfSize && newPos.z <= halfSize
            ) {
                setPosition(newPos)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [position])

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta
        }
    })

    return (
        <mesh
            {...props}
            ref={meshRef}
            position={position}
            scale={active ? scale : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'#2f74c0'} />
        </mesh>
    )
}