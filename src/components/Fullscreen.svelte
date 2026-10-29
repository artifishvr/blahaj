<script lang="ts">
  import { onMount } from "svelte";
  import { Shrink, Expand } from "@lucide/svelte";

  let hasFullscreen: boolean = $state(false);

  let fullscreen = $state(false);

  onMount(() => {
    hasFullscreen = document.fullscreenEnabled;

    function updateFullscreen() {
      fullscreen = document.fullscreenElement !== null;
    }

    updateFullscreen();
    document.addEventListener("fullscreenchange", updateFullscreen);
    return () => {
      document.removeEventListener("fullscreenchange", updateFullscreen);
    };
  });

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  }
</script>

{#if hasFullscreen}
  <div class="pointer-events-auto absolute top-0 right-0 m-4 flex space-x-2">
    <button
      onclick={toggleFullscreen}
      class="bottom-0 rounded-md bg-gray-400/20 p-2 text-white backdrop-blur-sm backdrop-filter"
    >
      {#if fullscreen}
        <Shrink />
      {:else}
        <Expand />
      {/if}
    </button>
  </div>
{/if}
