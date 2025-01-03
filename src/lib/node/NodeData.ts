import type { VectorData } from '$lib/space/VectorData';
import type { InputData } from './input/InputData';
import type { OutputData } from './output/OutputData';

export type NodeData = {
	id: string;
	inputs: InputData[];
	position: VectorData;
	outputs: OutputData[];
};
