import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RemoveEffectModuleNode } from './RemoveEffectModuleNode';

test('RemoveEffectModuleNode', () => {
	const graphRegistry = {
		externalModules: ById.fromItems([
			{ id: 'externalModule', graph: { nodes: [{ id: 'audioInput', type: 'AudioInputNode' }] } },
		]),
		connections: ById.fromItems([
			{
				id: 'connection1',
				targetNodeId: 'someNode1',
				inputPath: { nodeId: 'moduleNode', inputKey: 'audioInput' },
			},
			{
				id: 'connection2',
				targetNodeId: 'moduleNode',
				inputPath: { nodeId: 'someNode2', inputKey: 'someInput' },
			},
		]),
		nodes: ById.fromItems([
			{
				id: 'moduleNode',
				type: 'ModuleNode',
				extras: { moduleReference: { type: 'external', moduleId: 'externalModule' } },
			},
		]),
	} as GraphRegistry;

	const command = new RemoveEffectModuleNode(mockCommandData({ moduleNodeId: 'moduleNode' }));

	command.execute(graphRegistry);

	// 1. Set connections to the module node to its audio input target (if any)
	expect(graphRegistry.connections.get('connection2').targetNodeId).toBe('someNode1');

	// 2. Delete the effect module node
	expect(graphRegistry.nodes.containsId('moduleNode')).toBeFalsy();

	command.undo(graphRegistry);

	// 1. Set connections to the module node to its audio input target (if any)
	expect(graphRegistry.connections.get('connection2').targetNodeId).toBe('moduleNode');

	// 2. Delete the effect module node
	expect(graphRegistry.nodes.containsId('moduleNode')).toBeTruthy();
});
