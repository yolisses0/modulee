import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { instantiateNode } from '$lib/node/instantiateNode';
import { Module } from '../Module';
import type { ExternalModuleReference } from './ExternalModuleReference';

export class ExternalModule extends Module<ExternalModuleData> {
	constructor(externalModuleData: ExternalModuleData) {
		super(externalModuleData);

		this.nodes = this.getNodes();
	}

	getNodes() {
		return this.moduleData.graph.nodes.map((nodeData) => {
			return instantiateNode(nodeData);
		});
	}

	getReference(): ExternalModuleReference {
		return { moduleId: this.id, type: 'external' };
	}
}
