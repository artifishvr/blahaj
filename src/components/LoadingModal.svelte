<script>
    export let loading;
    export let loadpercent;
    import { quotes } from '$lib/quotes';
    import { browser } from '$app/environment';

    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
</script>

<div
    class="{loading && browser
        ? ''
        : 'opacity-0 pointer-events-none'} pointer-events-none fixed left-0 top-0 flex h-full w-full items-center justify-center transition duration-500 ease-out">
    <div
        class="relative m-12 flex max-h-full max-w-3xl flex-col items-center justify-center rounded-md border border-gray-600/50 bg-gray-400 bg-opacity-10 bg-clip-padding p-8 text-white backdrop-blur-md backdrop-filter">
        <div class="mb-4 h-24 w-24 animate-spin ease-linear">
            <img src="/favicon.png" alt="logo" class="w-full h-full" />
        </div>
        <p class="text-center text-md font-semibold pt-2">Did you know</p>
        <p class="text-center text-sm font-medium">{randomQuote}</p>

        <div class="mt-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div class="h-2.5 rounded-full bg-blue-500" style="width: {loadpercent}%"></div>
        </div>
    </div>
</div>
