import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import type { NodeData } from '$lib/data/NodeData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import { mockCommandData } from '../test/mockNodeData';
import { AddInternalModuleCommand } from './AddInternalModuleCommand';

export class GroupNodesCommand extends EditorCommand<{
	internalModule: InternalModuleData;
	nodesId: string[];
	moduleNodeData: NodeData;
}> {
	addInternalModuleCommand!: AddInternalModuleCommand;
	previousInternalModuleIds!: Record<string, string>;

	execute(graphRegistry: GraphRegistry): void {
		const { internalModule, nodesId, moduleNodeData } = this.details;

		// TODO find better way to instantiate this command
		this.addInternalModuleCommand = new AddInternalModuleCommand(
			mockCommandData({ internalModule }),
		);
		this.addInternalModuleCommand.execute(graphRegistry);

		this.previousInternalModuleIds = {};
		graphRegistry.nodes.values().forEach((nodeData) => {
			if (nodesId.includes(nodeData.id)) {
				this.previousInternalModuleIds[nodeData.id] = nodeData.internalModuleId;
				nodeData.internalModuleId = internalModule.id;
			}
		});

		graphRegistry.nodes.add(moduleNodeData);
	}

	undo(graphRegistry: GraphRegistry): void {
		this.addInternalModuleCommand.undo(graphRegistry);
		graphRegistry.nodes.remove(this.details.moduleNodeData);
		graphRegistry.nodes.values().forEach((nodeData) => {
			const previousInternalModuleId = this.previousInternalModuleIds[nodeData.id];
			if (previousInternalModuleId) {
				nodeData.internalModuleId = previousInternalModuleId;
			}
		});
	}
}
