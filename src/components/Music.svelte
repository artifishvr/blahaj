<script>
	let music = $state(false);
	let volume = $state(0.1);
	import { AudioLines, AudioLinesOff } from '@lucide/svelte';
</script>

<div class="absolute pointer-events-auto right-0 bottom-0 m-4 flex space-x-2">
	<button
		onclick={() => (music = !music)}
		class="bottom-0 rounded-md bg-gray-400/20 p-2 text-white backdrop-blur-sm backdrop-filter "
	>
		{#if music}
			<AudioLinesOff />
		{:else}
			<AudioLines />
		{/if}
	</button>
</div>

<audio
	src="discordholdmusic.mp3"
	loop
	bind:paused={() => !music, (paused) => (music = !paused)}
	bind:volume
></audio>
