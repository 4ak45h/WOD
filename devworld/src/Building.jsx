import { Html } from "@react-three/drei"
import { useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"

const languageStyles = {
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Java: "#b07219",
  TypeScript: "#3178c6",
  Dart: "#00B4AB",
  default: "#4da6ff"
}

export default function Building({ position, height, repo }) {

  const [hovered,setHovered] = useState(false)
  const ref = useRef()

  const color = languageStyles[repo.language] || languageStyles.default

  const stars = repo.stargazers_count || 0
  const glow = Math.min(stars / 20, 1.5)

  const floors = Math.max(2, Math.floor(height / 2))

  useFrame(({clock})=>{
    if(ref.current){
      ref.current.rotation.y =
        Math.sin(clock.elapsedTime*0.15 + repo.id)*0.03
    }
  })

  return (
    <group position={[position[0],0,position[2]]} ref={ref}>

      {Array.from({ length: floors }).map((_, i) => {

        const scale = 1 - i * 0.05
        const y = i * 1.8 + 0.9   // start from ground

        return (
          <mesh
            key={i}
            position={[0,y,0]}
            scale={[scale,1,scale]}
            castShadow
            receiveShadow
            onPointerOver={()=>setHovered(true)}
            onPointerOut={()=>setHovered(false)}
          >
            <boxGeometry args={[3,1.8,3]} />

            <meshStandardMaterial
              color={color}
              roughness={0.3}
              metalness={0.2}
              emissive={color}
              emissiveIntensity={glow}
            />
          </mesh>
        )
      })}

      {/* antenna */}
      {height > 8 && (
        <mesh position={[0,floors*1.8 + 1,0]} castShadow>
          <cylinderGeometry args={[0.2,0.2,2]} />
          <meshStandardMaterial
            color="white"
            emissive="white"
            emissiveIntensity={1}
          />
        </mesh>
      )}

      {/* hover label */}
      {hovered && (
        <Html
  position={[0,floors*1.8 + 3,0]}
  center
  transform={false}
>
          <div style={{
  background: "rgba(20,20,20,0.95)",
  color: "white",
  padding: "8px 14px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  whiteSpace: "nowrap",
  border: "1px solid #444",
  boxShadow: "0 0 10px rgba(0,0,0,0.6)"
}}>
  {repo.name}
  <br/>
  ⭐ {repo.stargazers_count}
  <br/>
  {repo.language || "Unknown"}
</div>
        </Html>
      )}

    </group>
  )
}