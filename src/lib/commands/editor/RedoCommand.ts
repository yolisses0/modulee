import type { Remotion } from '$lib/array/remotion';
import { removeById } from '$lib/array/removeById';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { EditorData } from '$lib/editor/EditorData';
import { NotImplementedError } from '$lib/NotImplementedError';

export class RedoCommand extends EditorCommand<{
	commandId: string;
}> {
	static name = 'RedoCommand';

	remotion!: Remotion<EditorCommand>;

	execute(graphRegistry: GraphRegistry, editorData: EditorData): void {
		this.remotion = removeById(editorData.undoneHistory, this.details.commandId);
		const command = this.remotion.item;
		editorData.history.push(command);
		command.execute(graphRegistry, editorData);
	}

	undo(): void {
		throw new NotImplementedError();
	}
}
