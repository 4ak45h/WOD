import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

const colors = [
"#ff5252","#ff9800","#4caf50","#2196f3","#9c27b0","#ffc107"
]

export default function Car() {

  const ref = useRef()

  const color = colors[Math.floor(Math.random()*colors.length)]

  const speed = 4 + Math.random()*3

  let direction = Math.floor(Math.random()*4)

  useFrame((state,delta)=>{

    if(!ref.current) return

    const p = ref.current.position

    if(direction === 0) p.x += delta*speed
    if(direction === 1) p.z += delta*speed
    if(direction === 2) p.x -= delta*speed
    if(direction === 3) p.z -= delta*speed

    /* intersection turning */

    if(Math.abs(p.x % 10) < 0.1 && Math.abs(p.z % 10) < 0.1){

      if(Math.random() < 0.25){
        direction = Math.floor(Math.random()*4)
      }

    }

    /* wrap world */

    if(p.x > 40) p.x = -40
    if(p.x < -40) p.x = 40
    if(p.z > 40) p.z = -40
    if(p.z < -40) p.z = 40

  })

  return (
    <group ref={ref} position={[0,0.2,0]}>

      {/* body */}

      <mesh>
        <boxGeometry args={[1.4,0.4,0.8]} />
        <meshStandardMaterial color={color}/>
      </mesh>

      {/* headlights */}

      <pointLight position={[0.7,0,0]} intensity={3} distance={12} color="white"/>
      <pointLight position={[0.7,0,0.2]} intensity={2} distance={10} color="#fff5cc"/>

      {/* taillights */}

      <pointLight position={[-0.7,0,0.2]} intensity={1.5} distance={8} color="red"/>
      <pointLight position={[-0.7,0,-0.2]} intensity={1.5} distance={8} color="red"/>

    </group>
  )
}