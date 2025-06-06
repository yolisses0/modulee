<script lang="ts">
	import type { InputMouseEvent } from '$lib/utils/InputMouseEvent';
	import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom';
	import { getMouseRelativePosition, getRootElementContext } from 'nodes-editor';

	interface Props {
		mouseEvent?: MouseEvent;
	}

	let { mouseEvent = $bindable() }: Props = $props();

	let menu = $state<HTMLElement>();
	let positioner = $state<HTMLElement>();

	const rootElementContext = getRootElementContext();
	const menuPosition = $derived.by(() => {
		if (!mouseEvent) return;
		if (!rootElementContext.rootElement) return;
		return getMouseRelativePosition(mouseEvent, rootElementContext.rootElement);
	});

	function closeModal() {
		mouseEvent = undefined;
	}

	$effect(() => {
		if (!menu) return;
		if (!positioner) return;
		menuPosition; // Forces dependency

		function updatePosition() {
			if (!menu) return;
			if (!positioner) return;
			computePosition(positioner, menu, {
				placement: 'right',
				middleware: [flip(), shift()],
			}).then(({ x, y }) => {
				if (!menu) return;
				Object.assign(menu.style, { top: `${y}px`, left: `${x}px` });
			});
		}

		return autoUpdate(positioner, menu, updatePosition);
	});

	function handleWindowClick(e: InputMouseEvent) {
		const clickedInside = menu?.contains(e.target as Node);
		if (!clickedInside) {
			closeModal();
		}
	}
</script>
