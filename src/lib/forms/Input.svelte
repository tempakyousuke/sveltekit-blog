<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let disabled = false;
	export let readonly = false;
	export let placeholder = '';
	export let value = '';
	export let type = 'text';
	export let label = '';
	export let className = '';
	export let error = '';

	const dispatch = createEventDispatcher();
	const handleChange = () => {
		dispatch('change');
	};

	const handleInput = () => {
		dispatch('input');
	};
</script>

<div class="flex justify-center items-center {className}">
	<div class="relative h-10 w-full" class:empty={!placeholder && value === ''}>
		{#if type == 'text'}
			<input
				bind:value
				{disabled}
				{readonly}
				{placeholder}
				on:change={handleChange}
				on:input={handleInput}
			/>
		{/if}
		{#if type == 'email'}
			<input
				bind:value
				{disabled}
				{readonly}
				{placeholder}
				type="email"
				on:change={handleChange}
				on:input={handleInput}
			/>
		{/if}
		{#if type == 'password'}
			<input
				bind:value
				{disabled}
				{readonly}
				{placeholder}
				type="password"
				autocomplete="on"
				on:change={handleChange}
				on:input={handleInput}
			/>
		{/if}
		<div class="label">
			{label}
		</div>
		{#if error}
			<p class="text-red-500 text-xs italic">
				{error}
			</p>
		{/if}
	</div>
</div>

<style lang="postcss">
	input {
		@apply h-full w-full border-gray-300 px-2 transition-all rounded border-2;
	}

	.label {
		@apply absolute left-2 transition-all bg-white px-1;
	}

	.label {
		top: 0%;
		transform: translateY(-50%);
		font-size: 0.7rem;
		color: rgba(37, 99, 235, 1);
	}
	.empty input:not(:focus) + .label {
		top: 50%;
		transform: translateY(-50%);
		font-size: 1rem;
	}
	input:not(:focus) + .label {
		color: rgba(150, 150, 150, 1);
	}
	input {
		border-width: 1px;
	}
	input:focus {
		outline: none;
		border-color: rgba(37, 99, 235, 1);
	}
</style>
