import { ById } from '$lib/editor/ById.svelte';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { MoveNodeCommand } from './MoveNodeCommand';
import { mockCommandData } from './test/mockNodeData';

test('MoveNodeCommand', () => {
	const editorData = {
		nodes: new ById([
			{ id: 'node1', position: { x: 1, y: 1 } },
			{ id: 'node2', position: { x: 2, y: 2 } },
			{ id: 'node3', position: { x: 3, y: 3 } },
		]),
	} as EditorData;

	const commandDetails = { nodeId: 'node2', delta: { x: 4, y: 4 } };
	const command = new MoveNodeCommand(mockCommandData(commandDetails));
	command.execute(editorData);

	expect(editorData.nodes.get('node1').position).toEqual({ x: 6, y: 6 });

	command.undo(editorData);

	expect(editorData.nodes.get('node1').position).toEqual({ x: 2, y: 2 });
});
