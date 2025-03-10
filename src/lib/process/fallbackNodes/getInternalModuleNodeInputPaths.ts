import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InputPath } from '$lib/data/InputPath';
import type { ModuleNodeData } from '$lib/data/variants/ModuleNodeData';
import type { ModuleVoicesNodeData } from '$lib/data/variants/ModuleVoicesNodeData';

// TODO consider adopting an OOP approach
export function getModuleNodeInputPaths(
	moduleNodeData: ModuleNodeData | ModuleVoicesNodeData,
	graphRegistry: GraphRegistry,
) {
	const inputPaths: InputPath[] = [];
	const { moduleReference: targetInternalModuleId } = moduleNodeData.extras;
	graphRegistry.nodes.values().forEach((nodeData) => {
		if (nodeData.type !== 'InputNode') return;
		if (nodeData.internalModuleId !== targetInternalModuleId) return;
		inputPaths.push({
			inputKey: nodeData.id,
			nodeId: moduleNodeData.id,
		});
	});
	return inputPaths;
}
