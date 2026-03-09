export default function State({ position, color, onClick }) {

  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={[8, 1, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )

}