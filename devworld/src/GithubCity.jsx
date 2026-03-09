import { useEffect, useState } from "react"
import Building from "./Building"

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
        <cylinderGeometry args={[0.05,0.05,4]} />
        <meshStandardMaterial color="#888"/>
      </mesh>

      {/* light source */}
      <pointLight
        position={[0,4,0]}
        intensity={1.5}
        distance={20}
        color="#ffd27a"
      />

      {/* glowing bulb */}
      <mesh position={[0,4,0]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial
          emissive="#ffd27a"
          emissiveIntensity={2}
        />
      </mesh>

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

  /* generate roads */

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

  /* generate street lights at intersections */

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

  return (
    <>

      {/* cement ground */}
      <mesh rotation={[-Math.PI/2,0,0]} receiveShadow>
        <planeGeometry args={[200,200]} />
        <meshStandardMaterial color="#b8b8b8" />
      </mesh>

      {/* roads */}
      {roads}

      {/* street lights */}
      {lights}

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