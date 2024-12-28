import { Editor } from '$lib/editor/Editor.svelte.svelte';
import { Vector } from '$lib/space/Vector';
import { expect, test } from 'vitest';
import { RemoveNodeCommand } from './RemoveNodeCommand';

test('RemoveNodeCommand', () => {
	const editor = new Editor();
	editor.nodes = [
		{ id: '1', position: Vector.zero(), size: Vector.one() },
		{ id: '2', position: Vector.zero(), size: Vector.one() },
		{ id: '3', position: Vector.zero(), size: Vector.one() }
	];

	const removeNodeCommand = new RemoveNodeCommand('2');
	editor.run(removeNodeCommand);

	expect(editor.nodes).toEqual([
		{ id: '1', position: Vector.zero(), size: Vector.one() },
		{ id: '3', position: Vector.zero(), size: Vector.one() }
	]);
});