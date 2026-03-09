import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
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
      <fog attach="fog" args={["#d6ecff", 60, 180]} />

      {/* Global ambient light */}
      <ambientLight intensity={0.45} />

      {/* Main sun light */}
      <directionalLight
        position={[25, 35, 20]}
        intensity={1.2}
        castShadow
      />

      {/* Soft city fill light */}
      <pointLight
        position={[-20, 15, -20]}
        intensity={0.5}
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