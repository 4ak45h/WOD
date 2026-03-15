import { useEffect, useState, useRef } from "react"
import * as THREE from "three"
import Building from "./Building"
import Tree from "./Tree"
import GrassField from "./GrassField"
import Car from "./Car"



function Road({ position, width, depth }) {

  const dashRef = useRef()

  const dashLength = 3
  const gap = 4
  const thickness = 0.18

  const isVertical = width === 1
  const length = isVertical ? depth : width

  const count = Math.floor(length / (dashLength + gap))

  useEffect(() => {

    if (!dashRef.current) return

    const dummy = new THREE.Object3D()

    for (let i = 0; i < count; i++) {

      const offset = i * (dashLength + gap) - length / 2

      if (isVertical) {
        dummy.position.set(0, 0.06, offset)
      } else {
        dummy.position.set(offset, 0.06, 0)
      }

      dummy.updateMatrix()
      dashRef.current.setMatrixAt(i, dummy.matrix)

    }

    dashRef.current.instanceMatrix.needsUpdate = true

  }, [count, isVertical, length])



  return (
    <group position={position}>

      {/* asphalt */}
      <mesh>
        <boxGeometry args={[width,0.08,depth]} />
        <meshStandardMaterial color="#111111"/>
      </mesh>

      {/* dashed center line (instanced) */}

      <instancedMesh ref={dashRef} args={[null,null,count]}>
        <boxGeometry
          args={
            isVertical
              ? [thickness,0.02,dashLength]
              : [dashLength,0.02,thickness]
          }
        />
        <meshBasicMaterial color="white"/>
      </instancedMesh>

      {/* edge borders */}

      {isVertical && (
        <>
          <mesh position={[-0.45,0.06,0]}>
            <boxGeometry args={[0.12,0.02,depth]} />
            <meshBasicMaterial color="white"/>
          </mesh>

          <mesh position={[0.45,0.06,0]}>
            <boxGeometry args={[0.12,0.02,depth]} />
            <meshBasicMaterial color="white"/>
          </mesh>
        </>
      )}

      {!isVertical && (
        <>
          <mesh position={[0,0.06,-0.45]}>
            <boxGeometry args={[width,0.02,0.12]} />
            <meshBasicMaterial color="white"/>
          </mesh>

          <mesh position={[0,0.06,0.45]}>
            <boxGeometry args={[width,0.02,0.12]} />
            <meshBasicMaterial color="white"/>
          </mesh>
        </>
      )}

    </group>
  )
}



function StreetLight({ position }) {

  return (
    <group position={position}>

      <mesh position={[0,2,0]}>
        <cylinderGeometry args={[0.07,0.07,4]} />
        <meshStandardMaterial color="#aaaaaa"/>
      </mesh>

      <mesh position={[0,4,0]}>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial
          emissive="#ffd27a"
          emissiveIntensity={6}
        />
      </mesh>

      <pointLight
        position={[0,4,0]}
        intensity={7}
        distance={40}
        color="#ffd27a"
      />

    </group>
  )
}



export default function GithubCity() {

  const [repos, setRepos] = useState([])

  useEffect(() => {

    const username = "4AK45H"

    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(data => setRepos(data))

  }, [])



  const gridSize = 4
  const spacing = 10
  const blockOffset = spacing / 2

  const roads = []
  const lights = []
  const trees = []



  /* Roads */

  for (let i = -gridSize; i <= gridSize; i++) {

    roads.push(
      <Road
        key={"roadx"+i}
        position={[i * spacing, 0.05, 0]}
        width={1}
        depth={spacing * gridSize * 2}
      />
    )

    roads.push(
      <Road
        key={"roadz"+i}
        position={[0, 0.05, i * spacing]}
        width={spacing * gridSize * 2}
        depth={1}
      />
    )

  }



  /* Street lights */

  for (let x = -gridSize; x <= gridSize; x+=2) {
    for (let z = -gridSize; z <= gridSize; z+=2) {

      const baseX = x * spacing
      const baseZ = z * spacing

      lights.push(
        <StreetLight
          key={"lightA-"+x+"-"+z}
          position={[baseX + 2.5, 0, baseZ + 2.5]}
        />
      )

      lights.push(
        <StreetLight
          key={"lightB-"+x+"-"+z}
          position={[baseX - 2.5, 0, baseZ - 2.5]}
        />
      )

    }
  }



  /* Trees */

  for (let x = -gridSize; x <= gridSize; x++) {
    for (let z = -gridSize; z <= gridSize; z++) {

      if ((x + z) % 2 === 0) continue

      trees.push(
        <Tree
          key={"tree-"+x+"-"+z}
          position={[x * spacing + 3, 0, z * spacing + 3]}
        />
      )

    }
  }



  return (
    <>

      {/* ground */}
      <mesh rotation={[-Math.PI/2,0,0]} receiveShadow>
        <planeGeometry args={[200,200]} />
        <meshStandardMaterial color="#0b1f0b"/>
      </mesh>

      <GrassField/>

      {roads}

      <Car/>
      <Car/>
      <Car/>
      <Car/>
      <Car/>
      <Car/>

      {lights}

      {trees}

      {repos.map((repo, index) => {

        const row = Math.floor(index / gridSize)
        const col = index % gridSize

        const x = col * spacing - (gridSize * spacing)/2 + blockOffset
        const z = row * spacing - (gridSize * spacing)/2 + blockOffset

        const base = repo.size || 10
        const height = Math.log(base + 10) * 2

        return (
          <Building
            key={repo.id}
            position={[x, height / 2, z]}
            height={height}
            repo={repo}
          />
        )

      })}

    </>
  )
}