import { Html } from "@react-three/drei"

export default function StateTile({ position, label, onClick }) {

  return (
    <group position={position} onClick={onClick}>

      {/* district marker */}

      <mesh position={[0,0.02,0]}>
        <boxGeometry args={[6,0.05,6]} />
        <meshStandardMaterial color="#2e7d32"/>
      </mesh>

      {/* border */}

      <mesh position={[0,0.03,0]}>
        <boxGeometry args={[6.2,0.02,6.2]} />
        <meshStandardMaterial color="#3a2a18"/>
      </mesh>

      {/* label */}

      <Html position={[0,1,0]} center>
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