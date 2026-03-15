import StateTile from "./StateTile"
import ForgeIsland from "./ForgeIsland"
import CityBorder from "./CityBorder"

export default function ForgeView({ enterGithub }){

  return(

    <group>

      {/* island terrain */}
      <ForgeIsland/>

      {/* city borders */}

      <CityBorder position={[0,0.2,0]} width={40} depth={0.4}/>
      <CityBorder position={[0,0.2,-8]} width={40} depth={0.4}/>

      <CityBorder position={[-10,0.2,-4]} width={0.4} depth={24}/>
      <CityBorder position={[10,0.2,-4]} width={0.4} depth={24}/>

      {/* cities */}

      <StateTile position={[0,0.5,4]} label="Github" onClick={enterGithub}/>
      <StateTile position={[14,0.5,4]} label="Leetcode"/>
      <StateTile position={[-14,0.5,4]} label="Hackerrank"/>

      <StateTile position={[8,0.5,-10]} label="Sealed"/>
      <StateTile position={[-8,0.5,-10]} label="Sealed"/>

    </group>

  )
}