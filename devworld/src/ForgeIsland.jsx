import { useMemo } from "react"

const greens = [
"#2e7d32",
"#1b5e20",
"#33691e",
"#2f6f3e",
"#3a7a42"
]

export default function ForgeIsland(){

  const tiles = useMemo(()=>{

    const arr=[]
    const size=40
    const grid=40

    for(let x=0;x<grid;x++){
      for(let z=0;z<grid;z++){

        const color=greens[Math.floor(Math.random()*greens.length)]

        arr.push(
          <mesh
            key={`${x}-${z}`}
            position={[
              (x/grid)*size - size/2,
              Math.random()*0.05,
              (z/grid)*size - size/2
            ]}
          >
            <boxGeometry args={[size/grid,0.08,size/grid]} />
            <meshStandardMaterial color={color}/>
          </mesh>
        )
      }
    }

    return arr

  },[])

  return <group>{tiles}</group>
}