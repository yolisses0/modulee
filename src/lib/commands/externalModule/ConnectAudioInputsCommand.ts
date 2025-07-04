import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';
import { SetConnectionCommand } from '../connection/SetConnectionCommand';
import { mockCommandData } from '../test/mockNodeData';

export class ConnectAudioInputsCommand extends EditorCommand<{
	targetNodeId: string;
	moduleNodeId: string;
	externalModule: ExternalModuleData;
	audioInputConnectionIds: Record<string, string>;
}> {
	static name = 'ConnectAudioInputsCommand';

	setConntectionCommands!: SetConnectionCommand[];

	execute(graphRegistry: GraphRegistry): void {
		const { moduleNodeId, targetNodeId, externalModule, audioInputConnectionIds } = this.details;
		const { nodes, mainInternalModuleId } = externalModule.graph;

		const audioInputNodes = nodes.filter(
			(node) => node.internalModuleId === mainInternalModuleId && node.type === 'AudioInputNode',
		);
		const audioInputIds = audioInputNodes.map((audioInputNode) => audioInputNode.id);

		const nodeData = graphRegistry.nodes.get(moduleNodeId);
		if (!getIsSomeModuleNodeData(nodeData)) {
			throw new Error('Invalid node type');
		}

		this.setConntectionCommands = audioInputIds.map((audioInputId) => {
			const command = new SetConnectionCommand(
				mockCommandData({
					connection: {
						targetNodeId: targetNodeId,
						id: audioInputConnectionIds[audioInputId],
						inputPath: {
							nodeId: nodeData.id,
							inputKey: audioInputId,
						},
					},
				}),
			);
			command.execute(graphRegistry);
			return command;
		});
	}

	undo(graphRegistry: GraphRegistry): void {
		this.setConntectionCommands.map((setConnectionCommand) => {
			setConnectionCommand.undo(graphRegistry);
		});
	}
}
