import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetUnconnectedInputValueCommand } from './SetUnconnectedInputValueCommand';

test('SetUnconnectedInputValueCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{ id: 'node2', unconnectedInputValues: { key1: 1 } } as unknown as NodeData,
			{ id: 'node3' },
		]),
	} as GraphRegistry;
	const command = new SetUnconnectedInputValueCommand(
		mockCommandData({ inputPath: { nodeId: 'node2', inputKey: 'key1' }, value: 2 }),
	);

	command.execute(graphRegistry);

	expect(graphRegistry.nodes.get('node2').unconnectedInputValues.key1).toBe(2);

	command.undo(graphRegistry);

	expect(graphRegistry.nodes.get('node2').unconnectedInputValues.key1).toBe(1);
});
