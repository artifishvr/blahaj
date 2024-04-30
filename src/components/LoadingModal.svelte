<script>
    export let loading;
	export let loadpercent;
</script>

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