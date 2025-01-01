import { Vector } from '$lib/space/Vector';
import type { Input } from '../input/Input.svelte';
import type { Node } from '../Node.svelte';
import type { OutputData } from './OutputData';

export class Output {
	id: string;
	name: string;
	connectedInputs: Input[] = [];

	constructor(
		outputData: OutputData,
		private node: Node,
		private offset: number,
	) {
		const { id, name } = outputData;
		this.id = id;
		this.name = name;
	}

	get connectorPosition() {
		const indexOffset = new Vector(0, this.offset);
		const centeringOffset = new Vector(0.5, 0.5);
		const widthOffset = new Vector(this.node.size.x - 1, 0);
		return this.node.position.add(indexOffset).add(centeringOffset).add(widthOffset);
	}

	getData(): OutputData {
		return {
			id: this.id,
			name: this.name,
		};
	}
}
