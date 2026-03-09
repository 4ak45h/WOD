import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function Car({ start }) {

  const ref = useRef()

  useFrame(({clock})=>{

    const t = clock.elapsedTime

    if(ref.current){
      ref.current.position.x = start + (t*3 % 80) - 40
    }

  })

  return (
    <group ref={ref} position={[start,0.2,0]}>

      {/* car body */}
      <mesh>
        <boxGeometry args={[1,0.4,0.6]} />
        <meshStandardMaterial color="#222"/>
      </mesh>

      {/* headlights */}
      <pointLight
        position={[0.6,0,0]}
        intensity={1}
        distance={8}
        color="#ffffff"
      />

    </group>
  )
}