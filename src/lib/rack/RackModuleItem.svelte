<script lang="ts">
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import type { ModuleNode } from '$lib/data/ModuleNode.svelte';
	import { getBaseRouteContext } from '$lib/ui/baseRouteContext';
	import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getIsSomeModuleNode } from './getIsSomeModuleNode';
	import RackAddEffectButton from './RackAddEffectButton.svelte';
	import RackModuleNodeItem from './RackModuleNodeItem.svelte';

	interface Props {
		internalModule: InternalModule;
	}

	const { internalModule }: Props = $props();
	const baseRouteContext = getBaseRouteContext();
	const moduleNodes: ModuleNode[] = $derived(
		internalModule.nodes.filter(function (node): node is ModuleNode {
			return getIsSomeModuleNode(node) && !!node.targetModule;
		}),
	);
	// svelte-ignore state_referenced_locally
	let open = $state(moduleNodes.length > 0);

	function handleClick() {
		open = !open;
	}
</script>

<details bind:open class="flex flex-col items-center" class:mb-2={open}>
	<summary class="flex w-full flex-row gap-2 border-t border-white/10">
		<button class="common-button" onclick={handleClick}>
			<Fa fw icon={open ? faChevronDown : faChevronRight} />
		</button>
		<div class="self-center">{internalModule.name}</div>
		<div class="flex-1"></div>
		<RackAddEffectButton internalModuleId={internalModule.id} />
	</summary>
	<div class="flex flex-row flex-wrap gap-1 pt-1">
		{#if moduleNodes.length > 0}
			{#each moduleNodes as moduleNode}
				<RackModuleNodeItem {moduleNode} />
			{/each}
		{:else}
			<div class="opacity-50">No effects to adjust</div>
		{/if}
	</div>
</details>

<style lang="postcss">
	details:first-child summary {
		@apply border-none;
	}
</style>
