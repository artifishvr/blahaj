<script>
    import "../app.pcss";
    import * as THREE from "three";
    import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
    import { OrbitControls } from "three/addons/controls/OrbitControls.js";
    import { onMount } from "svelte";
    import "@fontsource-variable/nunito";
    import LoadingModal from "../components/LoadingModal.svelte";

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

<LoadingModal {loading} {loadpercent} />

<div class="fixed bottom-0 right-0 m-4">
    <button
        on:click="{playMusic}"
        class="rounded-md bg-gray-400 bg-opacity-20 bg-clip-padding px-4 py-2 text-white backdrop-blur-sm backdrop-filter">
        {pausemusic ? "Play" : "Pause"} Music
    </button>
</div>

<div class="fixed bottom-0 left-0 m-4 text-gray-400">
    <p>
        Built by
        <a href="https://arti.gay" target="_blank" class="text-blue-300"
            >ArtificialVR</a
        >
        <br />Inspired by
        <a
            href="https://www.magishira.dev/blahaj"
            target="_blank"
            class="text-blue-300"
            >Shira</a
        >
    </p>
</div>

<div id="canvasFrame" class="-z-40"></div>

<audio
    src="discordholdmusic.mp3"
    loop
    bind:paused="{pausemusic}"
    bind:volume></audio>

<style>
    :global(body) {
        font-family: "Nunito Variable", sans-serif;
    }
</style>
