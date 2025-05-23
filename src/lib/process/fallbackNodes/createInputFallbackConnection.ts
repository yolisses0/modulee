import type { ConnectionData } from '$lib/data/ConnectionData';
import { createId } from '$lib/data/createId';
import type { InputPath } from '$lib/data/InputPath';
import type { NodeData } from '$lib/data/NodeData';
import { getInternalModuleFallbackNodeId } from './getInternalModuleFallbackNodeId';

export function createInputFallbackConnection(
	inputPath: InputPath,
	nodeData: NodeData,
): ConnectionData {
	return {
		inputPath,
		id: createId(),
		targetNodeId: getInternalModuleFallbackNodeId(nodeData.internalModuleId),
	};
}
