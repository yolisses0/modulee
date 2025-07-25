import type { VectorData } from '$lib/node/actionCommands/VectorData';
import { getRandomInt } from './getRandomInt';

export function createFakePosition(): VectorData {
	const value = 10;
	return {
		x: getRandomInt(-value, value),
		y: getRandomInt(-value, value),
	};
}
