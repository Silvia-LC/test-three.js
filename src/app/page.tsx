"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Box from '../component/Box'
import RedBox from '../component/RedBox'
import Whitebase from '../component/Whitebase'
import { useState, useEffect } from 'react'
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function Home() {
    const { setTheme } = useTheme()
    const [seconds, setSeconds] = useState(60)
    const [progress, setProgress] = useState(0)
    const [showRedBox, setShowRedBox] = useState(false)
    const [blueBoxCurrentPosition, setBlueBoxCurrentPosition] = useState<[number, number, number]>([0, -2.1, 0])

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => {
                const newSeconds = prev - 1
                if (newSeconds <= 0) {
                    setShowRedBox(true)
                    setProgress(100)
                    clearInterval(interval)
                    return 0
                }
                setProgress(((60 - newSeconds) / 60) * 100)
                return newSeconds
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 10,
                width: '200px',
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                fontSize: '12px',
                fontFamily: 'monospace'
            }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#ffffff' }}>
                    Controles
                </div>
                <div style={{ lineHeight: '1.4' }}>
                    <div style={{ marginBottom: '2px' }}><strong>W</strong>/↑ Adelante</div>
                    <div style={{ marginBottom: '2px' }}><strong>S</strong>/↓ Atrás</div>
                    <div style={{ marginBottom: '2px' }}><strong>D</strong>/→ Derecha</div>
                    <div style={{ marginBottom: '2px' }}><strong>A</strong>/← Izquierda</div>
                </div>
            </div>

            {/* Dark Mode */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '80px',
                zIndex: 10
            }}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Avatar */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 10
            }}>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>

            {/* Temporizador */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: seconds === 0 ? 'rgb(11,9,9)' : 'rgba(0,0,0,0.6)',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center',
                zIndex: 10,
                border: 'none'
            }}>
                {seconds}
            </div>

            <Canvas
                shadows
                camera={{ position: [0, 5, 10], fov: 50 }}
                style={{ width: '100%', height: '100%' }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-near={0.5}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <OrbitControls enableZoom={true} enableRotate={true} />
                <Box
                    initialPosition={[0, -2.1, 0]}
                    onPositionChange={setBlueBoxCurrentPosition}
                />
                {showRedBox && (
                    <>
                        <RedBox
                            position={[-3, -2.1, 0]}
                            targetPosition={blueBoxCurrentPosition}
                        />
                    </>
                )}
                <Whitebase />
            </Canvas>

            {/* Barra de progreso */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '300px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '10px',
                borderRadius: '8px',
                zIndex: 10
            }}>
                <Progress value={progress} className="w-full" />
            </div>
        </div>
    )
}