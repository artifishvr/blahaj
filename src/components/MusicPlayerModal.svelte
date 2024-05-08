<script>
    import * as realtimeBpm from "realtime-bpm-analyzer";
    import { bpm } from "$lib/stores";

    export let show;

    let bpmDetermined = true;

    let downloadurl = "";

    async function playMusic() {
        // Set the source with the HTML Audio Node
        const track = document.getElementById("track");

        const response = await fetch("https://co.wuk.sh/api/json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                url: downloadurl,
                isAudioOnly: true,
            }),
        });
        const data = await response.json();
        console.log(data);
        track.src = data.url;
        bpmDetermined = false;
        const audioContext = new AudioContext();

        const realtimeAnalyzerNode =
            await realtimeBpm.createRealTimeBpmProcessor(audioContext);
        track.play();
        const source = audioContext.createMediaElementSource(track);
        const lowpass = realtimeBpm.getBiquadFilter(audioContext);

        // Connect nodes together
        source.connect(lowpass).connect(realtimeAnalyzerNode);
        source.connect(audioContext.destination);

        realtimeAnalyzerNode.port.onmessage = (event) => {
            if (event.data.message === "BPM_STABLE") {
                console.log("BPM_STABLE", event.data.data.bpm[0].tempo);
                bpm.set(event.data.data.bpm[0].tempo);
                bpmDetermined = true;
            }
        };
    }
</script>

<div
    class="{show ? '' : 'opacity-0 pointer-events-none'} fixed left-0 top-0 flex h-full w-full items-center justify-center transition duration-500 ease-out">
    <div
        class="relative m-12 flex max-h-full max-w-3xl flex-col items-center justify-center rounded-md border border-gray-600/50 bg-gray-400 bg-opacity-10 bg-clip-padding p-8 text-white backdrop-blur-md backdrop-filter">
        <h1 class="text-center text-2xl font-medium pb-2">
            Music Player
        </h1>
        
        <audio
            crossorigin="anonymous"
            id="track"></audio>

        <input placeholder="Youtube, Soundcloud" type="text" bind:value={downloadurl} class="rounded-md border border-gray-600/50 bg-gray-400 bg-opacity-10 bg-clip-padding p-2 text-white backdrop-blur-md backdrop-filter text-center">
        <button
            on:click="{playMusic}"
            class="rounded-md mt-2 bg-gray-400 bg-opacity-20 bg-clip-padding px-4 py-2 text-white backdrop-blur-sm backdrop-filter">
            Play
        </button>
        <p class="pt-2 {bpmDetermined ? 'hidden' : "animate-pulse"}">blahaj is listening! give them a moment c:</p>
    </div>
</div>
