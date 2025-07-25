<script lang="ts">
	import { ReorderEffectCommand } from '$lib/commands/externalModule/ReorderEffectCommand';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import type { ModuleNode } from '$lib/node/ModuleNode.svelte';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import Sortable, { type SortableEvent } from 'sortablejs';
	import { onMount } from 'svelte';
	import ChainDivision from './ChainDivision.svelte';
	import { getIsDivision } from './getIsDivision';
	import { getModuleNodesWithDivisions } from './getModuleNodesWithDivisions';
	import { hideDraggingImage } from './hideDraggingImage';
	import RackModuleNodeItem from './RackModuleNodeItem.svelte';

	interface Props {
		moduleNodes: ModuleNode[];
	}

	let sortable: Sortable;
	let element = $state<HTMLElement>();
	// moduleNodes have to be topologically sorted
	const { moduleNodes }: Props = $props();
	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);
	const items = $derived(getModuleNodesWithDivisions(moduleNodes));

	function handleSort(e: SortableEvent) {
		const { oldIndex, newIndex } = e;

		if (oldIndex === newIndex) return;
		if (oldIndex === undefined) return;
		if (newIndex === undefined) return;

		let referenceNodeId;
		let direction: 'before' | 'after';

		const order = sortable.toArray();
		const nextModuleNodeId = order[newIndex + 1];
		const previousModuleNodeId = order[newIndex - 1];
		if (nextModuleNodeId && !getIsDivision(nextModuleNodeId)) {
			direction = 'before';
			referenceNodeId = nextModuleNodeId;
		} else if (previousModuleNodeId && !getIsDivision(previousModuleNodeId)) {
			direction = 'after';
			referenceNodeId = previousModuleNodeId;
		} else {
			return;
		}

		const command = new ReorderEffectCommand({
			id: createId(),
			type: 'ReorderEffectCommand',
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			details: {
				direction,
				referenceNodeId,
				newConnectionId: createId(),
				moduleNodeId: order[newIndex],
			},
		});
		editorContext.editor.execute(command);
	}

	onMount(() => {
		if (element) {
			sortable = new Sortable(element, {
				onEnd: handleSort,
				handle: '.sortable-handle',
				setData: hideDraggingImage,
				ghostClass: 'sortable-ghost',
				dataIdAttr: 'data-sortable-id',
			});
			return () => sortable.destroy();
		}
	});
</script>

<div class="flex flex-row flex-wrap justify-center gap-1 p-1" bind:this={element}>
	<!-- fakeId is used to prevent an integration bug on Svelte and Sortable-js,
	since both change the order of the elements -->
	{#each items as item (item.fakeId)}
		{#if item.node}
			<RackModuleNodeItem moduleNode={item.node} />
		{:else}
			<ChainDivision />
		{/if}
	{/each}
</div>
