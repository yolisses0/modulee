<script lang="ts">
	import type { Placement } from '@floating-ui/dom';
	import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
	import type { Snippet } from 'svelte';
	import Fa from 'svelte-fa';
	import Menu from './Menu.svelte';

	interface Props {
		children: Snippet;
		placement?: Placement;
	}

	let isModalActive = $state(false);
	let button = $state<HTMLElement>();
	const { children, placement }: Props = $props();

	function handleClick() {
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<!-- This px-2.5 is a hacky solution to use in home pages -->
<button
	title="Options"
	bind:this={button}
	onclick={handleClick}
	class="common-button self-stretch px-2.5"
>
	<Fa fw icon={faEllipsisV} />
</button>

{#if isModalActive}
	<Menu {closeModal} referenceElement={button} {placement}>
		{@render children()}
	</Menu>
{/if}
