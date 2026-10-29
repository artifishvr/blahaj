<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "#components/Scene.svelte";
  import { useProgress } from "@threlte/extras";
  import { onMount } from "svelte";
  import Music from "#components/Music.svelte";
  import Loading from "#components/Loading.svelte";
  import Fullscreen from "#components/Fullscreen.svelte";
  import SpinControls from "#components/SpinControls.svelte";

  const { progress, finishedOnce } = useProgress();

  let showControls = $state(true);
  let speedMult = $state(1);
  let controlsTimeout: ReturnType<typeof setTimeout>;

  function controls() {
    showControls = true;

    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      showControls = false;
    }, 10 * 1000);
  }

  onMount(() => {
    controls();

    return () => clearTimeout(controlsTimeout);
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="group relative h-screen w-screen bg-black"
  onpointermove={controls}
  onpointerdown={controls}
>
  <Loading {progress} {finishedOnce} />

  <div class="absolute inset-0">
    <Canvas>
      <Scene {speedMult} />
    </Canvas>
  </div>

  <div
    class="pointer-events-none absolute inset-0 z-10 transition-opacity duration-100 ease-out"
    class:opacity-100={showControls}
    class:opacity-0={!showControls}
    inert={!showControls}
  >
    <div class="fixed bottom-0 left-0 m-4 text-gray-400">
      <p class="pointer-events-auto">
        Built by
        <a href="https://arti.gay" target="_blank" class="text-blue-300">Arti</a> &lt;3
        <br />Inspired by
        <a
          href="https://web.archive.org/web/20250125012955/https://www.magishira.dev/blahaj"
          target="_blank"
          class="text-blue-300">Shira</a
        >
        <br />Model by
        <a href="https://booth.pm/en/items/3863806" target="_blank" class="text-blue-300">Lara</a>
      </p>
    </div>

    <div class="pointer-events-auto absolute right-0 bottom-0 m-4 flex space-x-2">
      <SpinControls bind:speedMult />
      <Music bind:speedMult />
    </div>

    <Fullscreen />
  </div>
</div>
