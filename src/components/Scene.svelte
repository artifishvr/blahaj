<script lang="ts">
  import { T } from '@threlte/core'
  import { GLTF, OrbitControls } from '@threlte/extras'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0.45, 0, -0.8]}
  fov={70}
>
  <OrbitControls
    autoRotate
    autoRotateSpeed={(20 / 33) * 10}
    enableDamping
    enableZoom={false}
    enablePan={false}
    enableRotate={false}
  />
</T.PerspectiveCamera>

<T.AmbientLight />

<GLTF url="/blahaj.glb" />