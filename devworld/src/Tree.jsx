import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function Tree({ position }) {

  const ref = useRef()

  const type = Math.floor(Math.random()*3)

  const scale = 0.6 + Math.random()*0.5

  useFrame(({clock})=>{
    if(ref.current){
      ref.current.rotation.z =
        Math.sin(clock.elapsedTime*0.4 + position[0]) * 0.015
    }
  })

  /* Coconut tree */

  if(type === 2){
    return (
      <group position={position} scale={scale} ref={ref}>

        {/* trunk */}
        <mesh position={[0,2,0]}>
          <cylinderGeometry args={[0.12,0.18,4,6]} />
          <meshStandardMaterial color="#6b4f2a"/>
        </mesh>

        {/* leaves */}

        {Array.from({length:5}).map((_,i)=>(
          <mesh
            key={i}
            position={[0,4,0]}
            rotation={[0,(i*Math.PI)/2.5,0.5]}
          >
            <coneGeometry args={[1.6,1.6,5]} />
            <meshStandardMaterial color="#2e7d32"/>
          </mesh>
        ))}

      </group>
    )
  }

  /* Bushy tree */

  if(type === 1){
    return (
      <group position={position} scale={scale} ref={ref}>

        <mesh position={[0,1,0]}>
          <cylinderGeometry args={[0.15,0.2,2]} />
          <meshStandardMaterial color="#5b3a29"/>
        </mesh>

        <mesh position={[0,2.5,0]}>
          <sphereGeometry args={[1.2,10,10]} />
          <meshStandardMaterial color="#2e7d32"/>
        </mesh>

        <mesh position={[0.5,2.7,0]}>
          <sphereGeometry args={[0.8,8,8]} />
          <meshStandardMaterial color="#388e3c"/>
        </mesh>

      </group>
    )
  }

  /* Street tree */

  return (
    <group position={position} scale={scale} ref={ref}>

      <mesh position={[0,1,0]}>
        <cylinderGeometry args={[0.15,0.2,2]} />
        <meshStandardMaterial color="#5b3a29"/>
      </mesh>

      <mesh position={[0,2.6,0]}>
        <sphereGeometry args={[1,10,10]} />
        <meshStandardMaterial color="#2e7d32"/>
      </mesh>

    </group>
  )
}