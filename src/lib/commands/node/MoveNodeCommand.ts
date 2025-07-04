import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { VectorData } from '$lib/node/actionCommands/VectorData';
import { Vector } from 'nodes-editor';

export class MoveNodeCommand extends EditorCommand<{
	nodeId: string;
	delta: VectorData;
}> {
	execute(graphRegistry: GraphRegistry): void {
		const { delta, nodeId } = this.details;
		const node = graphRegistry.nodes.get(nodeId);
		const nodePosition = Vector.fromData(node.position);
		node.position = nodePosition.add(Vector.fromData(delta)).getData();
	}

	undo(graphRegistry: GraphRegistry): void {
		const { delta, nodeId } = this.details;
		const node = graphRegistry.nodes.get(nodeId);
		const nodePosition = Vector.fromData(node.position);
		node.position = nodePosition.subtract(Vector.fromData(delta)).getData();
	}
}
