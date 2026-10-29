<script lang="ts">
	import './layout.css';
	import '@fontsource-variable/nunito';
	import favicon from '#assets/favicon.png';
	import type { LayoutProps } from './$types';
	import { onMount } from 'svelte';

	let { children }: LayoutProps = $props();

	onMount(() => {
		const analytics1 = document.createElement('script');
		analytics1.async = true;
		analytics1.src = 'https://a.arti.lol/js/pa-zo8p4B5srvNvTb2tlHPTJ.js';
		document.head.appendChild(analytics1);
		const analytics2 = document.createElement('script');
		analytics2.innerHTML =
			'window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()';
		document.head.appendChild(analytics2);

		console.log('meow :3');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<title>blåhaj</title>
</svelte:head>

{@render children()}
