// import { useMemo } from "react"

// export default function GrassField() {

//   const patches = useMemo(()=>{

//     const items = []
//     const size = 200
//     const count = 400

//     for(let i=0;i<count;i++){

//       const x = (Math.random()-0.5)*size
//       const z = (Math.random()-0.5)*size
//       const scale = 0.6 + Math.random()*1.4

//       items.push(

//         <mesh
//           key={i}
//           position={[x,0.05,z]}
//           rotation={[0,Math.random()*Math.PI,0]}
//           scale={scale}
//         >
//           <coneGeometry args={[0.5,1.2,6]} />
//           <meshStandardMaterial color="#1b5e20"/>
//         </mesh>

//       )
//     }

//     return items

//   },[])

//   return <group>{patches}</group>
// }