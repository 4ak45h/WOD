export default function CityBorder({ position, width, depth }){

  return(
    <mesh position={position}>
      <boxGeometry args={[width,0.12,depth]} />
      <meshStandardMaterial color="#3b2f1c"/>
    </mesh>
  )
}