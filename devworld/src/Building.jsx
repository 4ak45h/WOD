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

  const floors = Math.max(3, Math.floor(height / 2))

  useFrame(({clock})=>{
    if(ref.current){
      ref.current.rotation.y =
        Math.sin(clock.elapsedTime*0.15 + repo.id)*0.02
    }
  })

  return (
    <group position={[position[0],0,position[2]]} ref={ref}>

      {Array.from({ length: floors }).map((_, i) => {

        const y = i * 1.8 + 0.9

        return (
          <group key={i}>

            {/* main building floor */}
            <mesh
              position={[0,y,0]}
              castShadow
              receiveShadow
              onPointerOver={()=>setHovered(true)}
              onPointerOut={()=>setHovered(false)}
            >
              <boxGeometry args={[3,1.8,3]} />

              <meshStandardMaterial
                color={color}
                roughness={0.4}
                metalness={0.2}
                emissive={color}
                emissiveIntensity={glow}
              />
            </mesh>

{/* windows on building faces */}
{Array.from({length:6}).map((_,w)=>{

  const side = w % 3
  const offset = 1.45

  let pos = [0,y,0]

  if(side === 0) pos = [offset, y, 0]
  if(side === 1) pos = [-offset, y, 0]
  if(side === 2) pos = [0, y, offset]

  return (
    <mesh key={w} position={pos}>
      <boxGeometry args={[0.25,0.6,0.02]} />
      <meshStandardMaterial
        color="#fff4c2"
        emissive="#fff4c2"
        emissiveIntensity={Math.random()*0.9}
      />
    </mesh>
  )

})}

      {/* antenna */}
      {height > 8 && (
        <mesh position={[0,floors*1.8 + 1,0]}>
          <cylinderGeometry args={[0.15,0.15,2]} />
          <meshStandardMaterial emissive="white" emissiveIntensity={1}/>
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
            background:"rgba(20,20,20,0.95)",
            color:"white",
            padding:"8px 14px",
            borderRadius:"8px",
            fontSize:"14px",
            fontWeight:"600",
            whiteSpace:"nowrap",
            border:"1px solid #444"
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