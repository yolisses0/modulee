import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import { nodeDefinitions } from '$lib/node/definitions/nodeDefinitions';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';
import { getSomeModuleNodeDataInputKeys } from './getSomeModuleNodeDataInputKeys';

export function getNodeDataInputKeys(nodeData: NodeData, graphRegistry: GraphRegistry): string[] {
	if (getIsSomeModuleNodeData(nodeData)) {
		return getSomeModuleNodeDataInputKeys(nodeData, graphRegistry);
	}

	const nodeDefinition = nodeDefinitions.find((nodeDefinition) => {
		return nodeDefinition.type === nodeData.type;
	});

	if (!nodeDefinition) {
		throw new Error('Missing node definition for type ' + nodeData.type);
	}

	return nodeDefinition.inputs.map((inputDefinition) => {
		return inputDefinition.key;
	});
}
