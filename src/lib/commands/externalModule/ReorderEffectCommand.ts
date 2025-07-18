import { EditorCommand } from '$lib/editor/EditorCommand';
import type { EditorData } from '$lib/editor/EditorData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { AUDIO_INPUT_KEY } from '$lib/input/AUDIO_INPUT_KEY';
import { getAreInputPathsEqual } from '$lib/input/getAreInputPathsEqual';
import { getModuleNodeAudioTargetNodeId } from '$lib/module/getModuleNodeAudioTargetNodeId';
import { getId } from '$lib/ui/getId';
import { getIsAudioConnectionData } from '../../connection/getIsAudioConnectionData';
import { AddConnectionCommand } from '../connection/AddConnectionCommand';
import { RemoveConnectionsCommand } from '../connection/RemoveConnectionsCommand';
import { mockCommandData } from '../test/mockNodeData';
import { ReplaceConnectionsTargetNodeIdCommand } from './ReplaceConnectionsTargetNodeIdCommand';

export class ReorderEffectCommand extends EditorCommand<{
	moduleNodeId: string;
	referenceNodeId: string;
	newConnectionId: string;
	direction: 'before' | 'after';
}> {
	subcommands!: EditorCommand[];

	execute(graphRegistry: GraphRegistry, editorData: EditorData): void {
		this.subcommands = [];
		const { moduleNodeId, direction, referenceNodeId, newConnectionId } = this.details;

		const audioConnections = graphRegistry.connections.values().filter((connectionData) => {
			return getIsAudioConnectionData(connectionData, graphRegistry);
		});

		const moduleNodeOldAudioTargetNodeId = getModuleNodeAudioTargetNodeId(
			moduleNodeId,
			graphRegistry,
		);

		const moduleNodeNewAudioTargetNodeId =
			direction === 'after'
				? referenceNodeId
				: getModuleNodeAudioTargetNodeId(referenceNodeId, graphRegistry);

		const connectionsToModuleNode = audioConnections
			.filter((audioConnection) => {
				return audioConnection.targetNodeId === moduleNodeId;
			})
			.map(getId);
		if (moduleNodeOldAudioTargetNodeId) {
			this.subcommands.push(
				new ReplaceConnectionsTargetNodeIdCommand(
					mockCommandData({
						connectionIds: connectionsToModuleNode,
						targetId: moduleNodeOldAudioTargetNodeId,
					}),
				),
			);
		} else {
			this.subcommands.push(
				new RemoveConnectionsCommand(
					mockCommandData({
						connectionIds: connectionsToModuleNode,
					}),
				),
			);
		}

		const connectionsFromModuleNode = audioConnections
			.filter((audioConnection) => {
				return getAreInputPathsEqual(audioConnection.inputPath, {
					nodeId: moduleNodeId,
					inputKey: AUDIO_INPUT_KEY,
				});
			})
			.map(getId);
		if (moduleNodeNewAudioTargetNodeId) {
			this.subcommands.push(
				new ReplaceConnectionsTargetNodeIdCommand(
					mockCommandData({
						connectionIds: connectionsFromModuleNode,
						targetId: moduleNodeNewAudioTargetNodeId,
					}),
				),
			);
		} else {
			this.subcommands.push(
				new RemoveConnectionsCommand(
					mockCommandData({
						connectionIds: connectionsFromModuleNode,
					}),
				),
			);
		}

		if (moduleNodeNewAudioTargetNodeId) {
			const connnectionsToModuleNodeNewTarget = audioConnections
				.filter((audioConnection) => {
					return audioConnection.targetNodeId === moduleNodeNewAudioTargetNodeId;
				})
				.map(getId);
			this.subcommands.push(
				new ReplaceConnectionsTargetNodeIdCommand(
					mockCommandData({
						connectionIds: connnectionsToModuleNodeNewTarget,
						targetId: moduleNodeId,
					}),
				),
			);
		} else {
			this.subcommands.push(
				new AddConnectionCommand(
					mockCommandData({
						connection: {
							id: newConnectionId,
							targetNodeId: moduleNodeId,
							inputPath: { inputKey: AUDIO_INPUT_KEY, nodeId: referenceNodeId },
						},
					}),
				),
			);
		}

		this.subcommands.forEach((subcommand) => {
			subcommand.execute(graphRegistry, editorData);
		});
	}

	undo(graphRegistry: GraphRegistry, editorData: EditorData): void {
		this.subcommands.toReversed().forEach((subcommand) => {
			subcommand.undo(graphRegistry, editorData);
		});
	}
}
