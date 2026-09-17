"use client"

import { useTheme } from "@/context/ThemeContext"
import { Center, Float, OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import * as THREE from "three"

function Model({ url }: { url: string }){
    const { scene } = useGLTF(url);
   
    const modelRef = useRef<THREE.Group>(null);
    useFrame((state)=>{
        if (modelRef.current){
            const t = state.clock.getElapsedTime();
            modelRef.current.rotation.y = Math.sin(t/4)*0.15;
            modelRef.current.rotation.x = Math.cos(t/4)*0.15;
        }
    });

    return (
        <Center>
            <primitive ref={modelRef} object={scene} scale={1.2} />
        </Center>
    )
}

export default function ParticleWaveCanvas(){
     const { theme,toggleTheme } = useTheme();
    
    return (
        <div className={`relative w-full min-h-[200px] md:min-h-[300px] cursor-grab border active:cursor-grabbing ${theme==='dark'?'bg-[#161B22]/40 border-black':'bg-[#F9FAFB]/80 border-white'}`}>
            <Canvas camera={{position: [8, 5, 10], fov: 150}} gl={{ antialias: true, alpha: true, powerPreference: "high-performance"}} dpr={[1, 2]}>
        <ambientLight intensity={2} />

        <directionalLight
            position={[0, 12, 15]}
            intensity={10}
            color="#14ff1f"
        />

        <pointLight
            position={[-10, -10, -5]}
            intensity={40}
            color={theme === "dark" ? "#ff1f44" : "#200048"}
        />

        <Float
            speed={6.5}
            rotationIntensity={0.8}
            floatIntensity={0.6}
        >
        <Center>
            <group scale={2}>
                <Model url="3DWave.glb" />
            </group>
        </Center>
        </Float>

        <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
        />
        </Canvas>
        </div>
    )
}

useGLTF.preload("3DWave.glb");