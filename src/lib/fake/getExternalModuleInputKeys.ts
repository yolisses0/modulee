import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { AUDIO_INPUT_KEY } from '$lib/input/AUDIO_INPUT_KEY';
import { getIsAudioInputNodeData } from '$lib/rack/getIsAudioInputNodeData';
import { getIsInputNodeData } from '$lib/rack/getIsInputNodeData';
import { getId } from '$lib/ui/getId';

export function getExternalModuleInputKeys(externalModuleId: string, graphRegistry: GraphRegistry) {
	const externalModuleData = graphRegistry.externalModules.get(externalModuleId);
	const mainModuleNodes = externalModuleData.graph.nodes.filter((nodeData) => {
		return nodeData.internalModuleId === externalModuleData.graph.mainInternalModuleId;
	});
	const keys = mainModuleNodes.filter(getIsInputNodeData).map(getId);
	if (mainModuleNodes.some(getIsAudioInputNodeData)) {
		keys.push(AUDIO_INPUT_KEY);
	}
	return keys;
}
