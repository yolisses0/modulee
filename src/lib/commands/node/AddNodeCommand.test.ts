import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { AddNodeCommand } from './AddNodeCommand';

test('AddNodeCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([{ id: 'node1' }, { id: 'node2' }]),
	} as GraphRegistry;

	const command = new AddNodeCommand(mockCommandData({ node: { id: 'node3' } as NodeData }));
	command.execute(graphRegistry);

	expect(graphRegistry.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]);

	command.undo(graphRegistry);

	expect(graphRegistry.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }]);
});
