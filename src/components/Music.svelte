<script lang="ts">
  let music = $state(false);
  let wasMusic = $state(false);

  let volume = $state(0.1);
  import { AudioLines, AudioLinesOff } from "@lucide/svelte";

  let audio: HTMLAudioElement;

  let { speedMult = $bindable() }: { speedMult: number } = $props();

  $effect(() => {
    if (speedMult <= 0.05) {
      music = false;
      wasMusic = true;
    } else {
      if (wasMusic) {
        music = true;
        wasMusic = false;
      }
      audio.playbackRate = speedMult;
      audio.preservesPitch = false;
    }
  });

  function handleClick() {
    if (music) {
      music = false;
    } else {
      if (speedMult <= 0.05) {
        speedMult = 1;
      }
      music = true;
    }
  }
</script>

<button
  onclick={handleClick}
  class="bottom-0 rounded-md bg-gray-400/20 p-2 text-white backdrop-blur-sm backdrop-filter"
>
  {#if music}
    <AudioLinesOff />
  {:else}
    <AudioLines />
  {/if}
</button>

<audio
  bind:this={audio}
  src="discordholdmusic.mp3"
  loop
  bind:paused={() => !music, (paused) => (music = !paused)}
  bind:volume
></audio>
