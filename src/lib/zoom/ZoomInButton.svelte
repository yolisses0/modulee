<script lang="ts">
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
	import { ZoomInCommand } from '$lib/space/zoom/ZoomInCommand';
	import { getZoomContext } from '$lib/space/zoom/zoomContext';
	import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const zoomContext = getZoomContext();

	function handleClick() {
		const command = new ZoomInCommand();
		command.execute({ zoomContext });
	}

	const shortcutString = getShortcutStringForCommandType('ZoomInCommand');
</script>

<button class="common-button" onclick={handleClick} title="Zoom in {shortcutString}">
	<Fa fw icon={faMagnifyingGlassPlus} />
</button>
