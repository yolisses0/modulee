import { createFakePosition } from '$lib/fake/createFakePosition';
import { getRandomDistinctItems } from '$lib/fake/getRandomDistinctItems';
import { getRandomInt } from '$lib/fake/getRandomInt';
import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { getId } from '$lib/ui/getId';
import { MoveNodesCommand } from './MoveNodesCommand';

export class MoveNodesMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return graphRegistry.nodes.values().length > 0;
	}

	createCommand(graphRegistry: GraphRegistry) {
		const nodeOptions = graphRegistry.nodes.values();
		return new MoveNodesCommand({
			id: createId(),
			type: 'MoveNodeCommand',
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			details: {
				delta: createFakePosition(),
				nodeIds: getRandomDistinctItems(nodeOptions, getRandomInt(1, nodeOptions.length)).map(
					getId,
				),
			},
		});
	}
}
