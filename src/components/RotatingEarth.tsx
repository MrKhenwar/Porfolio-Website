import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Sphere, Stars, OrbitControls, Html, Text } from '@react-three/drei'
import * as THREE from 'three'

// Enhanced mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isSmallScreen = window.innerWidth < 768
      const isTouchDevice = 'ontouchstart' in window

      setIsMobile(isMobileDevice || (isSmallScreen && isTouchDevice))
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

function easeOutElasticGentle(t: number): number {
  const c4 = (2 * Math.PI) / 6
  return t === 0
    ? 0
    : t === 1
    ? 1
    : Math.pow(2, -8 * t) * Math.sin((t * 8 - 0.5) * c4) + 1
}

interface EarthProps {
  currentSection: string
  onClick: () => void
  nameClickCount?: number
  isSafari?: boolean
}

function Earth({ currentSection, onClick, nameClickCount = 0, isSafari = false }: EarthProps) {
  const outerMeshRef = useRef<THREE.Mesh>(null)
  const innerMeshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const textOrbitRef = useRef<THREE.Group>(null)
  const isMobile = useIsMobile()

  const [clickCount, setClickCount] = useState(0)
  const [isBursting, setIsBursting] = useState(false)
  const [burstTime, setBurstTime] = useState(0)
  const [isExploding, setIsExploding] = useState(false)
  const [isReforming, setIsReforming] = useState(false)
  const [showKaboom, setShowKaboom] = useState(false)

  // Optimize texture loading for mobile
  const dayTexture = useLoader(THREE.TextureLoader, '/textures/earth_day.jpg', (texture) => {
    if (isMobile) {
      texture.generateMipmaps = false
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
    }
  })
  const nightTexture = useLoader(THREE.TextureLoader, '/textures/back.jpg', (texture) => {
    if (isMobile) {
      texture.generateMipmaps = false
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
    }
  })

  useEffect(() => {
    if (nameClickCount > 0) {
      setClickCount(nameClickCount)

      if (nameClickCount >= 3) {
        setIsBursting(true)
        setIsExploding(true)
        setBurstTime(performance.now() / 1000)

        setTimeout(() => setShowKaboom(true), 800)

        setTimeout(() => {
          setShowKaboom(false)
          setIsReforming(true)
        }, 2000)

        setTimeout(() => {
          setIsBursting(false)
          setIsExploding(false)
          setIsReforming(false)
          setClickCount(0)
        }, 8000)
      }
    }
  }, [nameClickCount])

  const sectionStates: Record<string, { rotation: number[]; scale: number; position: number[]; cameraPosition: number[] }> = {
    hero: { rotation: [0, 0, 0], scale: 1, position: [0, 0, -3], cameraPosition: [0, 0, 8] },
    about: { rotation: [0.5, 0.3, 0], scale: 1.1, position: [-5, 0.5, -3], cameraPosition: [0, 0, 8] },
    projects: { rotation: [-0.3, 0.2, 0], scale: 1.2, position: [5.5, 1, -3], cameraPosition: [0, 0, 8] },
    'more-projects': { rotation: [0.4, -0.1, 0], scale: 1.0, position: [-4.5, -0.3, -3], cameraPosition: [0, 0, 8] },
    skills: { rotation: [0.8, -0.4, 0], scale: 1.1, position: [4.5, -0.5, -3], cameraPosition: [0, 0, 8] },
    experience: { rotation: [-0.8, 0.1, 0], scale: 1.0, position: [-4, 0.2, -3], cameraPosition: [0, 0, 8] },
    contact: { rotation: [0.2, -0.3, 0], scale: 0.9, position: [0, -1.5, -3], cameraPosition: [0, 0, 8] },
  }

  useFrame((state) => {
  if (outerMeshRef.current && innerMeshRef.current && groupRef.current) {
    const currentState = sectionStates[currentSection] || sectionStates.hero;

    if (isBursting) {
      const totalTime = state.clock.elapsedTime - burstTime;

      if (isExploding && !isReforming) {
        const explosionProgress = Math.min(totalTime / 3, 1);
        
        const easedProgress = easeOutElasticGentle(explosionProgress);

        // Smooth scale down with elastic easing
        const scaleDown = 1 - easedProgress;
        groupRef.current.scale.setScalar(currentState.scale * scaleDown);

        // Position shake with easing for smooth in-out shake
        const shakeIntensity = 2 * (1 - explosionProgress);
        groupRef.current.position.x = currentState.position[0] + Math.sin(state.clock.elapsedTime * 20) * shakeIntensity;
        groupRef.current.position.y = currentState.position[1] + Math.cos(state.clock.elapsedTime * 25) * shakeIntensity;

        // Rotation speed peaks mid explosion, then slows
        groupRef.current.rotation.y += 0.4 * (1 - Math.abs(0.5 - explosionProgress) * 2);
        groupRef.current.rotation.x += 0.2 * Math.sin(state.clock.elapsedTime * 10) * (1 - explosionProgress);
        groupRef.current.rotation.z += 0.2 * Math.cos(state.clock.elapsedTime * 12) * (1 - explosionProgress);

        // Rotate Earth meshes same way for consistency
        outerMeshRef.current.rotation.copy(groupRef.current.rotation);
        innerMeshRef.current.rotation.copy(groupRef.current.rotation);

      } else if (isReforming) {
        const reformProgress = Math.min((totalTime - 2) / 6, 1);

        if (reformProgress >= 0 && reformProgress <= 1) {
          // Smooth scaling with bounce easing
          let scaleProgress =
            reformProgress < 0.8
              ? easeOutQuart(reformProgress / 0.8) * 0.95
              : 0.95 + easeOutElasticGentle((reformProgress - 0.8) / 0.2) * 0.05;
          groupRef.current.scale.setScalar(currentState.scale * scaleProgress);

          // Smoothly lerp position back to steady spot with gentle floating
          groupRef.current.position.lerp(new THREE.Vector3(...currentState.position), 0.05);
          groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.015;

          // Slow rotation to rest
          groupRef.current.rotation.y += 0.02 * (1 - reformProgress);

          // Sync Earth meshes rotations to group
          if (outerMeshRef.current && innerMeshRef.current) {
            outerMeshRef.current.rotation.copy(groupRef.current.rotation);
            innerMeshRef.current.rotation.copy(groupRef.current.rotation);
          }
        }
      }
    } else {
      // Normal steady rotation and floating
      const rotationSpeed = clickCount > 0 ? 0.01 + clickCount * 0.02 : 0;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, currentState.rotation[0], 0.02);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, currentState.rotation[2], 0.02);
      groupRef.current.rotation.y += rotationSpeed;

      groupRef.current.scale.lerp(new THREE.Vector3(currentState.scale, currentState.scale, currentState.scale), 0.1);
      groupRef.current.position.lerp(new THREE.Vector3(...currentState.position), 0.02);
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.3) * 0.02;

      if (outerMeshRef.current && innerMeshRef.current) {
        outerMeshRef.current.rotation.copy(groupRef.current.rotation);
        innerMeshRef.current.rotation.copy(groupRef.current.rotation);
      }
    }

    if (textOrbitRef.current) {
      textOrbitRef.current.rotation.y -= 0.003;
    }
  }
});


  const handleClick = () => {
    const newClickCount = clickCount + 1
    setClickCount(newClickCount)
    if (newClickCount >= 3) {
      setIsBursting(true)
      setIsExploding(true)
      setBurstTime(performance.now() / 1000)
      setTimeout(() => setShowKaboom(true), 800)
      setTimeout(() => {
        setShowKaboom(false)
        setIsReforming(true)
      }, 2000)
      setTimeout(() => {
        setIsBursting(false)
        setIsExploding(false)
        setIsReforming(false)
        setClickCount(0)
      }, 8000)
    }
    setTimeout(() => {
      if (!isBursting) setClickCount(0)
    }, 2000)
    onClick()
  }

  const fullName = 'VIDIT RAJ KHENWAR  '
  const letters = fullName.split('')
  const angleStep = (Math.PI * 2) / letters.length
  const earthRadius = 3
  const textOrbitRadius = earthRadius + 0.5

  return (
    <group ref={groupRef} onClick={handleClick}>
      {/* Atmospheric Glow */}
      {(!isExploding || isReforming) && (
        <>
          <Sphere args={[3.2, 32, 32]}>
            <meshBasicMaterial
              color={new THREE.Color(0x4a90e2)}
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </Sphere>

          {/* Outer Day Sphere - Optimized for mobile */}
          <Sphere ref={outerMeshRef} args={[3, (isMobile || isSafari) ? 32 : 64, (isMobile || isSafari) ? 32 : 64]}>
            <meshStandardMaterial
              map={dayTexture}
              roughness={0.7}
              metalness={0.05}
              emissive={new THREE.Color('#111122')}
              emissiveIntensity={(isMobile || isSafari) ? 0.15 : 0.25}
              transparent
              opacity={0.98}
            />
          </Sphere>

          {/* Inner Night Sphere - Simplified for mobile */}
          {!isMobile && (
            <Sphere ref={innerMeshRef} args={[2.95, 64, 64]}>
              <meshStandardMaterial map={nightTexture} side={THREE.FrontSide} transparent opacity={0.6} />
            </Sphere>
          )}

          {/* Atmospheric Outer Sphere - Reduced on mobile */}
          {!isMobile && (
            <Sphere args={[3.1, 32, 32]}>
              <meshBasicMaterial
                color={new THREE.Color(0x87ceeb)}
                transparent
                opacity={0.03}
                side={THREE.FrontSide}
              />
            </Sphere>
          )}
        </>
      )}

      {/* Orbiting Text */}
      <group ref={textOrbitRef}>
        {letters.map((letter, idx) => {
          const angle = -idx * angleStep + Math.PI / 2
          const x = Math.cos(angle) * textOrbitRadius
          const z = Math.sin(angle) * textOrbitRadius
          const y = 0.5
          const rotationY = angle + Math.PI / 2

          return (
            <Text
              key={idx}
              position={[x, y, z]}
              rotation={[0, rotationY, 0]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
              depthOffset={1}
            >
              {letter}
            </Text>
          )
        })}
      </group>

      {/* KABOOM Text */}
      {showKaboom && (
        <Html
          position={[0, 0, 0]}
          center
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            style={{
              fontSize: '10rem',
              fontWeight: 900,
              fontFamily: 'Impact, "Franklin Gothic Bold", "Arial Black", sans-serif',
              background:
                'linear-gradient(45deg, #ff6b00, #ff0040, #ff6b00, #ffaa00)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              animation:
                'kaboomAnimation 0.6s ease-out infinite, gradientShift 1s ease-in-out infinite',
              textAlign: 'center',
              letterSpacing: '0.2rem',
              filter: `
                drop-shadow(0 0 20px rgba(255, 107, 0, 0.8))
                drop-shadow(0 0 40px rgba(255, 0, 64, 0.6))
                drop-shadow(0 0 60px rgba(255, 170, 0, 0.4))
              `,
              position: 'relative',
              zIndex: 1000,
            }}
          >
            KABOOM!
          </div>
          <style>{`
            @keyframes kaboomAnimation {
              0% {
                transform: scale(0.8) rotate(-2deg);
                filter:
                  drop-shadow(0 0 20px rgba(255, 107, 0, 0.8))
                  drop-shadow(0 0 40px rgba(255, 0, 64, 0.6))
                  drop-shadow(0 0 60px rgba(255, 170, 0, 0.4));
              }
              50% {
                transform: scale(1.1) rotate(1deg);
                filter:
                  drop-shadow(0 0 30px rgba(255, 107, 0, 1))
                  drop-shadow(0 0 60px rgba(255, 0, 64, 0.8))
                  drop-shadow(0 0 90px rgba(255, 170, 0, 0.6));
              }
              100% {
                transform: scale(0.9) rotate(-1deg);
                filter:
                  drop-shadow(0 0 25px rgba(255, 107, 0, 0.9))
                  drop-shadow(0 0 50px rgba(255, 0, 64, 0.7))
                  drop-shadow(0 0 75px rgba(255, 170, 0, 0.5));
              }
            }

            @keyframes gradientShift {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          `}</style>
        </Html>
      )}

      {/* Glowing markers */}
      {currentSection !== 'hero' && (
        <>
          <mesh position={[1.5, 0.5, 1.5]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh position={[-1.8, 0.8, 1.2]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#3b82f6" />
          </mesh>
          <mesh position={[1.2, -1, 1.8]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
        </>
      )}
    </group>
  )
}

function CameraController({ currentSection }: { currentSection: string }) {
  const { camera } = useThree()

  const sectionCameraStates: Record<
    string,
    {
      position: [number, number, number]
      fov: number
    }
  > = {
    hero: { position: [0, 0, 8], fov: 75 },
    about: { position: [0, 0, 8], fov: 75 },
    projects: { position: [0, 0, 8], fov: 75 },
    skills: { position: [0, 0, 8], fov: 75 },
    experience: { position: [0, 0, 8], fov: 75 },
    contact: { position: [0, 0, 8], fov: 75 },
  }

  useFrame(() => {
    const targetState = sectionCameraStates[currentSection] || sectionCameraStates.hero
    camera.position.lerp(new THREE.Vector3(...targetState.position), 0.03)

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetState.fov, 0.03)
      camera.updateProjectionMatrix()
    }
  })

  return null
}

function Scene3D({
  currentSection,
  nameClickCount,
}: {
  currentSection: string
  nameClickCount: number
}) {
  const isMobile = useIsMobile()
  const isSafari = useIsSafari()

  const handleEarthClick = () => {
    console.log('Earth clicked! Current section:', currentSection)
  }

  // Mobile-optimized settings
  const canvasProps = useMemo(() => ({
    camera: { position: [0, 0, 8] as [number, number, number], fov: 75 },
    dpr: (isMobile || isSafari) ? [1, 1.5] as [number, number] : [1, 2] as [number, number], // Lower pixel ratio on mobile/Safari
    performance: { min: isSafari ? 0.3 : 0.5 }, // Even lower performance threshold for Safari
    gl: {
      powerPreference: (isMobile || isSafari) ? 'low-power' : 'high-performance',
      antialias: !(isMobile || isSafari), // Disable antialiasing on mobile/Safari
      alpha: false, // Disable alpha for better Safari performance
      preserveDrawingBuffer: false, // Disable for better Safari performance
      premultipliedAlpha: false, // Disable for Safari compatibility
      stencil: false, // Disable stencil buffer for Safari
      depth: true, // Keep depth buffer
    },
  }), [isMobile, isSafari])

  return (
    <Canvas
      {...canvasProps}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        pointerEvents: 'none',
      }}
    >
      <CameraController currentSection={currentSection} />

      {/* Simplified lighting for mobile/Safari */}
      <ambientLight intensity={(isMobile || isSafari) ? 0.6 : 0.35} />
      <directionalLight position={[10, 10, 5]} intensity={(isMobile || isSafari) ? 0.9 : 1} />
      {!(isMobile || isSafari) && <pointLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />}
      {!(isMobile || isSafari) && <pointLight position={[-5, -5, 2]} intensity={0.15} color="#4f46e5" />}

      {/* Dramatically reduced stars on mobile/Safari */}
      <Stars
        radius={(isMobile || isSafari) ? 300 : 500}
        depth={(isMobile || isSafari) ? 50 : 100}
        count={(isMobile || isSafari) ? 200 : 2000}
        factor={(isMobile || isSafari) ? 2 : 6}
        saturation={0}
        fade
      />

      <Earth currentSection={currentSection} onClick={handleEarthClick} nameClickCount={nameClickCount} isSafari={isSafari} />

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate={false} enabled={false} />
    </Canvas>
  )
}

interface RotatingEarthProps {
  currentSection: string
  nameClickCount?: number
}

function RotatingEarth({ currentSection, nameClickCount = 0 }: RotatingEarthProps) {
  return <Scene3D currentSection={currentSection} nameClickCount={nameClickCount} />
}

export default RotatingEarth
