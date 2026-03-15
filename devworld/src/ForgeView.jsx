import StateTile from "./StateTile"

export default function ForgeView({ enterGithub }) {

  return (

    <group>

      {/* Forge land */}

      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0,0]}>
        <planeGeometry args={[60,60]} />
        <meshStandardMaterial color="#555555" />
      </mesh>


      {/* cities */}

      <StateTile
        position={[0,0.5,4]}
        label="Github"
        onClick={enterGithub}
      />

      <StateTile
        position={[14,0.5,4]}
        label="Leetcode"
      />

      <StateTile
        position={[-14,0.5,4]}
        label="Hackerrank"
      />

      <StateTile
        position={[8,0.5,-10]}
        label="Sealed"
      />

      <StateTile
        position={[-8,0.5,-10]}
        label="Sealed"
      />

    </group>

  )
}