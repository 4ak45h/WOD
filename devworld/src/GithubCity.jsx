import { useEffect, useState } from "react"
import Building from "./Building"
import Tree from "./Tree"
import GrassField from "./GrassField"
import Car from "./Car"

function Road({ position, width, depth }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, 0.08, depth]} />
      <meshStandardMaterial color="#111111" />
    </mesh>
  )
}

function StreetLight({ position }) {
  return (
    <group position={position}>

      {/* pole */}
      <mesh position={[0,2,0]}>
        <cylinderGeometry args={[0.07,0.07,4]} />
        <meshStandardMaterial color="#aaaaaa"/>
      </mesh>

      {/* glowing bulb */}
      <mesh position={[0,4,0]}>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial
          emissive="#ffd27a"
          emissiveIntensity={6}
        />
      </mesh>

      {/* actual light */}
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

  /* roads */

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

  /* street lights */

  for (let x = -gridSize; x <= gridSize; x++) {
    for (let z = -gridSize; z <= gridSize; z++) {

      if (Math.abs(x) === gridSize || Math.abs(z) === gridSize) continue

      lights.push(
        <StreetLight
          key={"light-"+x+"-"+z}
          position={[x * spacing, 0, z * spacing]}
        />
      )
    }
  }

  /* roadside trees */

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

      {/* soil base */}
      <mesh rotation={[-Math.PI/2,0,0]} receiveShadow>
        <planeGeometry args={[200,200]} />
        <meshStandardMaterial color="#0b1f0b"/>
      </mesh>

      {/* grass patches */}
      <GrassField/>

      {/* roads */}
      {roads}

      {/* moving traffic */}
      <Car start={[-40,0.2,0]} />
      <Car start={[40,0.2,0]} />
      <Car start={[0,0.2,-40]} />
      <Car start={[0,0.2,40]} />
      <Car start={[20,0.2,-30]} />
      <Car start={[-25,0.2,30]} />

      {/* lights */}
      {lights}

      {/* trees */}
      {trees}

      {/* buildings */}
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