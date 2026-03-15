import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { useState, useRef } from "react"

import CountryView from "./CountryView"
import GithubCity from "./GithubCity"
import AirTraffic from "./AirTraffic"
import ForgeView from "./ForgeView"



function CameraController({ zoomTarget, onZoomComplete, view, setView }) {

  const { camera } = useThree()
  const progress = useRef(0)

  useFrame(() => {

    /* zoom animation */

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

    /* detect zoom out */

    const distance = camera.position.length()

    if (view === "github" && distance > 345) {
      setView("country")
    }

  })

  return null
}



export default function App() {

  const [view, setView] = useState("country")
  const [zooming, setZooming] = useState(false)


  /* open github city */

  const enterGithub = () => {
    setZooming(true)
  }


  const finishZoom = () => {
    setZooming(false)
    setView("github")
  }


  return (

    <Canvas shadows camera={{ position:[0,25,25], fov:50 }}>

      {/* sky */}

      <color attach="background" args={["#030510"]} />

      {/* fog */}

      <fog attach="fog" args={["#050505",60,220]} />

      {/* stars */}

      <Stars
        radius={400}
        depth={80}
        count={6000}
        factor={4}
        saturation={0}
        fade
      />


      {/* horizon glow */}

      <mesh position={[0,-5,-150]}>
        <planeGeometry args={[500,160]} />
        <meshBasicMaterial
          color="#1a1a2e"
          transparent
          opacity={0.35}
        />
      </mesh>


      {/* lighting */}

      <ambientLight intensity={0.5} />
      <pointLight position={[-20,15,-20]} intensity={0.6} />


      {/* aircraft lights */}

      <AirTraffic />
      <AirTraffic />
      <AirTraffic />


      <OrbitControls />


      <CameraController
        zoomTarget={zooming}
        onZoomComplete={finishZoom}
        view={view}
        setView={setView}
      />


      {/* VIEWS */}

      {view === "country" && (
        <CountryView setView={setView}/>
      )}

      {view === "forge" && (
        <ForgeView enterGithub={enterGithub}/>
      )}

      {view === "github" && (
        <GithubCity/>
      )}

    </Canvas>

  )
}