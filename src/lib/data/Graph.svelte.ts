import { ById } from '$lib/editor/ById';
import { cloneGraphRegistry } from '$lib/process/cloneGraphRegistry';
import { Connection } from './Connection';
import type { Connector } from './Connector';
import type { ExternalModule } from './ExternalModule';
import type { GraphRegistry } from './GraphRegistry';
import { instantiateNode } from './instantiateNode';
import { InternalModule } from './InternalModule.svelte';
import { ModuleNode } from './ModuleNode.svelte';
import { Node } from './Node.svelte';

export class Graph {
	mainInternalModuleId: string;
	nodes = new ById<Node>();
	connectors = new ById<Connector>();
	connections = new ById<Connection>();
	internalModules = new ById<InternalModule>();
	externalModules = new ById<ExternalModule>();

	constructor(graphRegistry: GraphRegistry) {
		graphRegistry = cloneGraphRegistry(graphRegistry);
		this.mainInternalModuleId = graphRegistry.mainInternalModuleId;

		graphRegistry.nodes.values().forEach((nodeData) => {
			const node = instantiateNode(nodeData);
			this.nodes.add(node);
		});

		graphRegistry.internalModules.values().forEach((internalModuleData) => {
			const internalModule = new InternalModule(internalModuleData, this.nodes);
			this.internalModules.add(internalModule);
		});

		this.nodes.values().forEach((node) => {
			if (node instanceof ModuleNode) {
				node.updateInternalModule(this.internalModules);
			}
		});

		graphRegistry.connections.values().forEach((connectionData) => {
			const connection = new Connection(connectionData);
			this.connections.add(connection);
		});

		this.nodes.values().forEach((node) => {
			this.connectors.add(node.output);
			node.inputs.forEach((input) => {
				this.connectors.add(input);
			});
		});
	}
}
