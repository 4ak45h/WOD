import { Html } from "@react-three/drei"
import { useState, useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const languageStyles = {
  JavaScript:{color:"#f7df1e"},
  Python:{color:"#3572A5"},
  Java:{color:"#b07219"},
  TypeScript:{color:"#3178c6"},
  Dart:{color:"#00B4AB"},
  default:{color:"#4da6ff"}
}

export default function Building({ position, height, repo }){

  const [hovered,setHovered] = useState(false)
  const ref = useRef()
  const windowRef = useRef([])

  const style = languageStyles[repo.language] || languageStyles.default
  const stars = repo.stargazers_count || 0
  const tiers = Math.max(3,Math.floor(height/2))

  const boxGeo = useMemo(()=>new THREE.BoxGeometry(3,2,3),[])
  const winGeo = useMemo(()=>new THREE.BoxGeometry(1.2,0.5,0.05),[])
  const neonGeo = useMemo(()=>new THREE.BoxGeometry(3,0.05,0.05),[])
  const antennaGeo = useMemo(()=>new THREE.CylinderGeometry(0.15,0.15,2),[])

  useFrame(({clock})=>{

    if(ref.current){
      ref.current.rotation.y =
      Math.sin(clock.elapsedTime*0.15 + repo.id)*0.015
    }

    windowRef.current.forEach((w,i)=>{
      if(!w) return
      w.material.emissiveIntensity =
      2.5 + Math.sin(clock.elapsedTime*2 + i)*0.8
    })

  })

  return(

    <group position={[position[0],0,position[2]]} ref={ref}>

      {Array.from({length:tiers}).map((_,i)=>{

        const y = i*2
        const scale = 1 - i*0.08

        return(

          <group key={i}>

            <mesh
              geometry={boxGeo}
              position={[0,y+1,0]}
              scale={[scale,1,scale]}
              castShadow
              receiveShadow
              onPointerOver={()=>setHovered(true)}
              onPointerOut={()=>setHovered(false)}
            >
              <meshPhysicalMaterial
                color={style.color}
                roughness={0.15}
                metalness={0.7}
                reflectivity={1}
                clearcoat={1}
              />
            </mesh>

            {[
              [0,y+1,1.52],
              [0,y+1,-1.52],
              [1.52,y+1,0],
              [-1.52,y+1,0]
            ].map((p,wi)=>(
              <mesh
                key={wi}
                geometry={winGeo}
                ref={el=>windowRef.current[i*4+wi]=el}
                position={p}
              >
                <meshStandardMaterial
                  color="#fff4c2"
                  emissive="#fff4c2"
                  emissiveIntensity={3}
                />
              </mesh>
            ))}

            {stars>5 &&(
              <mesh geometry={neonGeo} position={[0,y+2,1.55]}>
                <meshStandardMaterial
                  emissive={style.color}
                  emissiveIntensity={Math.min(stars/5,5)}
                />
              </mesh>
            )}

          </group>

        )

      })}

      {height>8&&(
        <mesh geometry={antennaGeo} position={[0,tiers*2+1,0]}>
          <meshStandardMaterial emissive="white" emissiveIntensity={2}/>
        </mesh>
      )}

      {hovered&&(
        <Html position={[0,tiers*2+3,0]} center>
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
            {repo.name}<br/>
            ⭐ {repo.stargazers_count}<br/>
            {repo.language||"Unknown"}
          </div>
        </Html>
      )}

    </group>

  )
}