<script>
    import '../app.pcss';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { onMount } from 'svelte';

    let bpm = 20;

    onMount(() => {
        // three
        const container = document.getElementById('canvasFrame');

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        scene.background = 0xffffff;
        camera.position.z = -0.8;
        camera.position.x = 0.45;

        const loader = new GLTFLoader();

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

        const audio = document.createElement('audio');
        audio.src = 'discordholdmusic.mp3';
        audio.loop = true;
        audio.volume = 0.1;
        document.body.appendChild(audio);

        // watching stuff
        document.addEventListener('click', () => {
            audio.play();
            plausible('PlayMusic');
        });
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                audio.pause();
            } else {
                audio.play();
            }
        });
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        const analyticsScript = document.createElement('script');
        analyticsScript.defer = true;
        analyticsScript.dataset.domain = 'blahaj.arti.gay';
        analyticsScript.src = 'https://a.arti.lol/js/script.tagged-events.js';
        document.head.appendChild(analyticsScript);
        const plausibleExtra = document.createElement('script');
        plausibleExtra.innerHTML =
            'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }';
        document.head.appendChild(plausibleExtra);
    });
</script>

<div id="canvasFrame" class="-z-40"></div>
