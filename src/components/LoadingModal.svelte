<script>
    export let loading;
    export let loadpercent;
</script>

<div
    class="{loading ? '' : 'opacity-0 pointer-events-none'} pointer-events-none fixed left-0 top-0 flex h-full w-full items-center justify-center transition duration-500 ease-out">
    <div
        class="relative m-12 flex max-h-full max-w-3xl flex-col items-center justify-center rounded-md border border-gray-600/50 bg-gray-400 bg-opacity-10 bg-clip-padding p-8 text-white backdrop-blur-md backdrop-filter">
        <div
            class="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500 ease-linear"></div>
        <h1 class="text-center text-xl font-medium">Loading 3D...</h1>
        <p class="text-center font-medium">
            This may take a while on slower connections/devices.
        </p>

        <div
            class="mt-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
                class="h-2.5 rounded-full bg-blue-500"
                style="width: {loadpercent}%"></div>
        </div>
    </div>
</div>
