<script lang="ts">
	import { AddInternalModuleCommand } from '$lib/commands/internalModule/AddInternalModuleCommand';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { graphContextKey } from '$lib/graph/graphContext';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getNewItemName } from '../../ui/getNewItemName';
	import type { InternalModule } from './InternalModule';

	interface Props {
		onInternalModuleCreated?: (internalModule: InternalModule) => void;
	}

	const { onInternalModuleCreated }: Props = $props();

	const graphContext = getRequiredContext(graphContextKey);
	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);

	function handleCreateClick() {
		const internalModuleId = createId();
		const internalModuleName = getNewItemName(
			graphContext.graph.internalModules.values(),
			'Internal module',
		);
		const command = new AddInternalModuleCommand({
			id: createId(),
			type: 'AddInternalModuleCommand',
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			details: {
				internalModule: {
					id: internalModuleId,
					name: internalModuleName,
				},
			},
		});
		editorContext.editor.execute(command);

		if (onInternalModuleCreated) {
			const internalModule = graphContext.graph.internalModules.get(internalModuleId);
			onInternalModuleCreated(internalModule);
		}
	}
</script>

<button class="common-button" onclick={handleCreateClick}>
	<Fa fw icon={faPlus} />
	Create internal module
</button>
