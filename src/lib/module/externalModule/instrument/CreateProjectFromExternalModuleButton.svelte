<script lang="ts">
	import { enhance } from '$app/forms';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from '../ExternalModuleData';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const { externalModuleData }: Props = $props();
</script>

<form action="/projects?/createFromExternalModule" class="flex flex-1" method="post" use:enhance>
	<input type="hidden" name="externalModuleId" value={externalModuleData.id} />
	<button class="common-button center-content">
		<Fa fw icon={faDownload} />
		Use
	</button>
</form>
