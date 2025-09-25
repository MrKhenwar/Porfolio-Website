import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Sphere, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'

interface WelcomeScreenProps {
  onComplete: () => void
}

function WelcomeEarth() {
  const dayTexture = useLoader(THREE.TextureLoader, '/textures/earth_day.jpg')
  const nightTexture = useLoader(THREE.TextureLoader, '/textures/back.jpg')
  const earthRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005 // Slow rotation
    }
  })

  return (
    <group ref={earthRef} position={[0, 0, 0]}>
      {/* Atmosphere glow */}
      <Sphere args={[1.6, 32, 32]}>
        <meshBasicMaterial color={new THREE.Color("#4a90e2")} transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>
      {/* Main Earth */}
      <Sphere args={[1.2, 64, 64]}>
        <meshStandardMaterial
          map={dayTexture}
          roughness={0.7}
          metalness={0.05}
          emissive={new THREE.Color("#111122")}
          emissiveIntensity={0.25}
          transparent
          opacity={0.98}
        />
      </Sphere>
      {/* Night side */}
      <Sphere args={[1.18, 64, 64]}>
        <meshStandardMaterial map={nightTexture} side={THREE.FrontSide} transparent opacity={0.6} />
      </Sphere>
      {/* Outer atmosphere */}
      <Sphere args={[1.3, 32, 32]}>
        <meshBasicMaterial color={new THREE.Color(0x87ceeb)} transparent opacity={0.03} side={THREE.FrontSide} />
      </Sphere>
    </group>
  )
}

function WelcomeText() {
  const textRef = useRef<THREE.Group>(null)
  const fullName = 'WELCOME'
  const letters = fullName.split('')
  const angleStep = (Math.PI * 2) / letters.length
  const radius = 1.5

  
  useFrame(() => {
    if (textRef.current) {
      textRef.current.rotation.y -= 0.02 // Slow counter-rotation
    }
  })

  return (
    <group ref={textRef}> 
      {letters.map((letter, idx) => {
        const angle = -idx * angleStep + Math.PI / 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = 0
        const rotationY = angle + Math.PI / 2

        return (
          <Text
            key={idx}
            position={[x, y, z]}
            rotation={[0, rotationY, 0]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
            font={undefined}
            outlineWidth={0.02}
            outlineColor="#ff0040"
          >
            {letter}
          </Text>
        )
      })}
    </group>
  )
}

// Responsive check
function useIsMobile(max = 768) {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < max : false)
  useEffect(() => {
    function handler() { setIsMobile(window.innerWidth < max) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [max])
  return isMobile
}

function useIsSafari() {
  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isSafariBrowser = /safari/i.test(userAgent) && !/chrome|chromium|firefox|edg/i.test(userAgent)
    setIsSafari(isSafariBrowser)
  }, [])
  return isSafari
}

function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0)
  const isMobile = useIsMobile()
  const isSafari = useIsSafari()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400)
          return 100;
        }
        return prev + 3; // faster on mobile
      })
    }, isMobile ? 85 : 60)
    return () => clearInterval(timer)
  }, [onComplete, isMobile]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6] as [number, number, number], fov: 75 }}
        dpr={(isMobile || isSafari) ? [1, 1.5] as [number, number] : [1, 2] as [number, number]}
        performance={{ min: isSafari ? 0.3 : 0.5 }}
        gl={{
          powerPreference: (isMobile || isSafari) ? 'low-power' : 'high-performance',
          antialias: !(isMobile || isSafari),
          alpha: false,
          preserveDrawingBuffer: false,
          premultipliedAlpha: false,
          stencil: false,
        }}
        style={{
          position: 'absolute', top: 0, left: 0, width: "100%", height: "100%", zIndex: 1
        }}>
        <ambientLight intensity={(isMobile || isSafari) ? 0.6 : 0.4} />
        <directionalLight position={[10, 10, 5]} intensity={(isMobile || isSafari) ? 0.6 : 0.8} />
        {!(isMobile || isSafari) && <pointLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />}

        {/* Optimized starfield for mobile/Safari */}
        <Stars
          radius={(isMobile || isSafari) ? 80 : 100}
          depth={(isMobile || isSafari) ? 30 : 50}
          count={(isMobile || isSafari) ? 300 : 2000}
          factor={(isMobile || isSafari) ? 2 : 4}
          saturation={0}
          fade={true}
        />

        {/* Rotating Earth */}
        <WelcomeEarth />

        {/* Revolving WELCOME text */}
        <WelcomeText />
      </Canvas>

      <div className="relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className={`${isMobile ? 'text-2xl' : 'text-4xl'} text-white font-light tracking-wider font-poppins gradient-text`}
          >
            TO VIDIT'S WORLD
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className={`w-full ${isMobile ? 'max-w-xs' : 'max-w-md'} mx-auto`}
        >
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
              style={{
                width: `${progress}%`,
                transition: 'width 0.1s ease-out'
              }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="text-gray-400 text-sm mt-4 font-poppins"
          >
            <span className="italic-accent">Preparing</span> your experience... <span className="font-jetbrains">{Math.round(progress)}%</span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default WelcomeScreen