<script lang="ts">
	import type { Input } from '$lib/input/Input';
	import { ModuleNodeAudioInput } from '$lib/input/ModuleNodeAudioInput';

	interface Props {
		input: Input;
	}

	const { input }: Props = $props();
</script>

<div
	title={input.name}
	style:padding-left="0.3lh"
	class:italic={input instanceof ModuleNodeAudioInput}
	class="overflow-and-ellipsis flex-1 overflow-hidden hover:bg-white/10"
>
	{input.name}
</div>
