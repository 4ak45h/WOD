import { useRef, useMemo, useEffect } from "react"
import * as THREE from "three"

export default function Tree({ count = 80, area = 200 }) {

  const trunkRef = useRef()
  const leafRef = useRef()

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useEffect(() => {

    for (let i = 0; i < count; i++) {

      const x = (Math.random() - 0.5) * area
      const z = (Math.random() - 0.5) * area
      const scale = 0.7 + Math.random() * 0.6

      /* trunk */

      dummy.position.set(x, 1, z)
      dummy.scale.set(scale, scale, scale)
      dummy.updateMatrix()

      trunkRef.current.setMatrixAt(i, dummy.matrix)

      /* leaves */

      dummy.position.set(x, 2.6 * scale, z)
      dummy.scale.set(scale, scale, scale)
      dummy.updateMatrix()

      leafRef.current.setMatrixAt(i, dummy.matrix)

    }

    trunkRef.current.instanceMatrix.needsUpdate = true
    leafRef.current.instanceMatrix.needsUpdate = true

  }, [count, area, dummy])

  return (
    <group>

      {/* trunks */}

      <instancedMesh ref={trunkRef} args={[null, null, count]}>
        <cylinderGeometry args={[0.15,0.2,2,6]} />
        <meshStandardMaterial color="#5b3a29"/>
      </instancedMesh>

      {/* leaves */}

      <instancedMesh ref={leafRef} args={[null, null, count]}>
        <sphereGeometry args={[1,8,8]} />
        <meshStandardMaterial color="#2e7d32"/>
      </instancedMesh>

    </group>
  )
}