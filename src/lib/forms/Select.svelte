<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte';
	import { klona } from 'klona';

	export let value = '';
	export let label = '';
	export let options = [];
	export let disabled = false;
	export let error = '';
	export let addEmpty = false;
	export let emptyValue = '';
	export let className = '';
	let selectEl;

	$: selectOptions = (() => {
		if (addEmpty) {
			const op = klona(options);
			op.unshift({ label: '', value: emptyValue });
			return op;
		} else {
			return options;
		}
	})();

	$: {
		setOption();
	}

	const setOption = async () => {
		if (selectOptions === undefined) {
			return;
		}
		const index = selectOptions.findIndex((v) => {
			return v.value === value;
		});
		if (index === undefined) {
			return;
		}
		await tick();
		if (selectEl.options[index] === undefined) {
			return;
		}
		selectEl.options[index].selected = true;
	};

	const dispatch = createEventDispatcher();
</script>

<div class="flex justify-center items-center {className}">
	<div class="relative h-10 w-full" class:empty={!value}>
		<select
			bind:value
			bind:this={selectEl}
			class="border p-2 rounded min-100 w-full"
			class:border-red-500={error}
			class:shadow-outline={!error}
			{disabled}
			on:change={() => dispatch('change', value)}
		>
			{#each selectOptions as option}
				<option value={option.value}>
					{option.label}
				</option>
			{/each}
		</select>
		<div class="label absolute left-2 transition-all bg-white px-1">
			{label}
		</div>
		{#if error}
			<p class="text-red-500 text-xs italic">
				{error}
			</p>
		{/if}
	</div>
</div>

<style>
	.label {
		top: 0%;
		transform: translateY(-50%);
		font-size: 0.7rem;
		color: rgba(37, 99, 235, 1);
	}
	select:not(:focus) + .label {
		color: rgba(150, 150, 150, 1);
	}
	.min-100 {
		min-width: 100px;
	}
	.empty select:not(:focus) + .label {
		top: 50%;
		transform: translateY(-50%);
		font-size: 1rem;
	}
</style>
