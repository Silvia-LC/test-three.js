// src/component/Box.js
"use client"

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'

export default function Box({
                                initialPosition,
                                onPositionChange,
                                ...props
                            }: {
    initialPosition: [number, number, number]
    onPositionChange?: (position: [number, number, number]) => void
} & ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setPressedKeys(prev => new Set(prev).add(event.key.toLowerCase()))
        }

        const handleKeyUp = (event: KeyboardEvent) => {
            setPressedKeys(prev => {
                const newSet = new Set(prev)
                newSet.delete(event.key.toLowerCase())
                return newSet
            })
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyUp)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    useFrame(() => {
        if (meshRef.current) {
            const step = 0.05
            const newPos = meshRef.current.position

            if (pressedKeys.has('w') || pressedKeys.has('arrowup')) {
                newPos.z -= step
            }
            if (pressedKeys.has('s') || pressedKeys.has('arrowdown')) {
                newPos.z += step
            }
            if (pressedKeys.has('a') || pressedKeys.has('arrowleft')) {
                newPos.x -= step
            }
            if (pressedKeys.has('d') || pressedKeys.has('arrowright')) {
                newPos.x += step
            }

            const planeLimit = 4.5
            newPos.x = Math.max(-planeLimit, Math.min(planeLimit, newPos.x))
            newPos.z = Math.max(-planeLimit, Math.min(planeLimit, newPos.z))
            newPos.y = -2.1

            if (onPositionChange) {
                onPositionChange([newPos.x, newPos.y, newPos.z])
            }
        }
    })

    return (
        <mesh
            {...props}
            ref={meshRef}
            position={initialPosition}
            scale={active ? 1.2 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            castShadow
        >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={'#2f74c0'}/>
        </mesh>
    )
}