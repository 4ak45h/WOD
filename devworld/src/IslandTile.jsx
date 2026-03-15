import { Html } from "@react-three/drei"
import { useMemo } from "react"

const greens = [
"#2e7d32",
"#1b5e20",
"#33691e",
"#2f6f3e",
"#3a7a42"
]

const sand = [
"#c2b280",
"#d2b48c",
"#e0cda9"
]

export default function IslandTile({ position, label, onClick }) {

  const terrain = useMemo(() => {

    const arr = []
    const size = 12
    const grid = 16
    const radius = grid * 0.45

    for (let x = 0; x < grid; x++) {
      for (let z = 0; z < grid; z++) {

        const dx = x - grid / 2
        const dz = z - grid / 2
        const dist = Math.sqrt(dx * dx + dz * dz)

        if (dist > radius + Math.random()*1.4) continue

        const isSand = dist > radius * 0.75

        const color = isSand
          ? sand[Math.floor(Math.random()*sand.length)]
          : greens[Math.floor(Math.random()*greens.length)]

        const height = isSand
          ? 0.02
          : Math.random()*0.18

        arr.push(
          <mesh
            key={`${x}-${z}`}
            position={[
              (x/grid)*size - size/2 + size/(grid*2),
              height,
              (z/grid)*size - size/2 + size/(grid*2)
            ]}
          >
            <boxGeometry args={[size/grid,0.05,size/grid]} />
            <meshStandardMaterial color={color}/>
          </mesh>
        )

      }
    }

    return arr

  }, [])

  return (
    <group position={position} onClick={onClick}>

      <mesh position={[0,-0.03,0]} rotation={[-Math.PI/2,0,0]}>
        <circleGeometry args={[7.8,64]} />
        <meshBasicMaterial
          color="#2d6cdf"
          transparent
          opacity={0.25}
        />
      </mesh>

      <mesh position={[0,0.02,0]} rotation={[-Math.PI/2,0,0]}>
        <ringGeometry args={[7.6,8,64]} />
        <meshBasicMaterial
          color="#0d3c8f"
          transparent
          opacity={0.5}
        />
      </mesh>

      {terrain}

      <Html position={[0,1.2,0]} center>
        <div style={{
          background:"rgba(20,20,20,0.9)",
          color:"white",
          padding:"8px 14px",
          borderRadius:"8px",
          fontWeight:"600"
        }}>
          {label}
        </div>
      </Html>

    </group>
  )
}