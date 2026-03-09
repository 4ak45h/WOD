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
  const windowRef = useRef([])

  const style = languageStyles[repo.language] || languageStyles.default
  const stars = repo.stargazers_count || 0
  const tiers = Math.max(3, Math.floor(height / 2))

  useFrame(({clock})=>{

    if(ref.current){
      ref.current.rotation.y =
        Math.sin(clock.elapsedTime*0.15 + repo.id)*0.015
    }

    /* window flicker */

    windowRef.current.forEach((w,i)=>{
      if(!w) return
      w.material.emissiveIntensity =
        2.5 + Math.sin(clock.elapsedTime*2 + i)*0.8
    })

  })

  return (
    <group position={[position[0],0,position[2]]} ref={ref}>

      {Array.from({ length: tiers }).map((_, i) => {

        const y = i * 2
        const scale = 1 - i * 0.08

        return (
          <group key={i}>

            {/* tower */}

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

            {/* windows */}

            {[
              [0,y+1,1.52],
              [0,y+1,-1.52],
              [1.52,y+1,0],
              [-1.52,y+1,0]
            ].map((p,wi)=>(
              <mesh
                key={wi}
                ref={el => windowRef.current[i*4 + wi] = el}
                position={p}
              >
                <boxGeometry args={[1.2,0.5,0.05]} />
                <meshStandardMaterial
                  color="#fff4c2"
                  emissive="#fff4c2"
                  emissiveIntensity={3}
                />
              </mesh>
            ))}

            {/* neon band */}

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

      {/* antenna */}

      {height > 8 && (
        <mesh position={[0,tiers*2 + 1,0]}>
          <cylinderGeometry args={[0.15,0.15,2]} />
          <meshStandardMaterial emissive="white" emissiveIntensity={2}/>
        </mesh>
      )}

      {/* hover label */}

      {hovered && (
        <Html position={[0,tiers*2 + 3,0]} center>
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