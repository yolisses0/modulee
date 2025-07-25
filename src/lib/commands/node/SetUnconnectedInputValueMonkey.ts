import type { EditorCommand } from '$lib/editor/EditorCommand';
import { getNodeDataInputKeys } from '$lib/fake/getNodeDataInputKeys';
import { getRandomFloat } from '$lib/fake/getRandomFloat';
import { getRandomItem } from '$lib/fake/getRandomItem';
import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { getNodesThatHaveInputs } from '$lib/monkey/getNodesThatHaveInputs';
import { SetUnconnectedInputValueCommand } from './SetUnconnectedInputValueCommand';

export class SetUnconnectedInputValueMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return getNodesThatHaveInputs(graphRegistry).length > 0;
	}

	createCommand(graphRegistry: GraphRegistry): EditorCommand {
		const nodeData = getRandomItem(getNodesThatHaveInputs(graphRegistry));
		return new SetUnconnectedInputValueCommand({
			id: createId(),
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			type: 'SetUnconnectedInputValueCommand',
			details: {
				value: getRandomFloat(-10, 10),
				inputPath: {
					nodeId: nodeData.id,
					inputKey: getRandomItem(getNodeDataInputKeys(nodeData, graphRegistry)),
				},
			},
		});
	}
}
