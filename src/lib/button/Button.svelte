<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import BaseButton from './BaseButton.svelte';
	export let block = false;
	export let href = '';
	export let target = '';
	export let disabled = false;
	export let bgColorClass = 'bg-blue-500';
	export let textColorClass = 'text-white';
	export let buttonClass = '';
	export let className = '';

	let additionalClass = `${buttonClass} ${bgColorClass} ${textColorClass}`;
	if (!disabled) {
		additionalClass += ' hover:bg-opacity-80';
	}

	$: props = {
		block,
		disabled,
		className,
		buttonClass: additionalClass
	};

	const dispatch = createEventDispatcher();
	const handleClick = () => {
		dispatch('click');
	};
</script>

{#if href !== ''}
	<a {href} {target}>
		<BaseButton {...props} on:click={handleClick}><slot /></BaseButton>
	</a>
{:else}
	<BaseButton {...props} on:click={handleClick}><slot /></BaseButton>
{/if}
