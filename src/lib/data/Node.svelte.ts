import { Vector } from 'nodes-editor';
import type { ConnectionData } from './ConnectionData';
import type { ExtrasData } from './ExtrasData';
import { Input } from './Input.svelte';
import type { NodeData } from './NodeData';
import { Output } from './Output.svelte';

// TODO check if it makes sense to keep data as a froze object instead of
// copying its values
export class Node {
	id: string;
	type: string;
	output: Output;
	inputs: Input[];
	extras: ExtrasData;
	// DEBUG consider removing $state from groupId
	groupId: string = $state()!;
	position: Vector = $state()!;

	constructor(nodeData: NodeData, connectionsData: ConnectionData[]) {
		const { id, type, extras, position, groupId } = nodeData;
		this.id = id;
		this.type = type;
		this.extras = extras;
		this.groupId = groupId;
		this.output = new Output(this);
		this.position = Vector.fromData(position);
		this.inputs = this.calculateInputs(connectionsData);
	}

	calculateInputs(connectionsData: ConnectionData[]) {
		const inputs: Input[] = [];

		connectionsData.forEach((connectionData) => {
			if (connectionData.nodeId !== this.id) return;
			// The connected output is set in Editor
			const input = new Input(connectionData.inputName, this);
			inputs.push(input);
		});

		inputs.sort((input1, input2) => {
			return input1.name.localeCompare(input2.name);
		});

		return inputs;
	}
}
