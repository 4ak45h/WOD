import { useEffect, useState } from "react"
import Building from "./Building"

function Road({ position, width, depth }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, 0.1, depth]} />
      <meshStandardMaterial color="#333" />
    </mesh>
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

  return (
    <>
      <mesh rotation={[-Math.PI/2,0,0]} receiveShadow>
  <planeGeometry args={[200,200]} />
  <meshStandardMaterial color="#1a1a1a" />
</mesh>

      {roads}

      {repos.map((repo, index) => {

        const row = Math.floor(index / gridSize)
        const col = index % gridSize

        // shift buildings into blocks instead of roads
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