<script>
    import * as realtimeBpm from 'realtime-bpm-analyzer';
    import { bpm } from '$lib/stores';
    import AudioMotionAnalyzer from 'audiomotion-analyzer';

    export let show;

    let bpmDetermined = true;
    let pausemusic = true;
    let ytURL = '';
    let volume = 100;
    let lastBpm = 20;
    let firstplay = true;

    async function loadMusic() {
        const track = document.getElementById('track');
        const response = await fetch(`/stream/${encodeURIComponent(ytURL)}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        track.src = url;
        track.src = `/stream/${encodeURIComponent(ytURL)}`;
        bpmDetermined = false;
        ytURL = '';
        const audioContext = new AudioContext();

        const realtimeAnalyzerNode = await realtimeBpm.createRealTimeBpmProcessor(audioContext);
        pausemusic = false;
        track.play();
        const source = audioContext.createMediaElementSource(track);
        const lowpass = realtimeBpm.getBiquadFilter(audioContext);

        // Connect nodes together
        source.connect(lowpass).connect(realtimeAnalyzerNode);
        source.connect(audioContext.destination);

        realtimeAnalyzerNode.port.onmessage = (event) => {
            if (event.data.message === 'BPM_STABLE') {
                console.log('blåhaj thinks the bpm is ', event.data.data.bpm[0].tempo);
                bpm.set(event.data.data.bpm[0].tempo);
                lastBpm = event.data.data.bpm[0].tempo;
                bpmDetermined = true;
            }
        };

        if (firstplay) {
            firstplay = false;
            plausible('PlayCustomMusic');
            new AudioMotionAnalyzer(document.getElementById('audiovisualizer'), {
                source: track,
                overlay: true,
                showBgColor: false,
                alphaBars: true,
                gradient: 'steelblue',
                showScaleX: false,
            });
        }
    }

    $: if (pausemusic) {
        bpm.set(20);
    } else {
        bpm.set(lastBpm);
    }
</script>

<div
    class="{show
        ? ''
        : 'opacity-0 pointer-events-none'} fixed left-0 top-0 flex h-full w-full items-center justify-center transition duration-200 ease-in-out">
    <div
        class="relative m-12 flex max-h-full max-w-3xl flex-col items-center justify-center rounded-md border border-gray-600/50 bg-gray-400 bg-opacity-10 bg-clip-padding p-8 text-white backdrop-blur-md backdrop-filter">
        <button on:click={() => (show = false)}
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute right-0 top-0 m-4 h-6 w-6 cursor-pointer"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
            </svg></button>
        <h1 class="text-center text-2xl font-medium">Custom Music</h1>
        <h1 class="pb-2 text-center text-sm font-medium">(experimental, work in progress)</h1>

        <audio id="track" bind:paused={pausemusic} loop />

        <input
            placeholder="Youtube Link"
            type="text"
            bind:value={ytURL}
            class="w-64 rounded-md border border-gray-600/50 bg-gray-400 bg-opacity-10 bg-clip-padding p-2 text-white backdrop-blur-md backdrop-filter text-center" />

        <div
            class="w-64 mt-2 rounded-md border border-gray-600/50 bg-gray-400 bg-opacity-10 bg-clip-padding p-2 text-white backdrop-blur-md backdrop-filter text-center">
            <p>Volume</p>
            <input
                id="default-range"
                type="range"
                bind:value={volume}
                on:input={() => (document.getElementById('track').volume = volume / 100)} />
        </div>
        <div class="flex space-x-2">
            <button
                on:click={loadMusic}
                class="mt-2 rounded-md bg-gray-400 bg-opacity-20 bg-clip-padding px-4 py-2 text-white backdrop-blur-sm backdrop-filter">
                Load
            </button>

            <button
                on:click={() => {
                    pausemusic = !pausemusic;
                }}
                class="mt-2 rounded-md bg-gray-400 bg-opacity-20 bg-clip-padding p-2 text-white backdrop-blur-sm backdrop-filter">
                {pausemusic ? 'Play' : 'Pause'} Music
            </button>
        </div>
        <p class="{bpmDetermined ? 'hidden' : 'animate-pulse'} pt-2">blahaj is listening! give them a moment c:</p>
    </div>
</div>

<div id="audiovisualizer" class="fixed w-screen min-h-32 inset-x-0 bottom-0"></div>
