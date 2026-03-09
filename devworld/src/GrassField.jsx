import { useMemo } from "react"

export default function GrassField() {

  const grass = useMemo(() => {

    const blades = []

    const size = 200
    const density = 1200

    for (let i = 0; i < density; i++) {

      const x = (Math.random() - 0.5) * size
      const z = (Math.random() - 0.5) * size
      const height = 0.3 + Math.random() * 0.5

      blades.push(
        <mesh key={i} position={[x, height/2, z]}>
          <planeGeometry args={[0.05, height]} />
          <meshStandardMaterial
            color="#1c4d1f"
            side={2}
          />
        </mesh>
      )
    }

    return blades

  }, [])

  return <group>{grass}</group>
}