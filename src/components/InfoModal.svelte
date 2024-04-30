<script>
    //TODO WIP
    export let show;
</script>

<div
    class="flex pointer-events-none fixed w-full h-full top-0 left-0 items-center justify-center transition duration-500 ease-out {show
        ? ''
        : 'opacity-0 pointer-events-none'}">
    <div
        class="m-12 flex flex-col items-center justify-center relative p-8 max-w-3xl max-h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-600/50 text-white">
        <div
            class="border-t-blue-500 animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4">
        </div>
        <h1 class="text-xl font-medium text-center">Info</h1>
        <p class="font-medium text-center">TODO</p>
    </div>
</div>
