<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { useExternalModuleInContextKey } from '$lib/module/internalModule/useExternalModuleInContext';
	import { baseRouteContextKey } from '$lib/ui/baseRouteContext';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		internalModuleId: string;
	}

	const { internalModuleId }: Props = $props();
	const baseRouteContext = getRequiredContext(baseRouteContextKey);
	const useExternalModuleInContext = getRequiredContext(useExternalModuleInContextKey);

	function handleClick() {
		useExternalModuleInContext.useExternalModuleIn = { type: 'rack', internalModuleId };
	}
</script>

<a
	class="common-button"
	href="{baseRouteContext.baseRoute}/externalModules/effects"
	onclick={handleClick}
>
	<Fa fw icon={faPlus} />
	Add effect
</a>
