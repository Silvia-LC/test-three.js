'use client'

import { Canvas } from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import Box from '../component/Box'
import Whitebase from '../component/Whitebase'
import { useState, useEffect } from 'react'
import { Progress } from "@/components/ui/progress"


export default function Home() {
    const [seconds, setSeconds] = useState(60)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev === 0) {
                    clearInterval(interval)
                    return 0
                }
                const newSeconds = prev - 1
                setProgress(((60 - newSeconds) / 60) * 100)
                return newSeconds
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])


    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <div className="container">

                <div className="temporizador" style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: '20px',
                    borderRadius: '12px',
                    textAlign: 'center'
                }}>
                     {seconds}
                </div>

            </div>

            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Box position={[-1.2, 0.6, 0]} />
                <Whitebase />

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    enableRotate={true}
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>

            <div style={{position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '300px',backgroundColor: 'rgba(0,0,0,0.6)', padding: '10px',
                    borderRadius: '8px' }}>
                <Progress value={progress} />
            </div>

        </div>
    )
}