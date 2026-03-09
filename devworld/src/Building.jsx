import { Html } from "@react-three/drei"
import { useState } from "react"

const languageColors = {
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Java: "#b07219",
  Dart: "#00B4AB",
  TypeScript: "#3178c6",
  C: "#555555",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  default: "#90caf9"
}

export default function Building({ position, height, repo }) {

  const [hovered, setHovered] = useState(false)

  const color = languageColors[repo.language] || languageColors.default

  return (
    <mesh
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2, height, 2]} />
      <meshStandardMaterial color={color} />

      {hovered && (
        <Html distanceFactor={10}>
          <div style={{
            background: "black",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px"
          }}>
            {repo.name}
          </div>
        </Html>
      )}

    </mesh>
  )
}