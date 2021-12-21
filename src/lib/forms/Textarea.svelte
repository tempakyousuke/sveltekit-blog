<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let disabled = false;
	export let readonly = false;
	export let placeholder = '';
	export let value = '';
	export let label = '';
	export let className = '';
	export let error = '';
	export let rows = 3;

	const dispatch = createEventDispatcher();
	const handleChange = () => {
		dispatch('change');
	};

	const handleInput = () => {
		dispatch('input');
	};
</script>

<div class="flex justify-center items-center {className}">
	<div class="relative w-full" class:empty={!placeholder && value === ''}>
		<textarea
			class="w-full border-gray-300 p-2 transition-all border-blue rounded"
			{disabled}
			{placeholder}
			{readonly}
			bind:value
			{rows}
			on:change={handleChange}
			on:input={handleInput}
		/>
		{#if error}
			<p class="text-red-500 text-xs italic">
				{error}
			</p>
		{/if}
		<div class="label absolute left-2 transition-all bg-white px-1">
			{label}
		</div>
	</div>
</div>

<style>
	.label {
		top: 0%;
		transform: translateY(-50%);
		font-size: 0.7rem;
		color: rgba(37, 99, 235, 1);
	}
	.empty textarea:not(:focus) + .label {
		top: 50%;
		transform: translateY(-50%);
		font-size: 1rem;
	}
	textarea:not(:focus) + .label {
		color: rgba(150, 150, 150, 1);
	}
	textarea {
		border-width: 1px;
	}
	textarea:focus {
		outline: none;
		border-color: rgba(37, 99, 235, 1);
	}
</style>
