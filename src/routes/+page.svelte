<script>
    import "../app.pcss";
    import * as THREE from "three";
    import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
    import { OrbitControls } from "three/addons/controls/OrbitControls.js";
    import { onMount } from "svelte";

    let bpm = 20;
    let loading = true;
    let loadpercent = 10;

    onMount(() => {
        // three
        const container = document.getElementById("canvasFrame");

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );
        scene.background = 0xffffff;
        camera.position.z = -0.8;
        camera.position.x = 0.45;

        const manager = new THREE.LoadingManager();
        manager.onStart = function (url) {
            console.log("Started loading file: " + url);
            loading = true;
        };

        manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            loadpercent = (itemsLoaded / itemsTotal) * 100;
        };

        manager.onLoad = function () {
            console.log("Loading complete!");
            setTimeout(() => {
                loading = false;
            }, 700);
        };

        manager.onError = function (url) {
            console.log("There was an error loading " + url);
        };

        const loader = new GLTFLoader(manager);

        loader.load(
            "blahaj.glb",
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
        controls.autoRotateSpeed = (bpm / 33) * 10;
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

        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        const analyticsScript = document.createElement("script");
        analyticsScript.defer = true;
        analyticsScript.dataset.domain = "blahaj.ca";
        analyticsScript.src = "https://a.arti.lol/js/script.tagged-events.js";
        document.head.appendChild(analyticsScript);
        const plausibleExtra = document.createElement("script");
        plausibleExtra.innerHTML =
            "window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }";
        document.head.appendChild(plausibleExtra);
    });

    let firstplay = true;
    let pausemusic = true;
    let volume = 0.1;
    function playMusic() {
        pausemusic = !pausemusic;
        if (firstplay) {
            plausible("PlayMusic");
            firstplay = false;
        }
    }
</script>

<svelte:head>
    <title>blahaj go spinny</title>
</svelte:head>

<div
    class="flex pointer-events-none fixed w-full h-full top-0 left-0 items-center justify-center transition duration-500 ease-out {loading
        ? ''
        : 'opacity-0 pointer-events-none'}">
    <div
        class="m-12 flex flex-col items-center justify-center relative p-8 max-w-3xl max-h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-600/50 text-white">
        <div
            class="border-t-blue-500 animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4">
        </div>
        <h1 class="text-xl font-medium text-center">Loading 3D...</h1>
        <p class="font-medium text-center">
            This may take a while on slower connections/devices.
        </p>

        <div
            class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
            <div
                class="bg-blue-500 h-2.5 rounded-full"
                style="width: {loadpercent}%">
            </div>
        </div>
    </div>
</div>

<div class="fixed bottom-0 right-0 m-4">
    <button
        on:click={playMusic}
        class="  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 rounded-md py-2 px-4 text-white"
        >{pausemusic ? "Play" : "Pause"} Music</button>
</div>

<div class="fixed bottom-0 left-0 m-4 text-gray-400">
    <p>
        Built by <a
            href="https://arti.gay"
            target="_blank"
            class="text-blue-300">ArtificialVR</a>
        🏳️‍⚧️<br />Inspired by
        <a
            href="https://www.magishira.dev/blahaj"
            target="_blank"
            class="text-blue-300">Shira</a>
    </p>
</div>

<div id="canvasFrame" class="-z-40"></div>

<audio src="discordholdmusic.mp3" loop bind:paused={pausemusic} bind:volume
></audio>
