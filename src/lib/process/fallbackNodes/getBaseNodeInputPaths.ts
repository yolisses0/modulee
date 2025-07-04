import type { InputPath } from '$lib/input/InputPath';
import type { NodeData } from '$lib/node/data/NodeData';
import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';

// TODO consider adopting an OOP approach
export function getBaseNodeInputPaths(nodeData: NodeData): InputPath[] {
	const nodeDefinition = nodeDefinitionsByName[nodeData.type];
	return nodeDefinition.inputs.map((input) => {
		return {
			nodeId: nodeData.id,
			inputKey: input.key,
		};
	});
}
