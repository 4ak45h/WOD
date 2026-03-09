import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function AirTraffic({ start }) {

  const ref = useRef()

  const speed = 3 + Math.random()*3

  useFrame(({clock})=>{

    if(!ref.current) return

    const t = clock.elapsedTime * speed

    ref.current.position.x = (t % 200) - 100
    ref.current.position.y = 60 + Math.sin(t)*10
    ref.current.position.z = -80

  })

  return (

    <mesh ref={ref}>

      <sphereGeometry args={[0.3,8,8]} />

      <meshBasicMaterial
        color="white"
        emissive="white"
        emissiveIntensity={5}
      />

    </mesh>

  )

}