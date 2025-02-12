import type { Connection } from '$lib/data/Connection';
import type { Group } from '$lib/data/Group.svelte';
import type { Node } from '$lib/data/Node.svelte';
import { getNodeEngineDataType } from './getNodeEngineDataType';
import { getNodeExtrasEngineData } from './getNodeExtrasEngineData';
import { getNodeInputIdsEngineData } from './getNodeInputIdsEngineData';
import { hashToUsize } from './hashToUsize';
import type { NodeEngineData } from './NodeEngineData';

export function getNodeEngineData(
	node: Node,
	groups: Group[],
	fallbackNodeId: number,
	connections: Connection[],
): NodeEngineData {
	const type = getNodeEngineDataType(node, groups);
	const extras = getNodeExtrasEngineData(node, fallbackNodeId, connections);
	const inputIds = getNodeInputIdsEngineData(node, fallbackNodeId, connections);

	return {
		type,
		extras,
		input_ids: inputIds,
		id: hashToUsize(node.id),
	};
}
