<script>
    import '../app.pcss';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import WebGL from 'three/addons/capabilities/WebGL.js';
    import { onMount } from 'svelte';
    import '@fontsource-variable/nunito';
    import LoadingModal from '../components/LoadingModal.svelte';
    import MusicPlayerModal from '../components/MusicPlayerModal.svelte';
    import { bpm } from '$lib/stores';
    import screenfull from 'screenfull';

    let bpm_value;

    bpm.subscribe((value) => {
        bpm_value = value;
    });

    let loading = true;
    let loadpercent = 10;

    let showCustomMusicPlayer = false;

    onMount(() => {
        // three
        const container = document.getElementById('canvasFrame');

        if (!WebGL.isWebGLAvailable()) return alert('Your browser does not appear to support WebGL. Learn more at https://get.webgl.org.');
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        scene.background = 0xffffff;
        camera.position.z = -0.8;
        camera.position.x = 0.45;

        const manager = new THREE.LoadingManager();
        manager.onStart = function (url) {
            console.log('Started loading file: ' + url);
            loading = true;
        };

        manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            loadpercent = (itemsLoaded / itemsTotal) * 100;
        };

        manager.onLoad = function () {
            console.log('Loading complete!');
            setTimeout(() => {
                loading = false;
            }, 700);
        };

        manager.onError = function (url) {
            console.log('There was an error loading ' + url);
        };

        const loader = new GLTFLoader(manager);

        loader.load(
            'blahaj.glb',
            function (gltf) {
                scene.add(gltf.scene);
            },
            undefined,
            function (error) {
                console.error(error);
            },
        );

        const controls = new OrbitControls(camera, renderer.domElement);

        controls.autoRotate = true;
        controls.autoRotateSpeed = (bpm_value / 33) * 10;
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = true;
        controls.enableRotate = false;

        const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        scene.add(light);

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        bpm.subscribe((value) => {
            controls.autoRotateSpeed = (value / 33) * 10;
        });

        const analyticsScript = document.createElement('script');
        analyticsScript.defer = true;
        analyticsScript.dataset.domain = 'blahaj.ca';
        analyticsScript.src = 'https://a.arti.lol/js/script.tagged-events.js';
        document.head.appendChild(analyticsScript);
        const plausibleExtra = document.createElement('script');
        plausibleExtra.innerHTML =
            'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }';
        document.head.appendChild(plausibleExtra);
    });

    let firstplay = true;
    let pausemusic = true;
    let volume = 0.1;
    function playMusic() {
        pausemusic = !pausemusic;
        if (firstplay) {
            plausible('PlayMusic');
            firstplay = false;
        }
    }

    let isFullscreen = false;

    if (screenfull.isEnabled) {
        screenfull.on('change', () => {
            isFullscreen = screenfull.isFullscreen;
        });
    }
</script>

<svelte:head>
    <title>blåhaj go spinny</title>
</svelte:head>

<LoadingModal {loading} {loadpercent} />

<MusicPlayerModal bind:show={showCustomMusicPlayer} />

<div class="fixed top-0 right-0 m-4 text-gray-400">
    <button
        on:click={() => {
            if (screenfull.isEnabled) {
                screenfull.request();
                isFullscreen = true;
            } else {
                alert('fullscreen not supported :c');
            }
        }}
        class="{isFullscreen
            ? 'hidden'
            : ''} rounded-md bottom-0 bg-gray-400 bg-opacity-20 bg-clip-padding p-2 text-white backdrop-blur-sm backdrop-filter">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-maximize"
            ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 4l4 0l0 4" /><path d="M14 10l6 -6" /><path
                d="M8 20l-4 0l0 -4" /><path d="M4 20l6 -6" /><path d="M16 20l4 0l0 -4" /><path d="M14 14l6 6" /><path d="M8 4l-4 0l0 4" /><path
                d="M4 4l6 6" /></svg>
    </button>

    <button
        on:click={() => {
            if (screenfull.isEnabled) {
                screenfull.exit();
                isFullscreen = false;
            }
        }}
        class="{isFullscreen
            ? ''
            : 'hidden'} rounded-md bottom-0 bg-gray-400 bg-opacity-20 bg-clip-padding p-2 text-white backdrop-blur-sm backdrop-filter">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-minimize"
            ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 9l4 0l0 -4" /><path d="M3 3l6 6" /><path d="M5 15l4 0l0 4" /><path
                d="M3 21l6 -6" /><path d="M19 9l-4 0l0 -4" /><path d="M15 9l6 -6" /><path d="M19 15l-4 0l0 4" /><path d="M15 15l6 6" /></svg>
    </button>
</div>

<div class="fixed bottom-0 right-0 m-4 flex space-x-2">
    <button
        on:click={playMusic}
        class=" rounded-md bg-gray-400 bg-opacity-20 bg-clip-padding px-4 py-2 text-white backdrop-blur-sm backdrop-filter">
        {pausemusic ? 'Play' : 'Pause'} Music</button>
    <button
        on:click={() => (showCustomMusicPlayer = !showCustomMusicPlayer)}
        class="rounded-md bottom-0 bg-gray-400 bg-opacity-20 bg-clip-padding p-2 text-white backdrop-blur-sm backdrop-filter">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-music"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            <path d="M13 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            <path d="M9 17v-13h10v13" />
            <path d="M9 8h10" />
        </svg>
    </button>
</div>

<div class="fixed bottom-0 left-0 m-4 text-gray-400">
    <p>
        Built by
        <a href="https://arti.gay" target="_blank" class="text-blue-300">ArtificialVR</a>
        <br />Inspired by
        <a href="https://www.magishira.dev/blahaj" target="_blank" class="text-blue-300">Shira</a>
    </p>
</div>

<div id="canvasFrame" class="-z-40"></div>

<audio src="discordholdmusic.mp3" loop bind:paused={pausemusic} bind:volume></audio>

<style>
    :global(body) {
        font-family: 'Nunito Variable', sans-serif;
    }
</style>
