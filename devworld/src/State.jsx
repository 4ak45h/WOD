import { Html } from "@react-three/drei"
import { useState } from "react"

export default function State({ position, color, name, onClick }) {

  const [hovered, setHovered] = useState(false)

  return (
    <group
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >

      <mesh>
        <boxGeometry args={[12,0.5,12]} />
        <meshStandardMaterial
          color={hovered ? "#3b82f6" : color}
          roughness={0.6}
        />
      </mesh>

      {hovered && (
        <Html position={[0,2,0]} center>
          <div style={{
            background:"rgba(20,20,20,0.9)",
            padding:"8px 14px",
            borderRadius:"8px",
            color:"white",
            fontWeight:"600"
          }}>
            {name}
          </div>
        </Html>
      )}

    </group>
  )
}