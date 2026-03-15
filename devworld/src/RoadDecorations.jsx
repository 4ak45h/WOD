import { useRef, useEffect, useMemo } from "react"
import * as THREE from "three"

export function LaneMarking({ position, length, rotation }) {

  const dashLength = 1.2
  const gap = 1.5
  const count = Math.floor(length / (dashLength + gap))

  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useEffect(()=>{

    if(!meshRef.current) return

    for(let i=0;i<count;i++){

      const offset = i*(dashLength+gap) - length/2

      dummy.position.set(offset,0.06,0)
      dummy.rotation.set(0,0,0)

      dummy.updateMatrix()

      meshRef.current.setMatrixAt(i,dummy.matrix)

    }

    meshRef.current.instanceMatrix.needsUpdate = true

  },[count,dummy])

  return (

    <group position={position} rotation={rotation}>

      <instancedMesh ref={meshRef} args={[null,null,count]}>
        <boxGeometry args={[dashLength,0.02,0.15]} />
        <meshBasicMaterial color="white"/>
      </instancedMesh>

    </group>
  )
}



export function ZebraCrossing({ position, rotation }) {

  const stripes = 6

  return (
    <group position={position} rotation={rotation}>

      {Array.from({length:stripes}).map((_,i)=>(
        <mesh key={i} position={[i*0.6-1.5,0.06,0]}>
          <boxGeometry args={[0.35,0.02,2]} />
          <meshBasicMaterial color="white"/>
        </mesh>
      ))}

    </group>
  )
}



export function IntersectionBox({ position }) {

  return (
    <mesh position={[position[0],0.06,position[2]]}>
      <boxGeometry args={[3,0.02,3]} />
      <meshBasicMaterial color="#ffee33" wireframe />
    </mesh>
  )
}



export function TurnArrow({ position, rotation }) {

  return (
    <group position={position} rotation={rotation}>

      <mesh position={[0,0.06,0]}>
        <boxGeometry args={[1.2,0.02,0.2]} />
        <meshBasicMaterial color="white"/>
      </mesh>

      <mesh position={[0.6,0.06,0]}>
        <coneGeometry args={[0.35,0.7,6]} />
        <meshBasicMaterial color="white"/>
      </mesh>

    </group>
  )
}