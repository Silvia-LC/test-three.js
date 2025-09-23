import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function RedBox({ position = [0, 0, 0], targetPosition = [0, 0, 0] }) {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state, delta) => {
        if (meshRef.current) {
            const current = meshRef.current.position;
            const target = new THREE.Vector3(targetPosition[0], targetPosition[1], targetPosition[2])


            const speed = 2.0
            current.lerp(target, speed * delta)


            const planeLimit = 4.5
            current.x = Math.max(-planeLimit, Math.min(planeLimit, current.x))
            current.z = Math.max(-planeLimit, Math.min(planeLimit, current.z))
            current.y = -2.1 // Mantenemos el objeto en la superficie del plano
        }
    })

    return (
        <mesh ref={meshRef} position={position} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" />
        </mesh>
    )
}