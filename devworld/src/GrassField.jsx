import { useRef, useMemo, useEffect } from "react"
import * as THREE from "three"

export default function GrassField() {

  const meshRef = useRef()
  const count = 400
  const size = 200

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useEffect(() => {

    if (!meshRef.current) return

    for (let i = 0; i < count; i++) {

      const x = (Math.random() - 0.5) * size
      const z = (Math.random() - 0.5) * size
      const scale = 0.6 + Math.random() * 1.4

      dummy.position.set(x, 0.05, z)
      dummy.rotation.set(0, Math.random() * Math.PI, 0)
      dummy.scale.set(scale, scale, scale)

      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)

    }

    meshRef.current.instanceMatrix.needsUpdate = true

  }, [dummy])

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <coneGeometry args={[0.5,1.2,6]} />
      <meshStandardMaterial color="#1b5e20"/>
    </instancedMesh>
  )
}