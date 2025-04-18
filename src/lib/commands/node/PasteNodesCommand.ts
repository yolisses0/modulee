import type { ConnectionData } from '$lib/data/ConnectionData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { EditorCommand } from '$lib/editor/EditorCommand';

/**
 * Requires new nodes and connections data, with new ids already set
 */
export class PasteNodesCommand extends EditorCommand<{
	nodes: NodeData[];
	connections: ConnectionData[];
}> {
	static name = 'PasteNodesCommand';

	execute(graphRegistry: GraphRegistry): void {
		const { nodes, connections } = this.details;
		graphRegistry.nodes.addMany(nodes);
		graphRegistry.connections.addMany(connections);
	}

	undo(graphRegistry: GraphRegistry): void {
		const { nodes, connections } = this.details;
		graphRegistry.nodes.removeMany(nodes);
		graphRegistry.connections.removeMany(connections);
	}
}
