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

const roadLines = [-30,-20,-10,0,10,20,30]

export default function Car(){

  const ref = useRef()

  const axis = Math.random() > 0.5 ? "x" : "z"

  const line = roadLines[Math.floor(Math.random()*roadLines.length)]

  const speed = 5 + Math.random()*2

  const dir = Math.random() > 0.5 ? 1 : -1

  const color = colors[Math.floor(Math.random()*colors.length)]

  useFrame((state,delta)=>{

    if(!ref.current) return

    const p = ref.current.position

    if(axis === "x"){

      p.z = line
      p.x += dir * speed * delta

      if(p.x > 40) p.x = -40
      if(p.x < -40) p.x = 40

    }

    if(axis === "z"){

      p.x = line
      p.z += dir * speed * delta

      if(p.z > 40) p.z = -40
      if(p.z < -40) p.z = 40

    }

  })

  return(
    <group ref={ref} position={[0,0.25,0]}>

      {/* car body */}

      <mesh>
        <boxGeometry args={[1.4,0.4,0.8]}/>
        <meshStandardMaterial color={color}/>
      </mesh>

      {/* headlights */}

      <pointLight
        position={[0.7,0,0]}
        intensity={3}
        distance={10}
        color="white"
      />

      {/* tail lights */}

      <pointLight
        position={[-0.7,0,0]}
        intensity={1.5}
        distance={6}
        color="red"
      />

    </group>
  )
}