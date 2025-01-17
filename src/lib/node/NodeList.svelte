<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { getScreenFontSize } from '$lib/utils/getScreenFontSize';
	import { getScreenLineHeight } from '$lib/utils/getScreenLineHeight';
	import AddNodeMenu from './AddNodeMenu.svelte';
	import { setContainerContext } from './containerContext';
	import type { ContainerWrapper } from './ContainerWrapper';
	import { getElementPosition } from './getElementPosition';
	import { getPointerPosition } from './getPointerPosition';
	import { setPreviewConnectionContext } from './input/previewConnectionContext';
	import type { PreviewConnectionWrapper } from './input/PreviewConnectionWrapper';
	import PreviewWire from './input/PreviewWire.svelte';
	import NodeItem from './NodeItem.svelte';

	interface Props {
		editor: Editor;
		space: Space;
	}

	let { space, editor }: Props = $props();

	let containerWrapper = $state<ContainerWrapper>({});
	setContainerContext(containerWrapper);

	let previewConnectionWrapper = $state<PreviewConnectionWrapper>({});
	setPreviewConnectionContext(previewConnectionWrapper);

	let screenMenuPosition = $state<Vector>();

	function closeMenu() {
		screenMenuPosition = undefined;
	}

	function handlePointerDown(e: MouseEvent) {
		if (e.target !== containerWrapper.container) return;

		if (screenMenuPosition) {
			screenMenuPosition = undefined;
			return;
		}

		const rect = containerWrapper.container.getBoundingClientRect();
		const offsetVector = new Vector(rect.left, rect.top);
		const screenPosition = getPointerPosition(e).subtract(offsetVector);
		const dataPosition = space.getDataPosition(screenPosition);

		screenMenuPosition = dataPosition;

		// const addNodeCommand = new AddNodeCommand({
		// 	id: createId(),
		// 	type: 'AddNodeCommand',
		// 	details: { node: createNodeData(dataPosition) },
		// });
		// editor.execute(addNodeCommand);
	}

	function handleClick(e: MouseEvent) {
		if (e.button === 1) return;
		screenMenuPosition = undefined;
	}

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		if (!containerWrapper.container) return;

		const screenPosition = new Vector(e.clientX, e.clientY);
		const elementPosition = getElementPosition(containerWrapper.container);

		screenMenuPosition = screenPosition.subtract(elementPosition);
	}
</script>

<div class="relative flex-1">
	<!-- This element should not have border -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- onpointerdown={handlePointerDown} -->
	<div
		onclick={handleClick}
		oncontextmenu={handleContextMenu}
		bind:this={containerWrapper.container}
		style:font-size={getScreenFontSize(space) + 'px'}
		style:line-height={getScreenLineHeight(space) + 'px'}
		class="dotted-grid absolute min-h-full min-w-full"
	>
		{#each editor.nodes as node (node.id)}
			<NodeItem {node} {space} {editor} />
		{/each}
		{#if previewConnectionWrapper.previewConnection}
			<PreviewWire {space} previewConnection={previewConnectionWrapper.previewConnection} />
		{/if}
	</div>
	{#if screenMenuPosition}
		<AddNodeMenu {editor} {space} screenPosition={screenMenuPosition} closeModal={closeMenu} />
	{/if}
</div>

<style>
	.dotted-grid {
		background-size: 1lh 1lh;
		background-position: 0.5lh 0.5lh;
		background-image: radial-gradient(circle, #8888 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
