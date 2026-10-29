<script lang="ts">
  import { quotes } from "#lib/quotes.ts";
  import favicon from "#assets/favicon.png";
  import { browser } from "$app/env";

  let { progress, finishedOnce } = $props();

  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
</script>

{#if browser}
  <div
    class="z-20 transition-opacity duration-500 ease-out"
    class:opacity-100={!$finishedOnce}
    class:opacity-0={$finishedOnce}
  >
    <div
      class="pointer-events-none fixed top-0 left-0 flex h-full w-full items-center justify-center transition duration-500 ease-out"
    >
      <div
        class="relative m-12 flex max-h-full w-96 max-w-3xl flex-col items-center justify-center rounded-md border border-gray-600/50 bg-gray-400/10 bg-clip-padding p-8 text-white backdrop-blur-md"
      >
        <div class="mb-4 h-24 w-24 animate-spin ease-linear">
          <img src={favicon} alt="logo" class="h-full w-full" />
        </div>
        <p class="text-md pt-2 pb-1 text-center font-semibold">"{randomQuote}"</p>

        <div class="mt-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div class="h-2.5 rounded-full bg-blue-300" style="width: {$progress * 100}%"></div>
        </div>
      </div>
    </div>
  </div>
{/if}
