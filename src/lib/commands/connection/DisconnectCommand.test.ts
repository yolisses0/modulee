import type { ConnectionData } from '$lib/connection/ConnectionData';
import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { DisconnectCommand } from './DisconnectCommand';

test('DisconnectCommand', () => {
	const graphRegistry = {
		connections: ById.fromItems([
			{ id: 'connection2', inputPath: { nodeId: 'node2', inputKey: 'input2' } },
		] as ConnectionData[]),
	} as GraphRegistry;

	const command = new DisconnectCommand(
		mockCommandData({ inputPath: { nodeId: 'node2', inputKey: 'input2' } }),
	);

	command.execute(graphRegistry);

	expect(graphRegistry.connections.containsId('connection2')).toEqual(false);

	command.undo(graphRegistry);

	expect(graphRegistry.connections.containsId('connection2')).toEqual(true);
});
