import Country from "./Country"
import State from "./State"

export default function CountryView({ enterGithub }) {

  return (
    <>

      {/* grid background */}
      <gridHelper args={[100, 100]} />

      {/* main country land */}
      <Country />

      {/* State 1 (GitHub state - active) */}
      <State
        position={[-10, 0.5, 5]}
        color="green"
        onClick={enterGithub}
      />

      {/* State 2 (locked) */}
      <State
        position={[10, 0.5, 5]}
        color="gray"
      />

      {/* State 3 (locked) */}
      <State
        position={[0, 0.5, -10]}
        color="gray"
      />

    </>
  )
}