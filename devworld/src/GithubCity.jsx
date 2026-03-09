import { useEffect, useState } from "react"
import Building from "./Building"

function Road({ position, width, depth }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, 0.1, depth]} />
      <meshStandardMaterial color="#444" />
    </mesh>
  )
}

export default function GithubCity() {

  const [repos, setRepos] = useState([])

  useEffect(() => {

    const username = "YOUR_GITHUB_USERNAME"

    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(data => setRepos(data))

  }, [])

  const gridSize = 5
  const spacing = 8

  const roads = []

  for (let i = -2; i <= 2; i++) {

    roads.push(
      <Road
        key={"roadx"+i}
        position={[i * spacing, 0.05, 0]}
        width={1}
        depth={spacing * gridSize}
      />
    )

    roads.push(
      <Road
        key={"roadz"+i}
        position={[0, 0.05, i * spacing]}
        width={spacing * gridSize}
        depth={1}
      />
    )

  }

  return (
    <>
      <gridHelper args={[100,100]} />

      {roads}

      {repos.map((repo, index) => {

        const row = Math.floor(index / gridSize)
        const col = index % gridSize

        const x = col * spacing - 16
        const z = row * spacing - 16

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