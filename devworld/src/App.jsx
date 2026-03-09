import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { useState, useRef } from "react"

import CountryView from "./CountryView"
import GithubCity from "./GithubCity"


function CameraController({ zoomTarget, onZoomComplete }) {

  const { camera } = useThree()
  const progress = useRef(0)

  useFrame(() => {

    if (zoomTarget) {

      progress.current += 0.02

      const target = { x: 0, y: 15, z: 15 }

      camera.position.lerp(target, progress.current)

      camera.lookAt(0,0,0)

      if (progress.current >= 1) {
        onZoomComplete()
        progress.current = 0
      }

    }

  })

  return null
}


/* 🌙 Realistic Moon */

function Moon() {
  return (
    <group position={[250,200,-350]}>

      {/* moon */}
      <mesh>
        <sphereGeometry args={[25,64,64]} />
        <meshStandardMaterial
          color="#e6e6e6"
          emissive="#999999"
          emissiveIntensity={0.7}
        />
      </mesh>

      {/* moonlight */}
      <directionalLight
        position={[0,0,0]}
        intensity={0.8}
        color="#cfd8ff"
      />

    </group>
  )
}



export default function App() {

  const [view, setView] = useState("country")
  const [zooming, setZooming] = useState(false)

  const enterGithub = () => {
    setZooming(true)
  }

  const finishZoom = () => {
    setZooming(false)
    setView("github")
  }

  return (

    <Canvas
      shadows
      camera={{ position: [0, 25, 25], fov: 50 }}
    >

      {/* background sky */}

      <color attach="background" args={["#020207"]} />

      {/* fog */}

      <fog attach="fog" args={["#050505", 60, 220]} />


      {/* stars */}

      <Stars
        radius={400}
        depth={80}
        count={6000}
        factor={4}
        saturation={0}
        fade
      />


      {/* moon */}

      <Moon />


      {/* horizon glow */}

      <mesh position={[0,-5,-150]}>
        <planeGeometry args={[500,160]} />
        <meshBasicMaterial
          color="#1a1a2e"
          transparent
          opacity={0.35}
        />
      </mesh>


      {/* ambient night light */}

      <ambientLight intensity={0.45} />


      {/* city fill light */}

      <pointLight
        position={[-20,15,-20]}
        intensity={0.6}
      />


      <OrbitControls />


      <CameraController
        zoomTarget={zooming}
        onZoomComplete={finishZoom}
      />


      {view === "country" && (
        <CountryView enterGithub={enterGithub}/>
      )}

      {view === "github" && (
        <GithubCity/>
      )}

    </Canvas>
  )
}