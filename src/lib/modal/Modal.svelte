<script lang="ts">
	import { onDestroy } from 'svelte';
	import Button from '$lib/button/Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	export let title = '';
	export let hideOk = false;
	export let okText = 'OK';
	export let hideCancel = false;
	export let cancelText = 'CANCEL';
	const escClicked = (evt: KeyboardEvent) => {
		let isEscape = false;
		if ('key' in evt) {
			isEscape = evt.key === 'Escape' || evt.key === 'Esc';
		}
		if (isEscape) {
			open = false;
		}
	};
	$: {
		if (open) {
			document.addEventListener('keydown', escClicked);
		} else {
			document.removeEventListener('keydown', escClicked);
		}
	}
	onDestroy(() => {
		document.removeEventListener('keydown', escClicked);
	});
	const dispatch = createEventDispatcher();
</script>

<template>
	<div
		class="
      modal
      fixed
      w-full
      h-full
      top-0
      left-0
      flex
      items-center
      justify-center
    "
		class:opacity-0={!open}
		class:pointer-events-none={!open}
	>
		<div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />
		<div
			class="
        modal-container
        bg-white
        mx-auto
        rounded
        shadow-lg
        z-50
        overflow-y-auto
        w-11/12
        md:max-w-md
      "
		>
			<div
				class="
          modal-close
          absolute
          top-0
          right-0
          cursor-pointer
          flex flex-col
          items-center
          mt-4
          mr-4
          text-white text-sm
          z-50
        "
				on:click={() => (open = false)}
			>
				<svg
					class="fill-current text-white"
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 18 18"
				>
					<path
						d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
					/></svg
				><span class="text-sm">(Esc)</span>
			</div>
			<div class="modal-content text-left overflow-y-scroll">
				<!-- Title-->
				<div class="flex justify-between items-center p-4 bg-blue-500 text-white">
					<p class="text-2xl font-bold">{title}</p>
					<div class="modal-close cursor-pointer z-50" on:click={() => (open = false)}>
						<svg
							class="fill-current text-black"
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 18 18"
						>
							<path
								d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
							/>
						</svg>
					</div>
				</div>
				<!-- Body-->
				<div class="px-6 mt-5">
					<slot />
				</div>
				<slot name="footer">
					<div class="flex justify-end p-6">
						<div class="w-24 mr-3">
							{#if !hideOk}
								<Button className="text-white" block on:click={() => dispatch('ok')}>
									{okText}
								</Button>
							{/if}
						</div>
						<div class="w-24">
							{#if !hideCancel}
								<Button
									v-if="!hideCancel"
									bg-color="bg-blue-100"
									block
									on:click={() => (open = false)}
								>
									{cancelText}
								</Button>
							{/if}
						</div>
					</div>
				</slot>
			</div>
		</div>
	</div>
</template>

<style>
	.modal {
		transition: opacity 0.25s ease;
	}
	.modal-content {
		max-height: 80vh;
	}
</style>
