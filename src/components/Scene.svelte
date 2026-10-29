<script lang="ts">
  import { T } from '@threlte/core'
  import { GLTF, OrbitControls } from '@threlte/extras'

  let { speedMult }: { speedMult: number } = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0.45, 0, -0.8]}
  fov={70}
>
  <OrbitControls
    autoRotate
    autoRotateSpeed={6 * speedMult ** 2}
    enableDamping
    enableZoom={speedMult == 0}
    enablePan={false}
    enableRotate={speedMult == 0}
  />
</T.PerspectiveCamera>

<T.AmbientLight />

<GLTF url="/blahaj.glb" />