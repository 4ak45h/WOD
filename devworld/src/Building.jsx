import { Html } from "@react-three/drei"
import { useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"

const languageStyles = {
  JavaScript: { color:"#f7df1e" },
  Python: { color:"#3572A5" },
  Java: { color:"#b07219" },
  TypeScript: { color:"#3178c6" },
  Dart: { color:"#00B4AB" },
  default: { color:"#4da6ff" }
}

export default function Building({ position, height, repo }) {

  const [hovered,setHovered] = useState(false)
  const ref = useRef()

  const style = languageStyles[repo.language] || languageStyles.default
  const stars = repo.stargazers_count || 0

  const tiers = Math.max(3, Math.floor(height / 2))

  useFrame(({clock})=>{
    if(ref.current){
      ref.current.rotation.y =
        Math.sin(clock.elapsedTime*0.15 + repo.id)*0.015
    }
  })

  return (
    <group position={[position[0],0,position[2]]} ref={ref}>

      {Array.from({ length: tiers }).map((_, i) => {

        const y = i * 2
        const scale = 1 - i * 0.08

        return (
          <group key={i}>

            {/* tower section */}

            <mesh
              position={[0,y+1,0]}
              scale={[scale,1,scale]}
              castShadow
              receiveShadow
              onPointerOver={()=>setHovered(true)}
              onPointerOut={()=>setHovered(false)}
            >
              <boxGeometry args={[3,2,3]} />

              <meshPhysicalMaterial
                color={style.color}
                roughness={0.15}
                metalness={0.7}
                reflectivity={1}
                clearcoat={1}
              />

            </mesh>


            {/* FRONT WINDOWS */}

            <mesh position={[0,y+1,1.52]}>
              <boxGeometry args={[1.2,0.5,0.05]} />
              <meshStandardMaterial
                color="#fff4c2"
                emissive="#fff4c2"
                emissiveIntensity={3.5}
              />
            </mesh>


            {/* BACK WINDOWS */}

            <mesh position={[0,y+1,-1.52]}>
              <boxGeometry args={[1.2,0.5,0.05]} />
              <meshStandardMaterial
                color="#fff4c2"
                emissive="#fff4c2"
                emissiveIntensity={3.5}
              />
            </mesh>


            {/* RIGHT WINDOWS */}

            <mesh position={[1.52,y+1,0]}>
              <boxGeometry args={[0.05,0.5,1.2]} />
              <meshStandardMaterial
                color="#fff4c2"
                emissive="#fff4c2"
                emissiveIntensity={3.5}
              />
            </mesh>


            {/* LEFT WINDOWS */}

            <mesh position={[-1.52,y+1,0]}>
              <boxGeometry args={[0.05,0.5,1.2]} />
              <meshStandardMaterial
                color="#fff4c2"
                emissive="#fff4c2"
                emissiveIntensity={3.5}
              />
            </mesh>


            {/* neon band for popular repos */}

            {stars > 5 && (
              <mesh position={[0,y+2,1.55]}>
                <boxGeometry args={[3,0.05,0.05]} />
                <meshStandardMaterial
                  emissive={style.color}
                  emissiveIntensity={Math.min(stars/5,5)}
                />
              </mesh>
            )}

          </group>
        )
      })}


      {/* rooftop antenna */}

      {height > 8 && (
        <mesh position={[0,tiers*2 + 1,0]}>
          <cylinderGeometry args={[0.15,0.15,2]} />
          <meshStandardMaterial
            emissive="white"
            emissiveIntensity={2}
          />
        </mesh>
      )}


      {/* hover label */}

      {hovered && (
        <Html
          position={[0,tiers*2 + 3,0]}
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