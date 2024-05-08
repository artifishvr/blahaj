<script>
    import * as realtimeBpm from "realtime-bpm-analyzer";
    import { bpm } from "$lib/stores";

    export let show;

    async function playMusic() {
        const audioContext = new AudioContext();

        const realtimeAnalyzerNode =
            await realtimeBpm.createRealTimeBpmProcessor(audioContext);

        // Set the source with the HTML Audio Node
        const track = document.getElementById("track");
        track.play();
        const source = audioContext.createMediaElementSource(track);
        const lowpass = realtimeBpm.getBiquadFilter(audioContext);

        // Connect nodes together
        source.connect(lowpass).connect(realtimeAnalyzerNode);
        source.connect(audioContext.destination);

        realtimeAnalyzerNode.port.onmessage = (event) => {
            // if (event.data.message === "BPM") {
            //     console.log("BPM", event.data.data.bpm);
            // }
            if (event.data.message === "BPM_STABLE") {
                console.log("BPM_STABLE", event.data.data.bpm[0].tempo);
                bpm.set(event.data.data.bpm[0].tempo);
            }
        };
    }
</script>

<div
    class="{show ? '' : 'opacity-0 pointer-events-none'} fixed left-0 top-0 flex h-full w-full items-center justify-center transition duration-500 ease-out">
    <div
        class="relative m-12 flex max-h-full max-w-3xl flex-col items-center justify-center rounded-md border border-gray-600/50 bg-gray-400 bg-opacity-10 bg-clip-padding p-8 text-white backdrop-blur-md backdrop-filter">
        <h1 class="text-center text-xl font-medium">Custom Music Player</h1>
        <audio
            crossorigin="anonymous"
            src="music.mp3"
            id="track"
            volume="0.1"></audio>
        <button
            on:click="{playMusic}"
            class="rounded-md bg-gray-400 bg-opacity-20 bg-clip-padding px-4 py-2 text-white backdrop-blur-sm backdrop-filter">
            hi
        </button>
    </div>
</div>
