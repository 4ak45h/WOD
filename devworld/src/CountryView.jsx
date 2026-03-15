import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import IslandTile from "./IslandTile"



/* Animated Ocean */

function WaveWater() {

  const ref = useRef()

  useEffect(() => {

    if (!ref.current) return

    const position = ref.current.geometry.attributes.position
    position.setUsage(35048) // DynamicDrawUsage

  }, [])


  useFrame(({ clock }) => {

    if (!ref.current) return

    const time = clock.elapsedTime
    const pos = ref.current.geometry.attributes.position

    for (let i = 0; i < pos.count; i++) {

      const x = pos.getX(i)
      const y = pos.getY(i)

      const wave =
        Math.sin(x * 0.25 + time) * 0.15 +
        Math.cos(y * 0.25 + time * 0.8) * 0.15

      pos.setZ(i, wave)

    }

    pos.needsUpdate = true

  })


  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0,0,0]}
      receiveShadow
    >
      <planeGeometry args={[200,200,80,80]} />

      <meshStandardMaterial
        color="#095fff"
        metalness={0.7}
        roughness={0.25}
      />

    </mesh>
  )
}



/* Country Map */

export default function CountryView({ setView }) {

  return (

    <group>

      {/* Ocean */}
      <WaveWater />

      {/* Forge State */}

      <IslandTile
        position={[0,0.3,0]}
        label="Forge"
        onClick={() => setView("forge")}
      />

      {/* Network State */}

      <IslandTile
        position={[18,0.3,-10]}
        label="Network"
      />

      {/* Frontier State */}

      <IslandTile
        position={[-18,0.3,-10]}
        label="Frontier"
      />

    </group>

  )
}