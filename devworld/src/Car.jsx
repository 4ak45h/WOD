import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

const colors = [
"#ff5252",
"#ff9800",
"#4caf50",
"#2196f3",
"#9c27b0",
"#ffc107"
]

export default function Car({ start }) {

  const ref = useRef()

  const speed = 2 + Math.random()*2
  const direction = Math.floor(Math.random()*4)

  const color = colors[Math.floor(Math.random()*colors.length)]

  useFrame(({clock})=>{

    const t = clock.elapsedTime * speed

    if(!ref.current) return

    if(direction === 0) ref.current.position.x = (t % 80) - 40
    if(direction === 1) ref.current.position.z = (t % 80) - 40
    if(direction === 2) ref.current.position.x = 40 - (t % 80)
    if(direction === 3) ref.current.position.z = 40 - (t % 80)

  })

  return (
    <group ref={ref} position={start}>

      {/* car body */}

      <mesh>
        <boxGeometry args={[1.2,0.4,0.7]} />
        <meshStandardMaterial color={color}/>
      </mesh>

      {/* headlights */}

<pointLight
  position={[0.7,0,0]}
  intensity={4}
  distance={25}
  color="#ffffff"
/>

<pointLight
  position={[0.7,0.1,0.2]}
  intensity={2}
  distance={20}
  color="#fff5cc"
/>

    </group>
  )
}