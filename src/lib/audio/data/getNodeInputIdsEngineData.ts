import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import { hashToUsize } from './hashToUsize';

export function getNodeInputIdsEngineData(nodeData: NodeData, graphRegistry: GraphRegistry) {
	const inputIds: Record<string, number> = {};

	if (nodeData.type === 'ModuleNode' || nodeData.type === 'ModuleVoicesNode') {
		return inputIds;
	}

	graphRegistry.connections.values().forEach((connectionData) => {
		if (connectionData.inputPath.nodeId !== nodeData.id) {
			return;
		}
		const { inputKey } = connectionData.inputPath;
		const outputId = connectionData.targetNodeId;
		inputIds[inputKey] = hashToUsize(outputId);
	});
	return inputIds;
}
