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

      camera.position.lerp(
        { x: 0, y: 15, z: 15 },
        progress.current
      )

      camera.lookAt(0,0,0)

      if (progress.current >= 1) {
        onZoomComplete()
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
    <Canvas camera={{ position: [0, 25, 25], fov: 50 }}>

      <ambientLight intensity={0.7} />
      <directionalLight position={[10,20,10]} />

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