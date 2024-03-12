<script>
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { onMount } from 'svelte';

    onMount(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

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
        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        camera.position.z = -0.8;
        camera.position.x = 0.45;

        scene.background = 0xffffff;

        const controls = new OrbitControls(camera, renderer.domElement);

        controls.autoRotate = true;
        controls.autoRotateSpeed = 10;
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.enableRotate = false;

        const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.2);
        scene.add(light);

        function animate() {
            requestAnimationFrame(animate);
            camera.rotateY(0.1);
            camera.rotateZ(0.2);
//blahaj spins at ~5 bpm
            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        document.body.style.filter = 'blur(5px)';

        const audio = document.createElement('audio');
        audio.src = 'discordholdmusic.mp3';
        audio.id = 'discordAudio';
        audio.loop = true;
        audio.volume = 0.1;
        document.body.appendChild(audio);

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                document.getElementById('discordAudio').pause();
            } else {
                document.getElementById('discordAudio').play();
            }
        });
        document.body.addEventListener('click', function () {
            document.body.style.filter = 'blur(0px)';
            light.intensity = 1;
            document.getElementById('discordAudio').play();
        });
    });
</script>
