<script lang="ts">
  	let { speedMult = $bindable() }: { speedMult: number } = $props();
    import { RefreshCcw } from "@lucide/svelte"


  function handleInput(event: Event) {
    const input = event.currentTarget as HTMLInputElement
    const value = input.valueAsNumber

    speedMult =
      Math.abs(value - 1) <=  0.2
        ? 1
        : value

    input.value = String(speedMult)
  }
</script>

<div
	class="flex gap-2 items-center bottom-0 rounded-md bg-gray-400/20 p-2 text-white backdrop-blur-sm backdrop-filter"
>
<RefreshCcw />

	 <input
    type="range"
    min="0"
    max="3"
    step="0.01"
    value={speedMult}
    oninput={handleInput}
    class="mx-1 appearance-none rounded-full bg-zinc-100 accent-zinc-800"
  />
</div>